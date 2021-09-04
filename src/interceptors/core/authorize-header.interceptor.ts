import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, throwError } from "rxjs";

import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { AuthorizationService } from "@services/authorization.service";
import { SessionStorageKeyConstant } from "@constants/session-storage-key.constant";

@Injectable()
export class AuthorizeHeaderInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authorizationService: AuthorizationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loginToken = sessionStorage.getItem(SessionStorageKeyConstant.accessToken);
    const clientCredentials = sessionStorage.getItem(SessionStorageKeyConstant.clientCredentials);

    let headers;

    if (loginToken) {
      headers = request.headers
        .set('Authorization', `Bearer ${loginToken}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json');
    } else if (clientCredentials) {
      headers = request.headers
        .set('Authorization', `Bearer ${clientCredentials}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json');
    } else {
      return next.handle(request);
    }

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
