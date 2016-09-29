import { Component, OnInit } from '@angular/core';
import { TenantService } from '../shared/services';
import { Broadcaster } from '../shared/utils';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.css']
})
export class TenantComponent implements OnInit {
  tenants: any[];
  selectedTenant: any;
  constructor(private tenantService: TenantService,
    private broadcaster: Broadcaster) { }

  ngOnInit() {
    this.tenantService.listAll().then(tenants => {
      this.tenants = tenants;
    });
  }

  onSelectedTenant(event) {
    this.selectedTenant = event;
    this.broadcaster.broadcast('onSelectedTenant', this.selectedTenant);
  }
}
