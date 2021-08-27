import { Component, OnInit } from '@angular/core';
import { PlaybackService } from '@services/playback.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'spotify-play-bar',
  templateUrl: './play-bar.component.html',
  styleUrls: ['./play-bar.component.scss'],
})
export class PlayBarComponent implements OnInit {
  isPause?: boolean;

  constructor(private playbackService: PlaybackService) { }

  ngOnInit(): void {
    this.playbackService.init();
    this.playbackService.state
      .pipe(
        map((state) => state?.paused),
      )
      .subscribe((paused) => this.isPause = paused);
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
}
