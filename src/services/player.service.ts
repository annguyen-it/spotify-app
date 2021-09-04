import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetCurrentUserRecentlyPlayedTracksResponse } from '@models/response/get-current-user-recently-played-tracks.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseDataService } from './core/base-data.service';

@Injectable({ providedIn: 'root' })
export class PlayerService extends BaseDataService {
  constructor(private http: HttpClient) {
    super();
  }

  getCurrentUserRecentlyPlayedTracks(): Observable<GetCurrentUserRecentlyPlayedTracksResponse> {
    return this.http.get<GetCurrentUserRecentlyPlayedTracksResponse>(`${this.baseUrl}/v1/me/player/recently-played`);
  }

  transferUserPlayback(deviceId: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/v1/me/player`, {
      device_ids: [deviceId],
      play: false
    });
  }

  private startOrResumeUserPlayback(deviceId: string | null, params: {
    contextUri?: string;
    uris?: string[],
    offset?: any,
    positionMs?: number;
  }): Observable<void> {

    if (!!deviceId) {
      return this.http.put<void>(`${this.baseUrl}/v1/me/player/play`, {
        context_uri: params.contextUri,
        uris: params.uris,
        offset: params.offset,
        position_ms: params.positionMs
      }, {
        params: {
          device_id: deviceId!
        }
      });
    }

    return of();
  }

  togglePlayback(deviceId: string | null, uris: string): Observable<void> {
    return this.startOrResumeUserPlayback(deviceId, { uris: [uris] });
  }

  startNewPlayback(deviceId: string | null, contextUri: string): Observable<void> {
    return this.startOrResumeUserPlayback(deviceId, { contextUri });
  }

  setRepeatMode(deviceId: string | null, state: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/v1/me/player/repeat`, {}, {
      params: {
        device_ids: deviceId ?? '',
        state: state
      }
    });
  }

  toggleShuffle(deviceId: string | null, state: boolean): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/v1/me/player/shuffle`, {}, {
      params: {
        device_ids: deviceId ?? '',
        state: state
      }
    });
  }
}
