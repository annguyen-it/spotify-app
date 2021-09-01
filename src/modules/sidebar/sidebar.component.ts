import { Component, OnDestroy, OnInit } from '@angular/core';
import { SimplifiedPlaylist } from '@models/playlist/simplified-playlist.model';
import { AuthorizationService } from '@services/authorization.service';
import { PlaylistService } from '@services/playlist.service';
import { UserProfileService } from '@services/user-profile.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'spotify-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  playlists: SimplifiedPlaylist[] = [];
  profileSub!: Subscription;
  playlistSub!: Subscription;
  userId!: string;

  constructor(
    private playlistService: PlaylistService,
    private userProfileService: UserProfileService,
    private authorizationService: AuthorizationService,
  ) { }

  ngOnInit(): void {
    this.authorizationService
      .isAuthorized()
      .subscribe((isAuthorized) => {
        if (isAuthorized) {
          this.profileSub = this.userProfileService
            .getCurrentUserProfile()
            .subscribe((response) => {
              this.userId = response.id;
            });
            
          this.refreshPlaylists();
        }
      });
  }

  ngOnDestroy(): void {
    if (this.profileSub) this.profileSub.unsubscribe();
    if (this.profileSub) this.profileSub.unsubscribe();
    if (this.playlistSub) this.playlistSub.unsubscribe();
  }

  refreshPlaylists(): void {
    this.playlistService
      .getListOfCurrentUserPlaylists()
      .subscribe((response) => this.playlists = response.items);
  }

  createPlaylist() {
    this.playlistService
      .createPlaylist(this.userId, this.playlists.length + 1)
      .subscribe(() => this.refreshPlaylists());
  }
}
