import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Playlist } from '@models/playlist/playlist.model';
import { PlaylistsService } from '@services/playlists.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'spotify-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit, OnDestroy {
  playlist!: Playlist;
  sub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private playlistsService: PlaylistsService
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params
      .pipe(
        map((params) => {
          this.playlistsService
            .getPlaylist(params['playlist-id'])
            .subscribe((playlist) => {
              this.playlist = playlist;
            });
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
