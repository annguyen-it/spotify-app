import { Component, OnInit } from '@angular/core';
import { LibraryViewModel } from '@models/view/library-view.model';
import { AuthorizationService } from '@services/authorization.service';
import { PlaylistService } from '@services/playlist.service';
import { PlaylistsService } from '@services/playlists.service';
import { UserProfileService } from '@services/user-profile.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'spotify-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  viewModel!: LibraryViewModel;
  isAuthorized!: boolean;
  sub!: Subscription;
  urlId!: string;
  
  constructor(
    private userProfileService: UserProfileService,
    private playlistsService: PlaylistsService,
    private playlistService: PlaylistService,
    private authorizationService: AuthorizationService,
  ) { }

  ngOnInit(): void {
    this.initViewModels();
    this.authorizationService
      .isAuthorized()
      .subscribe((isAuthorized) => {
        this.isAuthorized = isAuthorized;
        this.sub = this.userProfileService.getCurrentUserProfile()
          .subscribe((response) => {
            this.urlId = response.id
          })
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
    this.playlistService.createPlaylist(this.urlId).subscribe((response) => { 
      return this.initViewModels()
     })
  }
}
