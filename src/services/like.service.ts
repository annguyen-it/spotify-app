import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Playlist } from '@models/playlist/playlist.model';
import { Observable } from 'rxjs';
import { isDeepStrictEqual } from 'util';
import { BaseDataService } from './core/base-data.service';

@Injectable({
  providedIn: 'root'
})
export class LikeService extends BaseDataService {

  constructor(
    private http: HttpClient,
  ) {
    super();
  }

  checkCurrentUserSavedSong(ids:any): Observable<any> {
    return this.http
      .get<any>(
        `${this.baseUrl}/v1/me/tracks/contains`,
        {
          params: {
            ids: ids,
          }
        }
      )
  }

  followPlaylist(playlistId:string): Observable<Playlist> {
    const contentType = {
        "public": false
    };
    return this.http
      .put<any>(
        `${this.baseUrl}/v1/playlists/${playlistId}/followers`,
        contentType
      )
  }

  unfollowPlaylist(playlistId:string): Observable<Playlist> {
    return this.http
      .delete<any>(
        `${this.baseUrl}/v1/playlists/${playlistId}/followers`
      )
  }

  checkIfFollowPlaylist(playlistId:string, ids: string): Observable<any> {
    return this.http
      .get<any>(
        `${this.baseUrl}/v1/playlists/${playlistId}/followers/contains`,
        {
          params: {
            ids: ids,
          }
        }
      )
  }

  saveTrackCurrentUser(ids: string): Observable<any> {
    console.log('like')
    return this.http
      .put<any>(
        `${this.baseUrl}/v1/me/tracks`,
        {
          params: {
            'ids': ids,
          }
        }
      )
  }

}
