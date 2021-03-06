import { Component, OnInit } from '@angular/core';
import { BrowseService } from '@services/browse.service';
import { HomeViewModel } from '@models/view/home-view.model';
import { ClientCredentialsService } from '@services/client-credentials.service';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { BaseComponent } from '@modules/app/base/base.component';

@Component({
  selector: 'spotify-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit {
  vnViewModel!: HomeViewModel;
  usViewModel!: HomeViewModel;
  gbViewModel!: HomeViewModel;

  constructor(
    private browseService: BrowseService,
    private clientCredentialsService: ClientCredentialsService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.initViewModels();
  }

  initViewModels(): void {
    this.clientCredentialsService
      .gotCredentials()
      .pipe(
        filter((gotCredentials) => gotCredentials),
        map(() => {
          this.browseService.getListOfFeaturedPlaylists('VN')
            .subscribe((response) => this.vnViewModel = {
              message: response.message,
              items: response.playlists.items
            });
          this.browseService.getListOfFeaturedPlaylists('US')
            .subscribe((response) => this.usViewModel = {
              message: response.message,
              items: response.playlists.items
            });
          this.browseService.getListOfFeaturedPlaylists('GB')
            .subscribe((response) => this.gbViewModel = {
              message: response.message,
              items: response.playlists.items
            });
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }
}
