import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { PublicUser } from '@models/user/public-user.model';
import { Subscription } from 'rxjs';
import { UserProfileService } from '@services/user-profile.service';
import { AuthorizationService } from '@services/authorization.service';
import { AccountService } from '@services/account.service';
import { BaseComponent } from '@modules/app/base/base.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'spotify-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent extends BaseComponent implements OnInit {
  userProfile?: PublicUser;
  userProfileSub = new Subscription();

  constructor(
    private location: Location,
    private accountService: AccountService,
    private userProfileService: UserProfileService,
    private authorizationService: AuthorizationService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.authorizationService
      .isAuthorized()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((isAuthorized) => {
        if (isAuthorized) {
          this.userProfileSub = this.userProfileService.getCurrentUserProfile()
            .pipe(
              takeUntil(this.destroy$),
            )
            .subscribe((profile) => {
              this.userProfile = profile;
            });
        } else {
          this.userProfileSub.unsubscribe();
          this.userProfile = undefined;
        }
      });
  }

  goBack(): void {
    this.location.back();
  }

  goForward(): void {
    this.location.forward();
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
