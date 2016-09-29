import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

interface BroadcastEvent {
  key: string;
  data?: any;
}

@Injectable()
export class Broadcaster {
  private eventBus: Subject<BroadcastEvent>;

  constructor() {
    this.eventBus = new Subject<BroadcastEvent>();
  }

  public broadcast(key: string, data?: any): void {
    this.eventBus.next({key, data});
  }

  public on<T>(key: string): Observable<T> {
    return this.eventBus.asObservable()
      .filter(event => event.key === key)
      .map(event => <T> event.data);
  }
}
