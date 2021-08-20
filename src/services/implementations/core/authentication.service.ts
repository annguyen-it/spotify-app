import { HttpClient } from '@angular/common/http';
import { AppSettingsService } from './app-settings.service';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { IAuthenticationService } from '@services/interfaces/core/authentication-service.interface';

@Injectable()
export class AuthenticationService implements IAuthenticationService {
  constructor(
    private appSettingsService: AppSettingsService,
    private router: Router,
    private http: HttpClient,
  ) { }
}
