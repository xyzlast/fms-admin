import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TenantService } from '../shared/services';

@Component({
  selector: 'app-mongo',
  templateUrl: './mongo.component.html',
  styleUrls: ['./mongo.component.css']
})
export class MongoComponent implements OnInit, OnChanges {
  tenants: any[];
  selectedTenant: any;
  constructor(private tenantService: TenantService) { }

  ngOnInit() {
    this.tenantService.listAll().then(tenants => {
      this.tenants = tenants;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  onSelectedTenant(event) {
    this.selectedTenant = event;
    console.log(this.selectedTenant);
  }
}
