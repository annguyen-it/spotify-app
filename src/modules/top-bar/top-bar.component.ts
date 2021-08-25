import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PublicUser } from '@models/user/public-user.model';
import { Subscription } from 'rxjs';
import { AuthorizationService } from '@services/implementations/core/authorization.service';
import { SignUpService } from '@services/implementations/core/sign-up.service';
import { UpgradeAccountService } from '@services/implementations/core/upgrade-account.service';
import { UserProfileService } from '@services/implementations/user-profile/user-profile.service';

@Component({
  selector: 'spotify-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit, OnDestroy {
  isAuthorized!: boolean;
  userProfile?: PublicUser;
  userProfileSub = new Subscription();
  openDropDown = false;

  constructor(
    private elementRef: ElementRef,
    private authorizationService: AuthorizationService,
    private signUpService: SignUpService,
    private upgradeAccountService: UpgradeAccountService,
    private currentUserProfileService: UserProfileService,
  ) { }

  ngOnInit(): void {
    this.authorizationService
      .isAuthorized()
      .subscribe((isAuthorized) => {
        this.isAuthorized = isAuthorized;
        if (isAuthorized) {
          this.userProfileSub = this.currentUserProfileService.getCurrentUserProfile()
            .subscribe((profile) => {
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
