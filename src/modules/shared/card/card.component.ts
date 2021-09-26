import { Component, Input } from '@angular/core';
import { SimplifiedPlaylist } from '@models/playlist/simplified-playlist.model';
import { BaseComponent } from '@modules/app/base/base.component';
import { PlaybackService } from '@services/playback.service';
import { PlayerService } from '@services/player.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'spotify-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent extends BaseComponent {
  @Input() playlist!: SimplifiedPlaylist;
  @Input() type: 'playlist' | 'podcast' = 'playlist';

  constructor(
    private playerService: PlayerService,
    private playbackService: PlaybackService
  ) {
    super();
  }

  playPlaylist(event: Event): void {
    event.stopPropagation();
    this.playerService
      .startNewPlayback(this.playbackService.deviceId.value, this.playlist.uri)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
