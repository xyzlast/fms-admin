import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { BaseService } from './';

@Injectable()
export class CodeService {

  constructor(private http: Http) {}

  getByTypeId(codeTypeId: string): Promise<any> {
    const url = '/fms-api/v2/system/code/type';
    const params: URLSearchParams = new URLSearchParams();
    params.set('type', codeTypeId);
    const obj = this.http.get(url, {search: params, withCredentials: true});
    return BaseService.progress(obj);
  }

}
