import { Injectable } from '@angular/core';

/*
 * Global API config
 */
const API_ENDPOINT = 'http://localhost:3000';

@Injectable()
export class ApiService {

  constructor() { }

  getApiEndpoint(): string {
    return API_ENDPOINT;
  }

  getApiPath(path: string): string {
    return API_ENDPOINT + path;
  }
}
