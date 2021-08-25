import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, throwError } from "rxjs";

import { SessionStorageKeyConstant } from "@constants/core/session-storage-key.constant";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { AuthorizationService } from "@services/authorization.service";

@Injectable()
export class AuthorizeHeaderInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authorizationService: AuthorizationService
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
