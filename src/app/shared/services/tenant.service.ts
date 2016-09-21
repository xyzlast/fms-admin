import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BaseService } from './';

@Injectable()
export class TenantService {

  constructor(private http: Http) {}
  listAll(): Promise<any> {
    const url = '/fms-api/v2/admin/common/list';
    const obj = this.http.get(url, {withCredentials: true});
    return BaseService.progress(obj);
  }
}
