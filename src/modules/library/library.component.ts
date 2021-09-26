import { Component, Input, OnInit } from '@angular/core';
import { LibraryViewModel } from '@models/view/library-view.model';
import { BaseComponent } from '@modules/app/base/base.component';
import { PlaylistService } from '@services/playlist.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'spotify-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent extends BaseComponent implements OnInit {
  viewModel!: LibraryViewModel;

  constructor(
    private playlistService: PlaylistService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initViewModels();
  }

  initViewModels(): void {
    this.playlistService.getListOfCurrentUserPlaylists()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((response) => {
        this.viewModel = {
          href: response.href,
          items: response.items
        };
      });
  }
}
