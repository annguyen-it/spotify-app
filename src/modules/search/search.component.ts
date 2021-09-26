import { Component, OnInit } from '@angular/core';
import { GetDetailSearchService } from '@services/getDetailSearch.service';

@Component({
  selector: 'spotify-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  dataDetailSearch:any;
  dataDetailSearchTop:any;
  constructor(
    private getDetailSearch: GetDetailSearchService,
  ) { }

  ngOnInit() {
    this.getSearch();
    this. getSearchTop();
  }
  getSearch() {
    this.getDetailSearch.getDetailSearch().subscribe((data: any) => {
      this.dataDetailSearch = data.categories.items;
      console.log(this.dataDetailSearch,'search')
    })
  }
  getSearchTop() {
    this.getDetailSearch.getDetailSearchTop().subscribe((data: any) => {
      this.dataDetailSearchTop = data.categories.items;
      console.log(this.dataDetailSearchTop)
    })
  }
}
