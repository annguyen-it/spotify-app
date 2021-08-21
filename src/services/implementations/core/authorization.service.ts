import { BehaviorSubject, Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { SessionStorageKeyConstant } from '@constants/core/session-storage-key.constant';
import { Inject, Injectable, OnDestroy, OnInit } from '@angular/core';

import { IAuthorizationService } from '@services/interfaces/core/authorization-service.interface';
import { LoginSuccessInfo } from '@models/core/login-success-info.model';

import { APP_SETTINGS } from './app-settings.service';
import { SESSION_STORAGE_SERVICE_INJECTOR } from '@constants/core/injection-token.constant';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthorizationService implements IAuthorizationService, OnInit, OnDestroy {
  isAuthorized$ = new BehaviorSubject<boolean>(false);
  private authorizationSessionSub!: Subscription;

  constructor(
    private router: Router,
    @Inject(SESSION_STORAGE_SERVICE_INJECTOR) private sessionStorageService: StorageService) {
  }

  ngOnInit(): void {
    const accessToken = this.sessionStorageService.getItem(SessionStorageKeyConstant.accessToken);
    if (accessToken != null) {
      this.isAuthorized$.next(true);
    }

    this.authorizationSessionSub = this.sessionStorageService.watch(SessionStorageKeyConstant.accessToken)
      .subscribe(
        (token) => this.isAuthorized$.next(token !== null),
        () => { },
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
      this.isAuthorized$.next(true);
      this.router.navigate([]);
    }
  }

  handleLoginFailure(): void {
    this.sessionStorageService.removeItem(SessionStorageKeyConstant.accessToken);
    this.isAuthorized$.next(false);
    this.router.navigate([]);
  }

  logOut(): void {
    this.sessionStorageService.removeItem(SessionStorageKeyConstant.accessToken);
    this.isAuthorized$.next(false);
    this.router.navigate([]);
  }

  isAuthorized(): Observable<boolean> {
    return this.isAuthorized$.asObservable();
  }
}
