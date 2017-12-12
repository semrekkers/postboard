import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';

import { AppConfig } from '../app.config';

const lsKey = 'postboard_auth_token';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  getToken() {
    return window.sessionStorage.getItem(lsKey);
  }

  getTokenHeader() {
    return 'Bearer ' + this.getToken();
  }

  setToken(token: string) {
    window.sessionStorage.setItem(lsKey, token);
  }

  isAuthenticated() {
    return this.getToken() != null;
  }

  login(username: string, password: string) {
    this.logout();
    let payload = {
      username: username,
      password: password
    };

    return new Promise((resolve, reject) => {
      this.http.post(
        AppConfig.API_ENDPOINT + '/sessions',
        payload
      ).subscribe(
        (data) => {
          this.setToken(data['token']);
          resolve();
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  logout() {
    window.sessionStorage.removeItem(lsKey);
  }
}
