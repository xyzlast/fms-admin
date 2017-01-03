import {
  Component, OnInit, Input, Output, OnChanges, SimpleChanges,
  animate, trigger, state, style, transition
} from '@angular/core';
import { TenantService } from '../../shared/services/tenant.service';
import { CodeService } from '../../shared/services/code.service';
import { Broadcaster } from '../../shared/utils';

@Component({
  selector: 'app-mongo',
  templateUrl: './mongo.component.html',
  styleUrls: ['./mongo.component.css'],
  animations: [
    trigger('errorShowing', [
      state('hide', style({ height: '0px', display: 'none' })),
      state('show', style({ height: '250px', display: 'inherit' })),
      transition('hide <=> show', animate(250)),
    ])
  ]
})
export class MongoComponent implements OnInit {
  private targetTenant: any;
  private hasError: boolean = false;
  private errorMessage: string;
  private mongoStats: MongoStatItem[] = [];
  private errorShowingValue: string = 'hide';
  private doingCreateIndex: boolean = false;

  constructor(private codeService: CodeService,
    private tenantService: TenantService,
    private broadcaster: Broadcaster) { }


  public ngOnInit() {
    this.broadcaster.on<any>('onSelectedTenant').subscribe(tenant => {
      this.fillMongoStats(tenant);
    });
    const tenantJson = localStorage.getItem('selectedTenant');
    if (tenantJson) {
      const tenant = JSON.parse(tenantJson);
      this.fillMongoStats(tenant);
    }
  }

  public onInitMongoStats() {
    const tenantId = this.targetTenant.id;
    this.doingCreateIndex = true;
    const q = this.tenantService.initMongoStats(tenantId);
    return q.then(() => {
      this.doingCreateIndex = false;
      return this.fillMongoStats(tenantId);
    });
  }

  public fillMongoStats(tenant) {
    if (this.targetTenant && this.targetTenant.id === tenant.id) {
      return;
    }
    this.targetTenant = tenant;
    this.mongoStats = [];
    const q = this.tenantService.getMongoStats(tenant.id);
    return q.then(mongoStat => {
      this.hasError = false;
      this.errorShowingValue = 'hide';
      mongoStat.forEach(m => {
        this.mongoStats.push(new MongoStatItem(tenant.id, m));
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
    let name: string = <string> jsonObj.name;
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
