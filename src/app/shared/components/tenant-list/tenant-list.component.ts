import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-tenant-list',
  templateUrl: './tenant-list.component.html',
  styleUrls: ['./tenant-list.component.css']
})
export class TenantListComponent implements OnInit {
  @Input()
  tenants: any[];
  @Output()
  selectedTenant = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  select(tenantId: number) {
    this.tenants.forEach(tenant => tenant.selected = false);
    const selectedTenant = _(this.tenants).find(tenant => tenant.id === tenantId);
    selectedTenant.selected = true;
    this.selectedTenant.emit(selectedTenant);
  };
}
