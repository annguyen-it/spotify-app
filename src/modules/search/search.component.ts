import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@modules/app/base/base.component';
import { GetDetailSearchService } from '@services/getDetailSearch.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'spotify-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent extends BaseComponent implements OnInit {
  dataDetailSearch: any;
  dataDetailSearchTop: any;

  constructor(
    private getDetailSearch: GetDetailSearchService,
  ) {
    super();
  }

  ngOnInit() {
    this.getSearch();
    this.getSearchTop();
  }

  getSearch() {
    this.getDetailSearch.getDetailSearch()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((data: any) => {
        this.dataDetailSearch = data.categories.items;
      });
  }

  getSearchTop() {
    this.getDetailSearch.getDetailSearchTop()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((data: any) => {
        this.dataDetailSearchTop = data.categories.items;
      });
  }
}
