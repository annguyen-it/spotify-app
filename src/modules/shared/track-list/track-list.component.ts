import { Component, Input, OnInit } from '@angular/core';
import { PlaylistTrack } from '@models/track/play-list-track.model';

@Component({
  selector: 'spotify-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent implements OnInit {
  @Input() tracks?: PlaylistTrack[];

  constructor() { }

  ngOnInit(): void {
  }

}
