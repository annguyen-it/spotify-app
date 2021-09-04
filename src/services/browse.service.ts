import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetListOfFeaturedPlaylistsResponse } from '@models/response/get-list-of-features-playlists.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseDataService } from './core/base-data.service';

@Injectable({ providedIn: 'root' })
export class BrowseService extends BaseDataService {
  constructor(private http: HttpClient) {
    super();
  }

  getListOfFeaturedPlaylists(country?: string): Observable<GetListOfFeaturedPlaylistsResponse> {
    return this.http
      .get<any>(
        `${this.baseUrl}/v1/browse/featured-playlists`,
        {
          params: {
            country: country ?? 'VN'
          }
        }
      )
      .pipe(
        map((response) => (GetListOfFeaturedPlaylistsResponse.parse(response))),
      );
  }
}
