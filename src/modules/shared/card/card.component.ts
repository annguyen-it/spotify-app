import { Component, Input, OnInit } from '@angular/core';
import { SimplifiedPlaylist } from '@models/playlist/simplified-playlist.model';

@Component({
  selector: 'spotify-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() playlist!: SimplifiedPlaylist;

  constructor() { }

  ngOnInit(): void {
  }

}
