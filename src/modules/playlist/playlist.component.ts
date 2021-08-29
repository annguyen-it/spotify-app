import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Playlist } from '@models/playlist/playlist.model';
import { LikeService } from '@services/like.service';
import { PlaylistService } from '@services/playlist.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'spotify-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit, OnDestroy {
  playlist!: Playlist;
  liked!: any;
  sub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private playlistService: PlaylistService,
    private likeService: LikeService,
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params
      .pipe(
        map((params) => {
          this.playlistService
            .getPlaylist(params['playlist-id'])
            .subscribe((playlist) => {
              this.playlist = playlist;
              console.log(this.playlist.id)
              this.likeService.checkIfFollowPlaylist(this.playlist.id,'313rd24fobu56dorkjkvty5p6ata').subscribe((response) => this.liked = response)
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
