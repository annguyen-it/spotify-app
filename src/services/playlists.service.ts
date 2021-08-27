import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetListOfCurrentUserPlaylists } from '@models/response/get-list-of-current-user-playlists.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseDataService } from './core/base-data.service';

@Injectable({
  providedIn: 'root'
})
export class PLaylistsService extends BaseDataService {

  constructor(private http: HttpClient) {
    super();
  }

  getListOfCurrentUserPlaylists(): Observable<GetListOfCurrentUserPlaylists> {
    return this.http
      .get<any>(
        `${this.baseUrl}/v1/me/playlists`,
      )
      .pipe(
        map<any, GetListOfCurrentUserPlaylists>((response) => ({
          ...response,
          items: response.items.map((x: any) => ({
            ...x,
            externalUrls: x.external_urls,
            snapshotId: x.snapshot_id,
          }))
        })),
      );
  }
}
