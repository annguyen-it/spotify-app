import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppSettings } from '@models/core/app-settings.model';
import { LocalStorageKeyConstant } from '@constants/local-storage-key.constants';

export let APP_SETTINGS: AppSettings;

@Injectable({ providedIn: 'root' })
export class AppSettingsService {
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
      )
  }
}
