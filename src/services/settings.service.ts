import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppSettings } from '@models/core/app-settings.model';
import { LocalStorageKeyConstant } from '@constants/local-storage-key.constants';
import { SpotifyAuthorize } from '@models/core/spotify-authorize.model';

export let APP_SETTINGS: AppSettings;
export let SPOTIFY_AUTHORIZE: SpotifyAuthorize;

@Injectable({ providedIn: 'root' })
export class SettingsService {
  constructor(protected httpClient: HttpClient) { }

  loadAppSettingAsync(): Observable<AppSettings> {
    if (APP_SETTINGS) {
      return of(APP_SETTINGS);
    }

    const storedSettings = localStorage.getItem(LocalStorageKeyConstant.appSettings);
    if (storedSettings) {
      APP_SETTINGS = JSON.parse(storedSettings);
      return of(APP_SETTINGS);
    }

    const filePath = 'assets/settings/app-settings.json';
    return this.httpClient
      .get<AppSettings>(filePath)
      .pipe(
        tap((settings) => {
          APP_SETTINGS = settings;
          localStorage.setItem(LocalStorageKeyConstant.appSettings, JSON.stringify(settings));
        })
      );
  }

  loadSpotifyAuthorizeAsync(): Observable<SpotifyAuthorize> {
    if (SPOTIFY_AUTHORIZE) {
      return of(SPOTIFY_AUTHORIZE);
    }

    const storedSettings = localStorage.getItem(LocalStorageKeyConstant.spotifyAuthorize);
    if (storedSettings) {
      SPOTIFY_AUTHORIZE = JSON.parse(storedSettings);
      return of(SPOTIFY_AUTHORIZE);
    }

    const filePath = 'assets/settings/spotify-authorize.json';
    return this.httpClient
      .get<SpotifyAuthorize>(filePath)
      .pipe(
        tap((settings) => {
          SPOTIFY_AUTHORIZE = settings;
          localStorage.setItem(LocalStorageKeyConstant.spotifyAuthorize, JSON.stringify(settings));
        })
      );
  }

}
