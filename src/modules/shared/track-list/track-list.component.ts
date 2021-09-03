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

  constructor(private likeService: LikeService) { }

  ngOnInit(): void {
  }
  likePlaylist(i:number):void {
    this.likeService.followPlaylist(this.tracks[i].track.id)
      .subscribe((liked) => {
        console.log(this.tracks[i].track.id)
      })

  }
}
