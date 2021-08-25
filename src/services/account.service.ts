import { Injectable } from '@angular/core';
import { APP_SETTINGS } from './app-settings.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  signUp(): void {
    window.location.href = `${APP_SETTINGS.signUpUrl}?forward_url=${APP_SETTINGS.redirectUrl}`;
  }
  
  upgrade(): void {
    window.location.href = APP_SETTINGS.upgradeAccountUrl;
  }
}
