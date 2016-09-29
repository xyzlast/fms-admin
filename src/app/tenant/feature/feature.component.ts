import { Component, OnInit } from '@angular/core';
import { TenantService, CodeService } from '../../shared/services';
import { CodeTypeIds } from '../../shared/constants';
import { Broadcaster } from '../../shared/utils';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})
export class FeatureComponent implements OnInit {
  private features: any[];
  private targetTenant: any;

  constructor(private codeService: CodeService,
    private tenantService: TenantService,
    private broadcaster: Broadcaster) { }

  ngOnInit() {
    this.codeService.getByTypeId(CodeTypeIds.FEATURES).then(features => {
      this.features = features;
    });
    this.broadcaster.on<any>('onSelectedTenant').subscribe(tenant => {
      this.targetTenant = tenant;
      this.fillFeatures(tenant);
    });
  }
  fillFeatures(tenant) {
    this.tenantService.getFeatures(tenant.id).then(features => {
      this.features.forEach(f => {
        f.checked = features.indexOf(f.id) >= 0;
      });
    });
  }
  toggleFeature() {
    console.log('toggleFeature');
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
