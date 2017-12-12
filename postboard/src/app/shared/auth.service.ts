import { Injectable } from '@angular/core';

const lsKey = 'postboard_auth_token';

@Injectable()
export class AuthService {

  constructor() { }

  getToken(): string {
    return window.localStorage.getItem(lsKey);
  }

  setToken(token: string) {
    window.localStorage.setItem(lsKey, token);
  }

  isAuthenticated(): boolean {
    return this.getToken() != null;
  }
}
