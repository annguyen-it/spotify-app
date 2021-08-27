import { Component, OnInit } from '@angular/core';
import { LibraryViewModel } from '@models/view/library-view.model';
import { PLaylistsService } from '@services/playlists.service';

@Component({
  selector: 'spotify-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  viewModel!: LibraryViewModel;
  constructor(
    private playlistsService: PLaylistsService
  ) { }

  ngOnInit(): void {
    this.initViewModels();
  }
  initViewModels(): void{
    this.playlistsService.getListOfCurrentUserPlaylists()
      .subscribe((response) => this.viewModel = {
          href: response.href,
          items: response.items
      });
  }
}
