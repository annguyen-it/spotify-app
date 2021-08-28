import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Playlist } from '@models/playlist/playlist.model';
import { Observable } from 'rxjs';
import { BaseDataService } from './core/base-data.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService extends BaseDataService {

  constructor(private http: HttpClient) {
    super()
  }

  createPlaylist(userId?: string): Observable<Playlist> {
    const newPlaylist = {
      "name": "New playlist",
      "description": "New playlist description",
      "public": false
    }
    return this.http
      .post<any>(
        `${this.baseUrl}/v1/users/${userId}/playlists`,
        newPlaylist
      )
  }

}
