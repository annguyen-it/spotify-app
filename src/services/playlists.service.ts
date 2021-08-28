import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Playlist } from '@models/playlist/playlist.model';
import { GetListOfCurrentUserPlaylists } from '@models/response/get-list-of-current-user-playlists.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BaseDataService } from './core/base-data.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService extends BaseDataService {
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

  getPlaylist(playlistId: string): Observable<Playlist> {
    return this.http
      .get<any>(`${this.baseUrl}/v1/playlists/${playlistId}`)
      .pipe(
        map<any, Playlist>(x => Playlist.parse(x)),
      );
  }
}
