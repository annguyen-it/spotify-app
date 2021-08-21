import { LoginSuccessInfo } from '@models/core/login-success-info.model';
import { Observable } from 'rxjs';

export interface IAuthorizationService {
  externalLogin(): void;

  handleLoginSuccess(loginSuccessInfo: LoginSuccessInfo): void;

  handleLoginFailure(): void;

  logOut(): void;

  isAuthorized(): Observable<boolean>;
}
