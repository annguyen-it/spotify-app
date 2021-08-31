import { Component, OnInit } from '@angular/core';
import { WebPlaybackState } from '@models/playback/web-playback-state.model';
import { AccountService } from '@services/account.service';
import { AuthorizationService } from '@services/authorization.service';
import { PlaybackService } from '@services/playback.service';
import { VibrantService } from '@services/vibrant.service';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'spotify-play-bar',
  templateUrl: './play-bar.component.html',
  styleUrls: ['./play-bar.component.scss'],
})
export class PlayBarComponent implements OnInit {
  playBackState?: WebPlaybackState;
  mobileBackgroundColor = 'rgb(179, 179, 179)';

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
          await this.generateMobileBackgroundColor(state?.trackWindow.currentTrack.album.images);
        })
      )
      .subscribe();
  }

  async generateMobileBackgroundColor(images: { url: string; }[] | undefined): Promise<void> {
    if (images && images.length > 0) {
      this.mobileBackgroundColor = await VibrantService.generateColor(images[0].url);
    } else {
      this.mobileBackgroundColor = 'rgb(179, 179, 179)';
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
