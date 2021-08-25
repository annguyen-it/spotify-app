import { BehaviorSubject, Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { SessionStorageKeyConstant } from '@constants/core/session-storage-key.constant';
import { Injectable, OnDestroy } from '@angular/core';

import { LoginSuccessInfo } from '@models/core/login-success-info.model';

import { APP_SETTINGS } from './app-settings.service';
import { SessionStorageService } from '../storage/session-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthorizationService implements OnDestroy {
  isAuthorized$ = new BehaviorSubject<boolean>(false);
  private authorizationSessionSub!: Subscription;

  constructor(private sessionStorageService: SessionStorageService) {
    this.init();
  }

  init(): void {
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
    window.location.href = `${APP_SETTINGS.authorizeUrl}?client_id=${APP_SETTINGS.clientId}&response_type=token&redirect_uri=${APP_SETTINGS.redirectUrl}`;
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
