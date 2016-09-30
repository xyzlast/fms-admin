import {
  Component, OnInit, OnChanges, OnDestroy, SimpleChanges,
  DoCheck, AfterViewInit, AfterViewChecked,
  AfterContentInit, AfterContentChecked
} from '@angular/core';

import { TenantService } from '../shared/services';
import { Broadcaster } from '../shared/utils';
import {
  HostBinding,
  trigger, transition, animate,
  style, state
} from '@angular/core';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.css'],
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
        animate('0.2s ease-in')
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
export class TenantComponent implements OnInit, OnChanges, OnDestroy, DoCheck,
  AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked {
  tenants: any[];
  selectedTenant: any;
  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  @HostBinding('style.display') get display() {
    return 'block';
  }

  @HostBinding('style.position') get position() {
    return 'absolute';
  }
  constructor(private tenantService: TenantService,
    private broadcaster: Broadcaster) { }

  ngOnInit() {
    this.tenantService.listAll().then(tenants => {
      this.tenants = tenants;
      if (!this.selectedTenant) {
        this.selectedTenant = tenants[0];
      }
      this.selectedTenant.selected = true;
      this.onSelectedTenant(this.selectedTenant);
    });
    console.log('parent - ngOnInit');
  }

  onSelectedTenant(event) {
    this.selectedTenant = event;
    localStorage.setItem('selectedTenant', JSON.stringify(this.selectedTenant));
    this.broadcaster.broadcast('onSelectedTenant', this.selectedTenant);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('parent - ngOnChanges');
  }

  ngDoCheck() {
    console.log('parent - ngDoCheck');
  }
  ngAfterContentInit() {
    console.log('parent - ngAfterContentInit');
  }
  ngAfterContentChecked() {
    console.log('parent - ngAfterContentChecked');
  }
  ngAfterViewInit() {
    console.log('parent - ngAfterViewInit');
  }

  ngAfterViewChecked() {
    console.log('parent - ngAfterViewChecked');
  }

  ngOnDestroy() {
    console.log('parent - ngOnDestroy');
  }
}
