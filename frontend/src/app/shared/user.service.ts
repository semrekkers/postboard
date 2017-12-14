import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

import { AppConfig } from '../app.config';
import { User } from '../models/user.model';
import { ApiService } from './api.service';

@Injectable()
export class UserService {
  private currentUser: User = null;

  constructor(private auth: AuthService, private api: ApiService) { }

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      if (!this.auth.isAuthenticated()) {
        return reject(new Error('No authenticated user'));
      }
      if (this.currentUser == null) {
        this.api.get<User>('/users/current').toPromise()
          .then((user) => {
            this.currentUser = user;
            return user;
          })
          .catch((err) => reject(err));
      } else {
        resolve(this.currentUser);
      }
    });
  }

  getCachedUser() {
    return this.currentUser;
  }

  clearCache() {
    this.currentUser = null;
  }

}
