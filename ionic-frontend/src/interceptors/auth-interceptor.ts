import { Observable } from "rxjs/Rx";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { Injectable } from "@angular/core";

import { API_CONFIG } from './../config/api.config';

import { StorageService } from "./../services/storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public storage: StorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let localUser = this.storage.getLocalUser();

    if (
      localUser &&
      req.url.substring(0, API_CONFIG.baseUrl.length) == API_CONFIG.baseUrl
    ) {
      const authReq = req.clone({
        headers: req.headers.set("Authorization", `Bearer ${localUser.token}`)
      });

      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
};
