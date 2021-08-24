import { IAuthorizationService } from '@services/interfaces/core/authorization-service.interface';
import { Component, ElementRef, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { AUTHORIZATION_SERVICE_INJECTOR, SIGN_UP_SERVICE_INJECTOR, UPGRADE_ACCOUNT_SERVICE_INJECTOR, USER_PROFILE_SERVICE_INJECTOR } from '@constants/core/injection-token.constant';
import { ISignUpService } from '@services/interfaces/core/sign-up-service.interface';
import { IUpgradeAccountService } from '@services/interfaces/core/upgrade-account-service.interface';
import { IUserProfileService } from '@services/interfaces/user-profile/user-profile-service.interface';
import { take, tap } from 'rxjs/operators';
import { UserProfile } from '@models/user-profile/user-profile.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'spotify-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit, OnDestroy {
  isAuthorized!: boolean;
  userProfile?: UserProfile;
  userProfileSub = new Subscription();
  openDropDown = false;

  constructor(
    private elementRef: ElementRef,
    @Inject(AUTHORIZATION_SERVICE_INJECTOR) private authorizationService: IAuthorizationService,
    @Inject(SIGN_UP_SERVICE_INJECTOR) private signUpService: ISignUpService,
    @Inject(UPGRADE_ACCOUNT_SERVICE_INJECTOR) private upgradeAccountService: IUpgradeAccountService,
    @Inject(USER_PROFILE_SERVICE_INJECTOR) private currentUserProfileService: IUserProfileService,
  ) { }

  ngOnInit(): void {
    this.authorizationService
      .isAuthorized()
      .subscribe((isAuthorized) => {
        this.isAuthorized = isAuthorized;
        if (isAuthorized) {
          this.userProfileSub = this.currentUserProfileService.getCurrentUserProfile()
            .pipe(take(1))
            .subscribe((profile) => {
              console.log(profile);
              this.userProfile = profile;
            });
        } else {
          this.userProfileSub.unsubscribe();
          this.userProfile = undefined;
        }
      });
  }

  ngOnDestroy(): void {
    this.userProfileSub.unsubscribe();
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

  toggleDropDown(): void {
    this.openDropDown = !this.openDropDown;
  }

  logOut(): void {
    this.authorizationService.logOut();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;
    if (targetElement && !this.elementRef.nativeElement.contains(targetElement)) {
      this.openDropDown = false;
    }
  }
}
