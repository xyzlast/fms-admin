import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export class BaseService {
  public static progress(obj: Observable<Response>): Promise<any> {
    return new Promise((resolve, reject) => {
      obj.subscribe(body => {
        const data = body.json();
        if (data.ok) {
          resolve(data.data);
        } else {
          reject(data.message);
        }
      });
    });
  }
};
