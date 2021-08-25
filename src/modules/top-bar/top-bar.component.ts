import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PublicUser } from '@models/user/public-user.model';
import { Subscription } from 'rxjs';
import { UserProfileService } from '@services/user-profile.service';
import { AuthorizationService } from '@services/authorization.service';
import { AccountService } from '@services/account.service';

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
    private userProfileService: UserProfileService,
    private accountService: AccountService,
  ) { }

  ngOnInit(): void {
    this.authorizationService
      .isAuthorized()
      .subscribe((isAuthorized) => {
        this.isAuthorized = isAuthorized;
        if (isAuthorized) {
          this.userProfileSub = this.userProfileService.getCurrentUserProfile()
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
    this.accountService.signUp();
  }

  login(): void {
    this.authorizationService.externalLogin();
  }

  upgrade(): void {
    this.accountService.upgrade();
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
