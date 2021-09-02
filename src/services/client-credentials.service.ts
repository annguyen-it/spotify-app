import { BehaviorSubject, Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';

import { SessionStorageService } from './session-storage.service';
import { SessionStorageKeyConstant } from '@constants/session-storage-key.constant';
import { HttpClient } from '@angular/common/http';
import { APP_SETTINGS, SPOTIFY_AUTHORIZE } from './settings.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ClientCredentialsService implements OnDestroy {
  private gotCredentials$ = new BehaviorSubject<boolean>(false);
  private clientCredentialsSub!: Subscription;

  constructor(
    private http: HttpClient,
    private sessionStorageService: SessionStorageService
  ) {
    this.init();
  }

  private init(): void {
    this.clientCredentialsSub = this.sessionStorageService
      .watch(SessionStorageKeyConstant.clientCredentials)
      .subscribe(
        (token) => this.gotCredentials$.next(token !== null),
        () => this.gotCredentials$.next(false),
        () => this.gotCredentials$.next(false)
      );
  }

  requestCredentials(): Observable<void> {
    const body = new URLSearchParams({
      'grant_type': 'client_credentials'
    });

    return this.http
      .post<any>(APP_SETTINGS.clientCredentialsUrl, body, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${btoa(SPOTIFY_AUTHORIZE.clientId + ':' + SPOTIFY_AUTHORIZE.clientSecret)}`
        }
      })
      .pipe(
        map(e => this.saveCredentials(e))
      );
  }

  private saveCredentials(accessToken: any): void {
    this.sessionStorageService.setItem(SessionStorageKeyConstant.clientCredentials, accessToken.access_token);
  }

  ngOnDestroy(): void {
    this.gotCredentials$.complete();
    this.clientCredentialsSub.unsubscribe();
  }

  gotCredentials(): Observable<boolean> {
    return this.gotCredentials$.asObservable();
  }
}
