import { ActivatedRoute, Router } from '@angular/router';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AUTHORIZATION_SERVICE_INJECTOR } from '@constants/core/injection-token.constant';
import { IAuthorizationService } from '@services/interfaces/core/authorization-service.interface';

@Component({
  selector: 'spotify-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  authorizationSuccessSub!: Subscription;
  authorizationFailureSub!: Subscription;

  constructor(
    @Inject(AUTHORIZATION_SERVICE_INJECTOR) private authorizationService: IAuthorizationService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.authorizationSuccessSub = this.route.fragment
      .pipe(
        filter(fragment => fragment !== null),
        map(fragment => new URLSearchParams(fragment!)),
        map(params => ({
          accessToken: params.get('access_token'),
        })),
        filter(params => !!params.accessToken)
      )
      .subscribe(
        (loginInfo) => {
          this.authorizationService.handleLoginSuccess(loginInfo);
          this.router.navigate([]);
        }
      );

    this.authorizationFailureSub = this.route.queryParams
      .pipe(
        filter(params => params.error !== undefined),
      )
      .subscribe(
        () => {
          this.authorizationService.handleLoginFailure();
          this.router.navigate([]);
        }
      );
  }

  ngOnDestroy(): void {
    this.authorizationSuccessSub.unsubscribe();
    this.authorizationFailureSub.unsubscribe();
  }
}
