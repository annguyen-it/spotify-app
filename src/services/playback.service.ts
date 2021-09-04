import { Injectable } from '@angular/core';
import { SessionStorageKeyConstant } from '@constants/session-storage-key.constant';
import { WebPlaybackState } from '@models/playback/web-playback-state.model';
import { BehaviorSubject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { AuthorizationService } from './authorization.service';
import { PlayerService } from './player.service';

@Injectable({ providedIn: 'root' })
export class PlaybackService {
  playerSession = new BehaviorSubject<any>(null);
  state = new BehaviorSubject<WebPlaybackState | undefined>(undefined);
  deviceId = new BehaviorSubject<string | null>(null);
  Player: any;

  constructor(
    private authorizationService: AuthorizationService,
    private playerService: PlayerService
  ) { }

  async init(): Promise<void> {
    this.Player = (await this.waitForSdkToLoad()).Player;

    this.authorizationService.isAuthorized()
      .pipe(
        filter((isAuthorized) => isAuthorized),
        tap(() => {
          const accessToken = sessionStorage.getItem(SessionStorageKeyConstant.accessToken);
          if (accessToken) {
            this.initSdk(accessToken, 1);
          }
        })
      ).subscribe();
  }

  private async initSdk(token: string, volume: number) {
    const player = new this.Player({
      name: 'Spotify App',
      getOAuthToken: (cb: Function) => cb(token),
      volume
    });

    this.playerSession.next(player);

    // Error handling
    player.addListener('initialization_error', ({ message }: any) => { console.error(message); });
    player.addListener('authentication_error', ({ message }: any) => { console.error(message); });
    player.addListener('account_error', ({ message }: any) => { console.error(message); });
    player.addListener('playback_error', ({ message }: any) => { console.error(message); });

    // Playback status updates
    player.addListener('player_state_changed', (state: any) => {
      if (state) {
        this.state.next(WebPlaybackState.parse(state));
        const currentTrackId = state?.trackWindow?.currentTrack?.id;

        if (state && !state.paused && currentTrackId) {
          this.playerService.togglePlayback(this.deviceId.value, currentTrackId);
        }
      }
    });

    // Ready
    player.addListener('ready', ({ device_id }: any) => {
      console.log('Ready with Device ID', device_id);
      this.playerService.transferUserPlayback(device_id).subscribe();
      this.deviceId.next(device_id);
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }: any) => {
      console.log('Device ID has gone offline', device_id);
    });

    await this.connect();
  }

  private waitForSdkToLoad(): Promise<any> {
    return new Promise((resolve) => {
      (window as any).onSpotifyWebPlaybackSDKReady = () => {
        resolve((window as any).Spotify);
      };
    });
  }

  async connect(): Promise<void> {
    await this.playerSession.value?.connect();
  }

  async disconnect(): Promise<void> {
    await this.playerSession.value?.disconnect();
  }

  async getCurrentState(): Promise<WebPlaybackState | undefined> {
    const state = await this.playerSession.value?.getCurrentState();

    if (!state) {
      return state;
    }

    return WebPlaybackState.parse(state);
  }

  async getVolume(): Promise<number> {
    return this.playerSession.value?.getVolume();
  }

  async setVolume(volume: number): Promise<void> {
    if (0 <= volume && volume <= 1) {
      return this.playerSession.value?.setVolume(volume);
    }
  }

  async pause(): Promise<number> {
    return this.playerSession.value?.pause();
  }

  async resume(): Promise<number> {
    return this.playerSession.value?.resume();
  }

  async togglePlay(): Promise<number> {
    return this.playerSession.value?.togglePlay();
  }

  async seek(): Promise<number> {
    return this.playerSession.value?.seek();
  }

  async previousTrack(): Promise<number> {
    return this.playerSession.value?.previousTrack();
  }

  async nextTrack(): Promise<number> {
    return this.playerSession.value?.nextTrack();
  }

  setRepeatMode(): void {
    let currentRepeatMode = this.state.value?.repeatMode;
    const modeMap = ['off', 'context', 'track'];

    if (currentRepeatMode != undefined) {
      this.playerService
        .setRepeatMode(this.deviceId.value, ++currentRepeatMode > 2 ? modeMap[0] : modeMap[currentRepeatMode])
        .subscribe();
    }
  }

  toggleShuffle(): void {
    let currentShuffle = this.state.value?.shuffle;

    if (currentShuffle != undefined) {
      this.playerService
        .toggleShuffle(this.deviceId.value, !currentShuffle)
        .subscribe();
    }
  }
}
