import { ActivatedRoute } from '@angular/router';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AUTHENTICATION_SERVICE_INJECTOR } from '@constants/core/injection-token.constant';
import { IAuthenticationService } from '@services/interfaces/core/authentication-service.interface';

@Component({
  selector: 'spotify-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  authenticationSuccessSub!: Subscription;
  authenticationFailureSub!: Subscription;

  constructor(
    @Inject(AUTHENTICATION_SERVICE_INJECTOR) private authenticationService: IAuthenticationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.authenticationSuccessSub = this.route.fragment
      .pipe(
        filter(fragment => fragment !== null),
        map(fragment => new URLSearchParams(fragment!)),
        map(params => ({
          accessToken: params.get('access_token'),
          tokenType: params.get('token_type'),
        }))
      )
      .subscribe(
        (loginInfo) => this.authenticationService.handleLoginSuccess(loginInfo)
      );

    this.authenticationFailureSub = this.route.queryParams
      .pipe(
        filter(params => params.error !== undefined),
      )
      .subscribe(
        () => this.authenticationService.handleLoginFailure()
      );
  }

  ngOnDestroy(): void {
    this.authenticationSuccessSub.unsubscribe();
    this.authenticationFailureSub.unsubscribe();
  }
}
