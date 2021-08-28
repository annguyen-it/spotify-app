import { Component, OnInit } from '@angular/core';
import { LibraryViewModel } from '@models/view/library-view.model';
import { AuthorizationService } from '@services/authorization.service';
import { PlaylistService } from '@services/playlist.service';
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
  sub2!: Subscription;
  urlId!: string;
  length!: number;
  
  constructor(
    private userProfileService: UserProfileService,
    private playlistService: PlaylistService,
    private authorizationService: AuthorizationService,
  ) { }

  ngOnInit(): void {
    this.authorizationService
      .isAuthorized()
      .subscribe((isAuthorized) => {
        this.isAuthorized = isAuthorized;
        this.sub = this.userProfileService.getCurrentUserProfile()
          .subscribe((response) => {
            this.urlId = response.id
          })
        this.sub2 = this.playlistService.getListOfCurrentUserPlaylists()
          .subscribe((response) => {
            this.length = response.items.length
          })
        this.initViewModels();
      });
  }

  initViewModels(): void{
    this.playlistService.getListOfCurrentUserPlaylists()
      .subscribe((response) => this.viewModel = {
          href: response.href,
          items: response.items,
      });
  }

  createPlaylist(urlId?: string) {
    this.playlistService.createPlaylist(this.urlId, this.length).subscribe((response) => {
      return this.initViewModels()
     })
  }
}
