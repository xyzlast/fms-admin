import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { TenantService, CodeService } from '../../shared/services';
import { CodeTypeIds } from '../../shared/constants';

@Component({
  selector: 'app-tenant-feature',
  templateUrl: './tenant-feature.component.html',
  styleUrls: ['./tenant-feature.component.css']
})
export class TenantFeatureComponent implements OnInit, OnChanges {
  features: any[];
  @Input()
  targetTenant: any;
  @Output()
  changeFeatures: EventEmitter<any> = new EventEmitter();

  unassignedFeatures: any[] = [];
  assignedFeatures: any[] = [];

  constructor(private tenantService: TenantService, private codeService: CodeService) { }

  ngOnInit() {
    this.codeService.getByTypeId(CodeTypeIds.FEATURES).then(features => {
      this.features = features;
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['targetTenant'] && changes['targetTenant'].currentValue) {
      const targetTenant = changes['targetTenant'].currentValue;
      this.fillFeatures(targetTenant);
    }
  }
  fillFeatures(tenant) {
    this.tenantService.getFeatures(tenant.id).then(features => {
      this.features.forEach(f => {
        f.checked = features.indexOf(f.id) >= 0;
      });
      this.changeFeatures.emit(this.features);
    });
  }
  toggleFeature() {
    this.changeFeatures.emit(this.features);
  }
}
