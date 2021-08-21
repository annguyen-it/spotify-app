import { IAuthorizationService } from '@services/interfaces/core/authorization-service.interface';
import { Component, Inject, OnInit } from '@angular/core';
import { AUTHORIZATION_SERVICE_INJECTOR } from '@constants/core/injection-token.constant';
import { Observable } from 'rxjs';

@Component({
  selector: 'spotify-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  isAuthorized!: boolean;

  constructor(
    @Inject(AUTHORIZATION_SERVICE_INJECTOR) private authorizationService: IAuthorizationService
  ) { }

  ngOnInit(): void {
    this.authorizationService.isAuthorized()
      .subscribe(
        (isAuthorized) => this.isAuthorized = isAuthorized
      );
  }

  login(): void {
    this.authorizationService.externalLogin();
  }

  logOut(): void {
    this.authorizationService.logOut();
  }
}
