import { Component, OnInit } from '@angular/core';
import { ColorConstant } from '@constants/color.constants';
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

  defaultSliderBackground = '#535353';
  sliderBackground = this.defaultSliderBackground;

  timeValue = 0;
  timeIntervalFunction!: ReturnType<typeof setTimeout>;

  constructor(
    private accountService: AccountService,
    private playbackService: PlaybackService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.initGenerateMobileBackgroundColor();
    await this.initPlaybackStateListener();
  }

  async initPlaybackStateListener(): Promise<void> {
    await this.playbackService.init();

    this.playbackService.state
      .pipe(
        tap((state) => {
          this.playBackState = state;

          if (this.timeValue !== state?.position) {
            this.timeValue = state?.position ?? 0;
            this.onDragSlider(this.timeValue);

            if (this.timeIntervalFunction) {
              clearInterval(this.timeIntervalFunction);
            }

            if (state?.paused === false) {
              this.timeIntervalFunction = setInterval(() => this.increaseTime(), 1000);
            }
          }

        }),
      )
      .subscribe();
  }

  initGenerateMobileBackgroundColor(): void {
    this.playbackService.state
      .pipe(
        map(state => state?.trackWindow.currentTrack.album.images[0].url),
        distinctUntilChanged(),
        tap(async (imageUrl) => {
          await this.generateMobileBackgroundColor(imageUrl);
        }),
      )
      .subscribe();
  }

  private refreshTimeSliderBackground(value: any, duration: number | undefined): void {
    this.sliderBackground = this.playBackState && !!duration
      ? `linear-gradient(to right,
                         ${ColorConstant.mainGreenDark} ${+value / duration * 100}%, 
                         ${this.defaultSliderBackground} ${+value / duration * 100}%`
      : this.defaultSliderBackground;
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

  onTimeSliderChange(slider: HTMLInputElement): void {
    this.playbackService.seek(+slider.value);
  }

  onDragSlider(value: any): void {
    clearInterval(this.timeIntervalFunction);
    this.refreshTimeSliderBackground(value, this.playBackState?.duration);
  }

  increaseTime(): void {
    this.refreshTimeSliderBackground(this.timeValue, this.playBackState?.duration);
  }
}
