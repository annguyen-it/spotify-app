import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppSettings } from '@models/core/app-settings.model';
import { IAppSettingService } from '@services/interfaces/core/app-setting-service.interface';
import { SessionStorageKeyConstant } from '@constants/core/session-storage-key.constant';


export let APP_SETTINGS: AppSettings;

@Injectable()
export class AppSettingsService implements IAppSettingService {
  constructor(protected httpClient: HttpClient) { }

  loadAppSettingAsync(): Observable<AppSettings> {
    if (APP_SETTINGS) {
      return of(APP_SETTINGS);
    }

    const storedSettings = sessionStorage.getItem(SessionStorageKeyConstant.appSettings);
    if (storedSettings) {
      APP_SETTINGS = JSON.parse(storedSettings);
      return of(APP_SETTINGS);
    }

    const filePath = '/assets/settings/app-settings.json';
    return this.httpClient
      .get<AppSettings>(filePath)
      .pipe(
        tap((settings) => {
          APP_SETTINGS = settings;
          sessionStorage.setItem(SessionStorageKeyConstant.appSettings, JSON.stringify(settings));
        })
      )
  }
}
