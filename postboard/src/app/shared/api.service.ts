import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

import { AppConfig } from '../app.config';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  post<t>(path: string, payload: Object) {
    return this.http.post<t>(this.getApiPath(path), payload, { headers: this.getHeaders() });
  }

  get<t>(path: string) {
    return this.http.get<t>(this.getApiPath(path), { headers: this.getHeaders() });
  }

  put<t>(path: string, payload: Object) {
    return this.http.put<t>(this.getApiPath(path), payload, { headers: this.getHeaders() });
  }

  delete<t>(path: string) {
    return this.http.delete<t>(this.getApiPath(path), { headers: this.getHeaders() });
  }

  getApiPath(path: string) {
    return AppConfig.API_ENDPOINT + path;
  }

  getHeaders() {
    return new HttpHeaders({
      'Authorization': this.auth.getTokenHeader()
    });
  }
}
