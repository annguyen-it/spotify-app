import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar.component';
import {
  AUTHORIZATION_SERVICE_INJECTOR,
  SESSION_STORAGE_SERVICE_INJECTOR,
  SIGN_UP_SERVICE_INJECTOR,
  UPGRADE_ACCOUNT_SERVICE_INJECTOR
} from '@constants/core/injection-token.constant';
import { AuthorizationService } from '@services/implementations/core/authorization.service';
import { SessionStorageService } from '@services/implementations/storage/session-storage.service';
import { SignUpService } from '@services/implementations/core/sign-up.service';
import { UpgradeAccountService } from '@services/implementations/core/upgrade-account.service';

@NgModule({
  imports: [CommonModule
  ],
  declarations: [TopBarComponent],
  providers: [
    {
      provide: AUTHORIZATION_SERVICE_INJECTOR,
      useClass: AuthorizationService,
    },
    {
      provide: SIGN_UP_SERVICE_INJECTOR,
      useClass: SignUpService,
    },
    {
      provide: SESSION_STORAGE_SERVICE_INJECTOR,
      useClass: SessionStorageService,
    },
    {
      provide: UPGRADE_ACCOUNT_SERVICE_INJECTOR,
      useClass: UpgradeAccountService,
    }
  ],
  exports: [TopBarComponent]
})
export class TopBarModule { }
