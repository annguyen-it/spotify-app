import { IAuthenticationService } from '@services/interfaces/core/authentication-service.interface';
import { AUTHENTICATION_SERVICE_INJECTOR } from '@constants/core/injection-token.constant';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'spotify-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  constructor(
    @Inject(AUTHENTICATION_SERVICE_INJECTOR) private authenticationService: IAuthenticationService
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    this.authenticationService.externalLogin();
  }
}
