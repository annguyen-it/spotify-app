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

  constructor(
    private playerService: PlayerService,
    private playbackService: PlaybackService
  ) { }

  openPlaylist(event: Event): void {
    /// TODO: Implement here
  }

  playPlaylist(event: Event): void {
    event.stopPropagation();
    this.playerService
      .startNewPlayback(this.playbackService.deviceId.value, this.playlist.uri)
      .subscribe();
  }
}
