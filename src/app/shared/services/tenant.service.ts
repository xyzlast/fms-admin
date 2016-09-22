import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { BaseService } from './';

@Injectable()
export class TenantService {

  constructor(private http: Http) {}
  listAll(): Promise<any> {
    const url = '/fms-api/v2/admin/common/list';
    const obj = this.http.get(url, {withCredentials: true});
    return BaseService.progress(obj);
  }
  getFeatures(tenantId): Promise<any> {
    const url = '/fms-api/v2/admin/common/features';
    const params = new URLSearchParams();
    params.set('tenantId', tenantId);
    const obj = this.http.get(url, { search: params, withCredentials: true });
    return BaseService.progress(obj);
  }
  setFeatures(tenantId, features): Promise<any> {
    const url = '/fms-api/v2/admin/common/features';
    const body = JSON.stringify({ tenantId, features });
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const obj = this.http.post(url, body, new RequestOptions({headers: headers}));
    return BaseService.progress(obj);
  }
}
