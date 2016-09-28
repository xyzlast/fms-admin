import {
  Component, OnInit, Input, Output, OnChanges, SimpleChanges,
  animate, trigger, state, style, transition } from '@angular/core';
import { TenantService } from '../../shared/services';
import * as _ from 'lodash';

@Component({
  selector: 'app-mongo-state',
  templateUrl: './mongo-state.component.html',
  styleUrls: ['./mongo-state.component.css'],
  animations: [
    trigger('errorShowing', [
      state('hide', style({ height: '0px', display: 'none' })),
      state('show', style({ height: '250px', display: 'inherit' })),
      transition('hide <=> show', animate(250)),
    ])
  ]
})
export class MongoStateComponent implements OnInit, OnChanges {
  @Input()
  targetTenant: any;
  hasError: boolean = false;
  errorMessage: string;
  mongoStats: MongoStatItem[] = [];
  errorShowingValue: string = 'hide';
  doingCreateIndex: boolean = false;
  constructor(private tenantService: TenantService) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): any {
    if (changes['targetTenant'] && changes['targetTenant'].currentValue) {
      const tenant = changes['targetTenant'].currentValue;
      return this.loadMongoStats(tenant.id);
    }
  }

  public onInitMongoStats() {
    const tenantId = this.targetTenant.id;
    this.doingCreateIndex = true;
    const q = this.tenantService.initMongoStats(tenantId);
    return q.then(() => {
      this.doingCreateIndex = false;
      return this.loadMongoStats(tenantId);
    });
  }

  loadMongoStats(tenantId) {
    this.mongoStats = [];
    const q = this.tenantService.getMongoStats(tenantId);
    return q.then(mongoStat => {
      this.hasError = false;
      this.errorShowingValue = 'hide';
      mongoStat.forEach(m => {
        this.mongoStats.push(new MongoStatItem(tenantId, m));
      });
    }).catch(err => {
      this.errorMessage = err;
      this.hasError = true;
      this.errorShowingValue = 'show';
    });
  }
}

class MongoStatItem {
  public name: string;
  public count: number;
  public storageSize: number;
  public indexSize: number;
  public avgObjSize: number;
  public indexes: string;

  constructor(tenantId, jsonObj) {
    let name = jsonObj.name as string;
    this.name = name.substr(5).replace(tenantId.toString(), '');
    this.count = jsonObj.count;
    this.storageSize = jsonObj.storageSize;
    this.indexSize = jsonObj.indexSize;
    this.avgObjSize = jsonObj.avgObjSize;

    const indexNames: string[] = [];
    _.forIn(jsonObj.indexes, (value, key) => {
      indexNames.push(key);
    });
    this.indexes = indexNames.join(', ');
  }
};
