import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

import { AppConfig } from '../app.config';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient, private auth: AuthService, private router: Router) { }

  post<t>(path: string, payload: Object) {
    let req = this.http.post<t>(this.getApiPath(path), payload, { headers: this.getHeaders() });
    // req.subscribe(() => {}, (err) => {
    //   if (err.status == 401) {
    //     this.loginExpired();
    //   }
    // });
    return req;
  }

  get<t>(path: string) {
    let req = this.http.get<t>(this.getApiPath(path), { headers: this.getHeaders() });
    // req.subscribe(() => {}, (err) => {
    //   if (err.status == 401) {
    //     this.loginExpired();
    //   }
    // });
    return req;
  }

  put<t>(path: string, payload: Object) {
    let req = this.http.put<t>(this.getApiPath(path), payload, { headers: this.getHeaders() });
    // req.subscribe(() => {}, (err) => {
    //   if (err.status == 401) {
    //     this.loginExpired();
    //   }
    // });
    return req;
  }

  delete<t>(path: string) {
    let req = this.http.delete<t>(this.getApiPath(path), { headers: this.getHeaders() });
    // req.subscribe(() => {}, (err) => {
    //   if (err.status == 401) {
    //     this.loginExpired();
    //   }
    // });
    return req;
  }

  getApiPath(path: string) {
    return AppConfig.API_ENDPOINT + path;
  }

  getHeaders() {
    return new HttpHeaders({
      'Authorization': this.auth.getTokenHeader()
    });
  }

  private loginExpired() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
