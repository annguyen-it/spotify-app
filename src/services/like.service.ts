import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Playlist } from '@models/playlist/playlist.model';
import { Observable } from 'rxjs';
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

  // getLikeSongs(): Observable<any> {
  //   return this.http
  //     .get<any>(
  //       `${this.baseUrl}v1/me/tracks`
  //     )
  // }

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

}
