import { Injectable } from '@angular/core';

@Injectable()
export class AlertService {

  constructor() { }

  error(err: Error) {
      console.error(err);
  }
}
