import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { SessionStorageKeyConstant } from "@constants/core/session-storage-key.constant";

@Injectable()
export class AuthorizeHeaderInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loginResultJson = sessionStorage.getItem(SessionStorageKeyConstant.accessToken);
    const loginToken = loginResultJson ? JSON.parse(loginResultJson) : null;
    if (!loginToken){
      return next.handle(request);
    }

    let headers = request.headers
      .set('Authorization', `Bearer ${loginToken}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')

    const clonedRequest = request.clone({
      headers,
    });
    
    return next.handle(clonedRequest);
  }
}
