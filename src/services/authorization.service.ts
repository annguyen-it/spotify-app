import { BehaviorSubject, Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';

import { LoginSuccessInfo } from '@models/core/login-success-info.model';

import { APP_SETTINGS, SPOTIFY_AUTHORIZE } from './settings.service';
import { SessionStorageService } from './session-storage.service';
import { SessionStorageKeyConstant } from '@constants/session-storage-key.constant';

@Injectable({ providedIn: 'root' })
export class AuthorizationService implements OnDestroy {
  isAuthorized$ = new BehaviorSubject<boolean>(false);
  private authorizationSessionSub!: Subscription;

  constructor(private sessionStorageService: SessionStorageService) {
    this.init();
  }

  private init(): void {
    this.authorizationSessionSub = this.sessionStorageService
      .watch(SessionStorageKeyConstant.accessToken)
      .subscribe(
        (token) => this.isAuthorized$.next(token !== null),
        () => this.isAuthorized$.next(false),
        () => this.isAuthorized$.next(false)
      );
  }

  ngOnDestroy(): void {
    this.isAuthorized$.complete();
    this.authorizationSessionSub.unsubscribe();
  }

  externalLogin(): void {
    const params = new URLSearchParams({
      response_type: 'token',
      show_dialog: 'true',
      client_id: SPOTIFY_AUTHORIZE.clientId,
      redirect_uri: APP_SETTINGS.redirectUrl,
      scope: SPOTIFY_AUTHORIZE.scope.join(' ')
    })

    window.location.href = `${APP_SETTINGS.authorizeUrl}?${params.toString()}`;
  }

  handleLoginSuccess(loginSuccessInfo: LoginSuccessInfo): void {
    if (loginSuccessInfo.accessToken) {
      this.sessionStorageService.setItem(SessionStorageKeyConstant.accessToken, loginSuccessInfo.accessToken);
    }
  }

  handleLoginFailure(): void {
    this.sessionStorageService.clear();
  }

  logOut(): void {
    this.sessionStorageService.clear();
  }

  isAuthorized(): Observable<boolean> {
    return this.isAuthorized$.asObservable();
  }
}
