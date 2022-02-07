import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Playlist } from '@models/playlist/playlist.model';
import { GetListOfCurrentUserPlaylistsResponse } from '@models/response/get-list-of-current-user-playlists.model';
import { Paging } from '@models/track/paging.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseDataService } from './core/base-data.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService extends BaseDataService {

  constructor(private http: HttpClient) {
    super();
  }

  createPlaylist(userId: string, length:number): Observable<Playlist> {
    const newPlaylist = {
      "name": `New Playlist #${length + 1}`,
      "description": "New playlist description",
      "public": false
    };
    return this.http
      .post<any>(
        `${this.baseUrl}/v1/users/${userId}/playlists`,
        newPlaylist
      );
  }

  getListOfCurrentUserPlaylists(): Observable<GetListOfCurrentUserPlaylistsResponse> {
    return this.http
      .get<any>(
        `${this.baseUrl}/v1/me/playlists`,
      )
      .pipe(
        map<any, GetListOfCurrentUserPlaylistsResponse>(x => GetListOfCurrentUserPlaylistsResponse.parse(x)),
      );
  }

  getUserSavedTracks(): Observable<Paging> {
    return this.http
      .get<any>(
        `${this.baseUrl}/v1/me/tracks`,
      )
      .pipe(
        map<any, Paging>(x => Paging.parse(x)),
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
