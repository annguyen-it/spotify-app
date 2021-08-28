import { Component, Input, OnInit } from '@angular/core';
import { SimplifiedPlaylist } from '@models/playlist/simplified-playlist.model';
import { LibraryViewModel } from '@models/view/library-view.model';
import { PlaylistsService } from '@services/playlists.service';

@Component({
  selector: 'spotify-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  viewModel!: LibraryViewModel;

  constructor(
    private playlistsService: PlaylistsService
  ) { }

  ngOnInit(): void {
    this.initViewModels();
  }

  initViewModels(): void {
    this.playlistsService.getListOfCurrentUserPlaylists()
      .subscribe((response) => {
        this.viewModel = {
          href: response.href,
          items: response.items
        };
      });
  }
}
