import { Component, Input, OnInit } from '@angular/core';
import { SimplifiedPlaylist } from '@models/playlist/simplified-playlist.model';
import { PlaybackService } from '@services/playback.service';
import { PlayerService } from '@services/player.service';
import {map, tap} from 'rxjs/operators';
import {LikeService} from "@services/like.service";
import {UserProfileService} from "@services/user-profile.service";
import {Playlist} from "@models/playlist/playlist.model";
import {Observable} from "rxjs";

@Component({
  selector: 'spotify-banner-button-group',
  templateUrl: './banner-button-group.component.html',
  styleUrls: ['./banner-button-group.component.scss']
})
export class BannerButtonGroupComponent implements OnInit {
  @Input() playlist!: Playlist;
  liked!: boolean;
  userId!: string;

  constructor(
    private playbackService: PlaybackService,
    private playerService: PlayerService,
    private likeService: LikeService,
    private  userProfileService: UserProfileService,
  ) { }

  ngOnInit(): void {
    console.log(this.playlist)
    this.userProfileService
      .getCurrentUserProfile()
      .pipe(
        map((user) => user.id),
        tap((id) => {
          this.userId = id;
          this.initLike()
        })
      )
      .subscribe();

  }
  playPlaylist(event: Event): void{
    event.stopPropagation();
    this.playerService
      .startNewPlayback(this.playbackService.deviceId.value, this.playlist.uri)
      .subscribe();
  }

  initLike(){
    return this.likeService.checkIfFollowPlaylist(this.playlist.id,this.userId)
      .subscribe((response) => {
        this.liked = response[0]
      })
  }

    toggleLike(like: boolean): void{

    if (like) {
      this.likeService.unfollowPlaylist(this.playlist.id).subscribe((liked) => {
        return this.initLike()
      })

    } else {
      this.likeService.followPlaylist(this.playlist.id).subscribe((like) => {
        return this.initLike()
      })
    }


  }
}
