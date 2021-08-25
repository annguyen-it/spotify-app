import { Component, OnInit } from '@angular/core';
import { BrowseService } from '@services/browse.service';
import { SimplifiedPlaylist } from '@models/playlist/simplified-playlist.model';

@Component({
  selector: 'spotify-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  featuredPlaylists: SimplifiedPlaylist[] = [];
  message!: string;

  constructor(private BrowseService: BrowseService) { }

  ngOnInit(): void {
    this.BrowseService.GetListOfFeaturedPlaylists()
      .subscribe((response) => {
        this.featuredPlaylists = response.playlists.items;
        this.message = response.message;
      });
  }
}
