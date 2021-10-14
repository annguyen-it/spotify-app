import { Component, Input, OnInit } from '@angular/core';
import { PlaylistTrack } from '@models/track/play-list-track.model';
import { LikeService } from '@services/like.service';

@Component({
  selector: 'spotify-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent implements OnInit {
  @Input() tracks!: PlaylistTrack[];
  liked!: boolean[];
  track!: any[]
  songId!: any[];


  constructor(private likeService: LikeService) { }

  ngOnInit(): void {
    // console.log(this.tracks)
    // this.track = this.tracks.map((x) => {
    //   console.log(x.track.id)
    // })
    // this.songId = this.track.map((y) => {
    //   console.log(y)
    // })
    this.initLikeSong()
  }
  initLikeSong():void {
    this.likeService.checkCurrentUserSavedSong(this.songId)
      .subscribe((liked) => {
        return this.liked = liked
      })
  }

  likeSong(trackId: string): void {
    console.log(trackId)
    this.likeService.saveTrackCurrentUser(trackId).subscribe((item) => {
      return console.log(item)
    });
  }
}
