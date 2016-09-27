import { Component, OnInit } from '@angular/core';
import { TenantService } from '../shared/services';

@Component({
  selector: 'app-mongo',
  templateUrl: './mongo.component.html',
  styleUrls: ['./mongo.component.css']
})
export class MongoComponent implements OnInit {
  tenants: any[];
  constructor(private tenantService: TenantService) { }

  ngOnInit() {
    this.tenantService.listAll().then(tenants => {
      this.tenants = tenants;
    });
  }

  onSelectedTenant(event) {
    console.log(event);
  }
}
