import { Component, Input } from '@angular/core';
import { SimplifiedPlaylist } from '@models/playlist/simplified-playlist.model';
import { ResizedEvent } from 'angular-resize-event';

@Component({
  selector: 'spotify-playlist-details',
  templateUrl: './playlist-details.component.html',
  styleUrls: ['./playlist-details.component.scss']
})
export class PlaylistDetailsComponent {
  displayPlaylists: SimplifiedPlaylist[] = [];

  @Input() playlists!: SimplifiedPlaylist[];
  @Input() message?: string;

  constructor() { }

  onResized(event: ResizedEvent): void {
    for (let i = 1; i < this.playlists.length; i++) {
      console.log(event)
      if (event.newWidth < i * 180 + (i - 1) * 22) {
        this.displayPlaylists = this.playlists.slice(0, i - 1);
        break;
      }
    }
  }
}
