import { Component, Input } from '@angular/core';
import { SimplifiedPlaylist } from '@models/playlist/simplified-playlist.model';
import { PlaybackService } from '@services/playback.service';
import { PlayerService } from '@services/player.service';

@Component({
  selector: 'spotify-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() playlist!: SimplifiedPlaylist;
  @Input() type: 'playlist' | 'podcast' = 'playlist';
  
  constructor(
    private playerService: PlayerService,
    private playbackService: PlaybackService
  ) { }

  playPlaylist(event: Event): void {
    event.stopPropagation();
    this.playerService
      .startNewPlayback(this.playbackService.deviceId.value, this.playlist.uri)
      .subscribe();
  }
}
