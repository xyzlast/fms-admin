import { Component, OnInit } from '@angular/core';
import { TenantService, CodeService } from '../../shared/services';
import { CodeTypeIds } from '../../shared/constants';
import { Broadcaster } from '../../shared/utils';
import {
  HostBinding,
  trigger, transition, animate,
  style, state
} from '@angular/core';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css'],
  animations: [
    trigger('routeAnimation', [
      state('*',
        style({
          opacity: 1,
          transform: 'translateX(0)'
        })
      ),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(200%)'
        }),
        animate('0.3s ease-in')
      ]),
      transition('* => void', [
        animate('0.5s ease-out', style({
          opacity: 0,
          transform: 'translateY(100%)'
        }))
      ])
    ])
  ]
})
export class FeatureComponent implements OnInit {
  private features: any[];
  private targetTenant: any;

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  @HostBinding('style.display') get display() {
    return 'block';
  }

  constructor(private codeService: CodeService,
    private tenantService: TenantService,
    private broadcaster: Broadcaster) { }

  ngOnInit() {
    this.codeService.getByTypeId(CodeTypeIds.FEATURES).then(features => {
      this.features = features;
    });
    this.broadcaster.on<any>('onSelectedTenant').subscribe(tenant => {
      this.fillFeatures(tenant);
    });
    const tenantJson = localStorage.getItem('selectedTenant');
    if (tenantJson) {
      const tenant = JSON.parse(tenantJson);
      this.fillFeatures(tenant);
    }
  }
  fillFeatures(tenant) {
    if (this.targetTenant && this.targetTenant.id === tenant.id) {
      return;
    }
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
