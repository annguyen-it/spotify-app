import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProfile } from '@models/user-profile/user-profile.model';
import { IUserProfileService } from '@services/interfaces/user-profile/user-profile-service.interface';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { APP_SETTINGS } from '../core/app-settings.service';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  constructor(private http: HttpClient) { }

  getCurrentUserProfile(): Observable<UserProfile> {
    return this.http
      .get<UserProfile>(`${APP_SETTINGS.baseUrl}/v1/me`)
      .pipe(
        map<any, UserProfile>((profile) => ({
          ...profile,
          displayName: profile.display_name,
          externalUrls: profile.externalUrls
        }))
      );
  }

  getProfile(userId: string): Observable<UserProfile> {
    return this.http
      .get<any>(`${APP_SETTINGS.baseUrl}/v1/${userId}`)
      .pipe(
        map<any, UserProfile>((profile) => ({
          ...profile,
          displayName: profile.display_name,
          externalUrls: profile.externalUrls
        }))
      );
  }
}
