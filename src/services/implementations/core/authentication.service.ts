import { Injectable } from '@angular/core';

import { IAuthenticationService } from '@services/interfaces/core/authentication-service.interface';
import { LoginSuccessInfo } from '@models/core/login-success-info.model';

import { BaseDataService } from './base-data.service';
import { APP_SETTINGS } from './app-settings.service';

@Injectable()
export class AuthenticationService extends BaseDataService implements IAuthenticationService {
  constructor() {
    super();
  }
  
  externalLogin(): void {
    window.location.href = `${APP_SETTINGS.authorizeUrl}?client_id=${APP_SETTINGS.clientId}&response_type=token&redirect_uri=${APP_SETTINGS.redirectUrl}`;
  }

  handleLoginSuccess(loginSuccessInfo: LoginSuccessInfo): void {
    /// TODO: Implement handleLoginSuccess
    /// Save Login info to session storage
  }

  handleLoginFailure(): void {
    /// TODO: Implement handleLoginFailure
  }

  logOut(): void {
    // throw new Error('Method not implemented.');
  }
}
