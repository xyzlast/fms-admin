import { Component, OnInit } from '@angular/core';
import { TenantService } from '../shared/services';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})
export class FeatureComponent implements OnInit {
  tenants: any[];
  constructor(private tenantService: TenantService) { }
  ngOnInit() {
    this.tenantService.listAll().then(tenants => {
      this.tenants = tenants;
    });
  }
  selectedTenant(event) {
    console.log(event);
  }
}
