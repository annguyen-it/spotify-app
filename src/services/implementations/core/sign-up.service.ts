import { Injectable } from "@angular/core";
import { ISignUpService } from "@services/interfaces/core/sign-up-service.interface";
import { APP_SETTINGS } from "./app-settings.service";

@Injectable()
export class SignUpService implements ISignUpService {
  signUp(): void {
    window.location.href = `${APP_SETTINGS.signUpUrl}?forward_url=${APP_SETTINGS.redirectUrl}`;
  }
}
