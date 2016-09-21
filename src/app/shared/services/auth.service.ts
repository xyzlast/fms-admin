import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// import { URLSearchParams } from '@angular/http';
// import * as _ from 'lodash';

@Injectable()
export class AuthService {
  constructor(private http: Http) { }

  checkAuth(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get('/fms-api/v2/admin/auth/info', {withCredentials: true})
        .subscribe(body => {
          const data = body.json();
          if (data.ok) {
            return resolve(data.data);
          }
          return reject(data);
        });
    });
  }
}
