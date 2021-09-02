import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AuthorizationService } from '@services/authorization.service';
import { ClientCredentialsService } from '@services/client-credentials.service';
import { ContextMenuService } from '@services/context-menu.service';

@Component({
  selector: 'spotify-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  authorizationSuccessSub!: Subscription;
  authorizationFailureSub!: Subscription;
  clientCredentialsSub!: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contextMenuService: ContextMenuService,
    private authorizationService: AuthorizationService,
    private clientCredentialsService: ClientCredentialsService
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

    this.clientCredentialsSub = this.clientCredentialsService
      .gotCredentials()
      .pipe(
        map(async (gotCredentials) => {
          if (!gotCredentials){
            await this.clientCredentialsService.requestCredentials().toPromise();
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.authorizationSuccessSub.unsubscribe();
    this.authorizationFailureSub.unsubscribe();
  }

  @HostListener('contextmenu', ['$event'])
  onRightClick(event: MouseEvent): void {
    event.preventDefault();
    this.contextMenuService.close();
  }

  @HostListener('click')
  onClick(): void {
    this.contextMenuService.close();
  }
  
  @HostListener('wheel')
  onScroll(): void {
    this.contextMenuService.close();
  }
}
