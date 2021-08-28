import { Component, OnInit } from '@angular/core';
import { LibraryViewModel } from '@models/view/library-view.model';
import { AuthorizationService } from '@services/authorization.service';
import { PlaylistService } from '@services/playlist.service';
import { PLaylistsService } from '@services/playlists.service';

@Component({
  selector: 'spotify-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  viewModel!: LibraryViewModel;
  isAuthorized!: boolean;
  
  constructor(
    private playlistsService: PLaylistsService,
    private playlistService: PlaylistService,
    private authorizationService: AuthorizationService,
  

  ) { }

  ngOnInit(): void {
    this.initViewModels();
    this.authorizationService
      .isAuthorized()
      .subscribe((isAuthorized) => {
        this.isAuthorized = isAuthorized;
        this.initViewModels();
      });
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
