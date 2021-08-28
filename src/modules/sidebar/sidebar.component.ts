import { Component, OnInit } from '@angular/core';
import { Playlist } from '@models/playlist/playlist.model';
import { LibraryViewModel } from '@models/view/library-view.model';
import { PlaylistService } from '@services/playlist.service';
import { PLaylistsService } from '@services/playlists.service';

@Component({
  selector: 'spotify-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  viewModel!: LibraryViewModel;
  constructor(
    private playlistsService: PLaylistsService,
    private playlistService: PlaylistService
  ) { }

  ngOnInit(): void {
    this.initViewModels();
  }

  ngOnChanges(): void {
    this.createPlaylist()
  }

  initViewModels(): void{
    this.playlistsService.getListOfCurrentUserPlaylists()
      .subscribe((response) => this.viewModel = {
          href: response.href,
          items: response.items
      });
  }

  createPlaylist(urlId?: string) {
    this.playlistService.createPlaylist().subscribe((response) => { 
      return this.initViewModels()
     })
  }
}
