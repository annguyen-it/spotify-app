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
      "name": "New 1231231231",
      "description": "New playlist description",
      "public": false
    }
    return this.http
      .post<any>(
        `${this.baseUrl}/v1/users/313rd24fobu56dorkjkvty5p6ata/playlists`,
        newPlaylist
      )
  }

  deletePlaylist(userId?: string): Observable<Playlist> {
    return this.http
      .delete<any>(
        `${this.baseUrl}/v1/users/313rd24fobu56dorkjkvty5p6ata/playlists`,
      )
  }
}
