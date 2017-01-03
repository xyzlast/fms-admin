import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BaseService } from './base.service';

@Injectable()
export class AuthService {
  constructor(private http: Http) {}
  checkAuth(): Promise<any> {
    const obj = this.http.get('/fms-api/v2/auth/info', { withCredentials: true });
    return BaseService.progress(obj);
  }
}
