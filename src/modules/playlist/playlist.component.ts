import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Playlist } from '@models/playlist/playlist.model';
import { PlaylistService } from '@services/playlist.service';
import {Observable, Subscription} from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'spotify-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit, OnDestroy {
  playlist$!: Observable<Playlist>;
  sub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private playlistService: PlaylistService,
  ) { }

  ngOnInit(): void {
    // this.sub =
      this.route.params
      .pipe(
        map((params) => {
          this.playlist$ = this.playlistService
            .getPlaylist(params['playlist-id'])
            // .subscribe((playlist) => {
            //   this.playlist = playlist;
            //   this.initLike()
            // });
        })
      )
      .subscribe()
    console.log(this.playlist$)
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }

  }


}
