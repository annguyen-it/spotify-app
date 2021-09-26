import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Playlist } from '@models/playlist/playlist.model';
import { BaseComponent } from '@modules/app/base/base.component';
import { PlaylistService } from '@services/playlist.service';
import { Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'spotify-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent extends BaseComponent implements OnInit {
  playlist!: Playlist;
  sub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private playlistService: PlaylistService
  ) {
    super();
   }

  ngOnInit(): void {
    this.sub = this.route.params
      .pipe(
        map((params) => {
          this.playlistService
            .getPlaylist(params['playlist-id'])
            .subscribe((playlist) => {
              this.playlist = playlist;
            });
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }
}
