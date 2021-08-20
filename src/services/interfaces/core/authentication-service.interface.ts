import { LoginSuccessInfo } from '@models/core/login-success-info.model';

export interface IAuthenticationService {
  externalLogin(): void;

  handleLoginSuccess(loginSuccessInfo: LoginSuccessInfo): void;

  handleLoginFailure(): void;

  logOut(): void;
}
