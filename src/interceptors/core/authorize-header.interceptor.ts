import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";

import { Observable, throwError } from "rxjs";

import { SessionStorageKeyConstant } from "@constants/core/session-storage-key.constant";
import { catchError } from "rxjs/operators";
import { AUTHORIZATION_SERVICE_INJECTOR } from "@constants/core/injection-token.constant";
import { IAuthorizationService } from "@services/interfaces/core/authorization-service.interface";
import { Router } from "@angular/router";

@Injectable()
export class AuthorizeHeaderInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    @Inject(AUTHORIZATION_SERVICE_INJECTOR) private authorizationService: IAuthorizationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loginToken = sessionStorage.getItem(SessionStorageKeyConstant.accessToken);
    if (!loginToken) {
      return next.handle(request);
    }

    let headers = request.headers
      .set('Authorization', `Bearer ${loginToken}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');

    const clonedRequest = request.clone({
      headers,
    });

    return next.handle(clonedRequest).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.authorizationService.logOut();
          this.router.navigate([]);
        }

        return throwError(error);
      })
    );
  }
}
