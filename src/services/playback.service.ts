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
  state = new BehaviorSubject<WebPlaybackState | null>(null);
  deviceId = new BehaviorSubject<string | null>(null);

  constructor(
    private authorizationService: AuthorizationService,
    private playerService: PlayerService
  ) { }

  init(): void {
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
    const { Player } = await this.waitForSdkToLoad();

    const player = new Player({
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
    player.addListener('player_state_changed', (state: WebPlaybackState) => {
      this.state.next(state);
      const currentTrackId = state?.trackWindow?.currentTrack?.id;
      
      if (state && !state.paused && currentTrackId) {
        this.playerService.togglePlayback(this.deviceId.value, currentTrackId);
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

  async getCurrentState(): Promise<WebPlaybackState> {
    const state = this.playerSession.value?.getCurrentState();

    if (!state) {
      return state;
    }

    return {
      ...state,
      disallows: {
        ...state.disallows,
        peekingNext: state.disallows?.peeking_next,
        peekingPrev: state.disallows?.peeking_prev,
        skippingNext: state.disallows?.skipping_next,
        skippingPrev: state.disallows?.skipping_prev,
      }
    };
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
}
