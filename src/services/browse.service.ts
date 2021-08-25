import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetListOfFeaturedPlaylistsResponse } from '@models/response/get-list-of-features-playlists.model';
import { Observable } from 'rxjs';
import { BaseDataService } from './core/base-data.service';

@Injectable({ providedIn: 'root' })
export class BrowseService extends BaseDataService {
  constructor(private http: HttpClient) {
    super();
  }

  GetListOfFeaturedPlaylists(): Observable<GetListOfFeaturedPlaylistsResponse> {
    return this.http
      .get<GetListOfFeaturedPlaylistsResponse>(
        `${this.baseUrl}/v1/browse/featured-playlists`,
        {
          params: {
            country: 'VN'
          }
        }
      );
  }
}
