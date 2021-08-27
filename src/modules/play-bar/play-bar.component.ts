import { Component, OnInit } from '@angular/core';
import { AccountService } from '@services/account.service';
import { AuthorizationService } from '@services/authorization.service';
import { PlaybackService } from '@services/playback.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'spotify-play-bar',
  templateUrl: './play-bar.component.html',
  styleUrls: ['./play-bar.component.scss'],
})
export class PlayBarComponent implements OnInit {
  isPause?: boolean;
  isAuthorized!: boolean;
  userProfileSub = new Subscription();

  constructor(
    private accountService: AccountService,
    private playbackService: PlaybackService,
    private authorizationService: AuthorizationService,
  ) { }

  ngOnInit(): void {
    this.initPlaybackService();
    this.subscribeAuthorizationService();
  }

  initPlaybackService(): void {
    this.playbackService.init();
    this.playbackService.state
      .pipe(
        map((state) => state?.paused),
      )
      .subscribe((paused) => this.isPause = paused);
  }

  subscribeAuthorizationService(): void {
    this.authorizationService
      .isAuthorized()
      .subscribe((isAuthorized) => {
        this.isAuthorized = isAuthorized;
      });
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
