import { Component, Input, OnInit } from '@angular/core';
import { LibraryViewModel } from '@models/view/library-view.model';
import { PlaylistService } from '@services/playlist.service';

@Component({
  selector: 'spotify-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  viewModel!: LibraryViewModel;

  constructor(
    private playlistService: PlaylistService
  ) { }

  ngOnInit(): void {
    this.initViewModels();
  }

  initViewModels(): void {
    // this.playlistService.getUserSavedTracks()
    //   .subscribe((response) => {
    //     console.log(response)
    //     this.viewModel = {
    //       ...response,
    //     };
    //   });
  }
}
