import { IAuthorizationService } from '@services/interfaces/core/authorization-service.interface';
import { Component, Inject, OnInit } from '@angular/core';
import { AUTHORIZATION_SERVICE_INJECTOR, SIGN_UP_SERVICE_INJECTOR, UPGRADE_ACCOUNT_SERVICE_INJECTOR } from '@constants/core/injection-token.constant';
import { ISignUpService } from '@services/interfaces/core/sign-up-service.interface';
import { IUpgradeAccountService } from '@services/interfaces/core/upgrade-account-service.interface';

@Component({
  selector: 'spotify-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  isAuthorized!: boolean;

  constructor(
    @Inject(AUTHORIZATION_SERVICE_INJECTOR) private authorizationService: IAuthorizationService,
    @Inject(SIGN_UP_SERVICE_INJECTOR) private signUpService: ISignUpService,
    @Inject(UPGRADE_ACCOUNT_SERVICE_INJECTOR) private upgradeAccountService: IUpgradeAccountService
  ) { }

  ngOnInit(): void {
    this.authorizationService
      .isAuthorized()
      .subscribe((isAuthorized) => {
        this.isAuthorized = isAuthorized;
      });
  }

  signUp(): void {
    this.signUpService.signUp();
  }

  login(): void {
    this.authorizationService.externalLogin();
  }

  upgrade(): void {
    this.upgradeAccountService.upgrade();
  }

  openDropDown(): void {
    
  }

  logOut(): void {
    this.authorizationService.logOut();
  }
}
