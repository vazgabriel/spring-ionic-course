import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';
import { JwtHelper } from "angular2-jwt";

import { API_CONFIG } from './../config/api.config';

import { CredenciaisDTO } from "../models/credenciais.dto";
import { LocalUser } from './../models/local_user';

import { CartService } from './cart.service';
import { StorageService } from './storage.service';

@Injectable()
export class AuthService {

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(
    public cartService: CartService,
    public http: HttpClient,
    public storage: StorageService
  ){}

  authenticate(creds: CredenciaisDTO): Observable<HttpResponse<string>> {
    return this.http.post(
      `${API_CONFIG.baseUrl}/login`,
      creds,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }

  refreshToken(): Observable<HttpResponse<string>> {
    return this.http.post(
      `${API_CONFIG.baseUrl}/auth/refresh_token`,
      {},
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }

  successfulLogin(authorizationValue: string): void {
    let token = authorizationValue.substring(7);
    let user: LocalUser = {
      token,
      email: this.jwtHelper.decodeToken(token).sub
    };

    this.storage.setLocalUser(user);
    this.cartService.createOrClearCart();
  }

  logout(): void {
    this.storage.setLocalUser(null);
  }

}
