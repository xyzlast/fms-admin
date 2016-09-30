import { Injectable, Injector } from '@angular/core';
import { Http, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { CodeService, BaseService } from './';

@Injectable()
export class TenantService {
  constructor(private http: Http) {
    console.log('tenantService constructor');
  }
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
  getMongoStats(tenantId): Promise<any> {
    const url = '/fms-api/v2/admin/system/mongo/stats';
    const params = new URLSearchParams();
    params.set('tenantId', tenantId);
    const obj = this.http.get(url, { search: params, withCredentials: true });
    return BaseService.progress(obj);
  }
  initMongoStats(tenantId): Promise<any> {
    const url = '/fms-api/v2/admin/system/mongo/stats';
    const body = JSON.stringify({ tenantId: tenantId });
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const obj = this.http.post(url, body, new RequestOptions({ headers: headers }));
    return BaseService.progress(obj);
  }
  getUsers(tenantId): Promise<any> {
    const url = '/fms-api/v2/admin/common/users';
    const params = new URLSearchParams();
    params.set('tenantId', tenantId);
    const obj = this.http.get(url, { search: params, withCredentials: true });
    return BaseService.progress(obj);
  }
}
