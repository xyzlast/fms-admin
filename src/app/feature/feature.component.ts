import { Component, OnInit } from '@angular/core';
import { TenantService } from '../shared/services';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})
export class FeatureComponent implements OnInit {
  tenants: any[];
  targetTenant: any;
  features: any[];
  constructor(private tenantService: TenantService) { }
  ngOnInit() {
    this.tenantService.listAll().then(tenants => {
      this.tenants = tenants;
    });
  }
  onSelectedTenant(event) {
    this.targetTenant = event;
  }
  onChangeFeatures(event) {
    this.features = event;
  }
  save() {
    const ok = confirm('저장하시겠습니까?');
    if (ok) {
      const features = _(this.features).filter(f => f.checked).map(f => f.id);
      this.tenantService.setFeatures(this.targetTenant.id, features).then(() => {
        alert('저장되었습니다.');
      });
    }
  }
}
