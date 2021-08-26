import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetCurrentUserRecentlyPlayedTracksResponse } from '@models/response/get-current-user-recently-played-tracks.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseDataService } from './core/base-data.service';

@Injectable({ providedIn: 'root' })
export class PlayerService extends BaseDataService {
  constructor(private http: HttpClient) {
    super();
  }

  getCurrentUserRecentlyPlayedTracks(): Observable<GetCurrentUserRecentlyPlayedTracksResponse> {
    return this.http
      .get<any>(
        `${this.baseUrl}/v1/me/player/recently-played`
      )
      .pipe(
        map<any, GetCurrentUserRecentlyPlayedTracksResponse>((response => ({
          ...response
        })))
      );
  }
}
