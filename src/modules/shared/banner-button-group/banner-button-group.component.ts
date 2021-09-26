import { Component, Input, OnInit } from '@angular/core';
import { SimplifiedPlaylist } from '@models/playlist/simplified-playlist.model';
import { BaseComponent } from '@modules/app/base/base.component';
import { PlaybackService } from '@services/playback.service';
import { PlayerService } from '@services/player.service';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'spotify-banner-button-group',
  templateUrl: './banner-button-group.component.html',
  styleUrls: ['./banner-button-group.component.scss']
})
export class BannerButtonGroupComponent extends BaseComponent implements OnInit {
  @Input() playlist!: SimplifiedPlaylist;

  constructor(
    private playbackService: PlaybackService,
    private playerService: PlayerService,
  ) {
    super();
  }

  ngOnInit(): void {

  }
  playPlaylist(event: Event) {
    event.stopPropagation();
    this.playerService
      .startNewPlayback(this.playbackService.deviceId.value, this.playlist.uri)
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe();
  }
}
