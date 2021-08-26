import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PublicUser } from '@models/user/public-user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { APP_SETTINGS } from './settings.service';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  constructor(private http: HttpClient) { }

  getCurrentUserProfile(): Observable<PublicUser> {
    return this.http
      .get<any>(`${APP_SETTINGS.baseUrl}/v1/me`)
      .pipe(
        map<any, PublicUser>((profile) => ({
          ...profile,
          displayName: profile.display_name,
          externalUrls: profile.external_urls
        }))
      );
  }

  getProfile(userId: string): Observable<PublicUser> {
    return this.http
      .get<any>(`${APP_SETTINGS.baseUrl}/v1/${userId}`)
      .pipe(
        map<any, PublicUser>((profile) => ({
          ...profile,
          displayName: profile.display_name,
          externalUrls: profile.external_urls
        }))
      );
  }
}
