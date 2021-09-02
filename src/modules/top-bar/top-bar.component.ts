import { Component, OnDestroy, OnInit } from '@angular/core';
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
  userProfile?: PublicUser;
  userProfileSub = new Subscription();

  constructor(
    private accountService: AccountService,
    private userProfileService: UserProfileService,
    private authorizationService: AuthorizationService,
  ) { }

  ngOnInit(): void {
    this.authorizationService
      .isAuthorized()
      .subscribe((isAuthorized) => {
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
}
