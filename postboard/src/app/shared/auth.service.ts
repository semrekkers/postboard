import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';

const lsKey = 'postboard_auth_token';

@Injectable()
export class AuthService {

  constructor(private api: ApiService, private http: HttpClient) { }

  getToken(): string {
    return window.sessionStorage.getItem(lsKey);
  }

  setToken(token: string) {
    window.sessionStorage.setItem(lsKey, token);
  }

  isAuthenticated(): boolean {
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
        this.api.getApiPath('/api/v1/sessions'),
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
