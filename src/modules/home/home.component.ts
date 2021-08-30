import { Component, OnInit } from '@angular/core';
import { BrowseService } from '@services/browse.service';
import { HomeViewModel } from '@models/view/home-view.model';

@Component({
  selector: 'spotify-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  vnViewModel!: HomeViewModel;
  usViewModel!: HomeViewModel;
  gbViewModel!: HomeViewModel;

  constructor(
    private browseService: BrowseService,
  ) { }

  ngOnInit(): void {
    this.initViewModels();
  }

  initViewModels(): void {
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
  }
}
