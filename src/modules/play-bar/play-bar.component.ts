import { Component, OnInit } from '@angular/core';
import { WebPlaybackState } from '@models/playback/web-playback-state.model';
import { AccountService } from '@services/account.service';
import { PlaybackService } from '@services/playback.service';
import { VibrantService } from '@services/vibrant.service';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';

@Component({
  selector: 'spotify-play-bar',
  templateUrl: './play-bar.component.html',
  styleUrls: ['./play-bar.component.scss'],
})
export class PlayBarComponent implements OnInit {
  playBackState?: WebPlaybackState;
  defaultMobileBackgroundColor = 'rgb(31, 31, 31)';
  mobileBackgroundColor = this.defaultMobileBackgroundColor;

  userProfileSub = new Subscription();

  constructor(
    private accountService: AccountService,
    private playbackService: PlaybackService,
  ) { }

  ngOnInit(): void {
    this.initPlaybackService();
  }

  initPlaybackService(): void {
    this.playbackService.init();
    this.playbackService.state
      .pipe(
        tap(async (state) => {
          this.playBackState = state;
          console.log(state);
        }),
        map(state => state?.trackWindow.currentTrack.album.images[0].url),
        distinctUntilChanged(),
        tap(async (imageUrl) => {
          await this.generateMobileBackgroundColor(imageUrl);
        }),
      )
      .subscribe();
  }

  async generateMobileBackgroundColor(imageUrl: string | undefined): Promise<void> {
    if (imageUrl) {
      this.mobileBackgroundColor = await VibrantService.generateColor(imageUrl);
    } else {
      this.mobileBackgroundColor = this.defaultMobileBackgroundColor;
    }
  }

  async prev(): Promise<void> {
    await this.playbackService.previousTrack();
  }

  async togglePlay(): Promise<void> {
    await this.playbackService.togglePlay();
  }

  async next(): Promise<void> {
    await this.playbackService.nextTrack();
  }

  toggleShuffle(): void {
    this.playbackService.toggleShuffle();
  }

  setRepeatMode(): void {
    this.playbackService.setRepeatMode();
  }

  signUp(): void {
    this.accountService.signUp();
  }
}
