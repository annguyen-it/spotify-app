import { Component, OnInit } from '@angular/core';
import { LibraryViewModel } from '@models/view/library-view.model';
import { AuthorizationService } from '@services/authorization.service';
import { PlaylistService } from '@services/playlist.service';

@Component({
  selector: 'spotify-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  viewModel!: LibraryViewModel;
  isAuthorized!: boolean;
  
  constructor(
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
    this.playlistService.getListOfCurrentUserPlaylists()
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
