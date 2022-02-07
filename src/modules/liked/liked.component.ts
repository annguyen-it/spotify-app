import { Component, OnInit } from '@angular/core';
import {PlaylistService} from "@services/playlist.service";

@Component({
  selector: 'spotify-liked',
  templateUrl: './liked.component.html',
  styleUrls: ['./liked.component.scss']
})
export class LikedComponent implements OnInit {
  viewModel!: any;
  constructor(
    private playlistService: PlaylistService,
  ) { }

  ngOnInit(): void {
    this.initViewModels();
  }

  initViewModels(): void {
    this.playlistService.getUserSavedTracks()
      .subscribe((response) => {
        this.viewModel = response
        console.log(this.viewModel)
      });
  }
}
