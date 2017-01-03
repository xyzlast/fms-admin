import { Component, OnInit, OnChanges, OnDestroy, SimpleChanges,
  DoCheck, AfterViewInit, AfterViewChecked,
  AfterContentInit, AfterContentChecked } from '@angular/core';

import {
  HostBinding,
  trigger, transition, animate,
  style, state } from '@angular/core';

import { renderString } from 'prettyjson';
import { TenantService } from '../../shared/services/tenant.service'
import { Broadcaster } from '../../shared/utils';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
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
export class UserComponent implements OnInit, OnChanges, OnDestroy, DoCheck,
  AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked {
  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  @HostBinding('style.display') get display() {
    return 'block';
  }

  @HostBinding('style.position') get position() {
    return 'absolute';
  }

  private targetTenant = null;
  private jsonData: string;
  private users: any[];
  private myModal;

  constructor(private tenantService: TenantService,
    private broadcaster: Broadcaster) {
    // console.log('constructor');
   }

  ngOnChanges(changes: SimpleChanges) {
    console.log('child - ngOnChanges');
  }

  ngOnInit() {
    console.log('child - ngOnInit');
    this.broadcaster.on<any>('onSelectedTenant').subscribe(tenant => {
      this.fillUsers(tenant);
    });
    const tenantJson = localStorage.getItem('selectedTenant');
    if (tenantJson) {
      const tenant = JSON.parse(tenantJson);
      this.fillUsers(tenant);
    }
  }

  fillUsers(tenant) {
    if (this.targetTenant && this.targetTenant.id === tenant.id) {
      return;
    }
    this.targetTenant = tenant;
    this.tenantService.getUsers(tenant.id).then(users => {
      this.users = users;
    });
  }

  showDialog() {
    console.log(this.myModal);
    this.myModal.open();
    // const backDrop = document.createElement('div');
    // backDrop.className = 'modal-backdrop fade in';
    // document.body.appendChild(backDrop);
  }

  ngDoCheck() {
    console.log('child - ngDoCheck');
  }
  ngAfterContentInit() {
    console.log('child - ngAfterContentInit');
  }
  ngAfterContentChecked() {
    console.log('child - ngAfterContentChecked');
  }
  ngAfterViewInit() {
    console.log('child - ngAfterViewInit');
  }

  ngAfterViewChecked() {
    console.log('child - ngAfterViewChecked');
  }

  ngOnDestroy() {
    console.log('child - ngOnDestroy');
  }
}
