import { Component, OnInit } from '@angular/core';
import { WebPlaybackState } from '@models/playback/web-playback-state.model';
import { BaseComponent } from '@modules/app/base/base.component';
import { AccountService } from '@services/account.service';
import { AuthorizationService } from '@services/authorization.service';
import { PlaybackService } from '@services/playback.service';
import { VibrantService } from '@services/vibrant.service';
import { Subscription } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'spotify-play-bar',
  templateUrl: './play-bar.component.html',
  styleUrls: ['./play-bar.component.scss'],
})
export class PlayBarComponent extends BaseComponent implements OnInit {
  playBackState?: WebPlaybackState;
  defaultMobileBackgroundColor = 'rgb(31, 31, 31)';
  mobileBackgroundColor = this.defaultMobileBackgroundColor;

  userProfileSub = new Subscription();

  constructor(
    private accountService: AccountService,
    private playbackService: PlaybackService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.initPlaybackService();
  }

  initPlaybackService(): void {
    this.playbackService.init();
    this.playbackService.state
      .pipe(
        tap(async (state) => {
          this.playBackState = state;
          await this.generateMobileBackgroundColor(state?.trackWindow.currentTrack.album.images);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  async generateMobileBackgroundColor(images: { url: string; }[] | undefined): Promise<void> {
    if (images && images.length > 0) {
      this.mobileBackgroundColor = await VibrantService.generateColor(images[0].url);
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

  signUp(): void {
    this.accountService.signUp();
  }
}
