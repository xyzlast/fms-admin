# Component DataBinding

angular2는 angular1과 다르게 한개의 Page가 여러개의 Component로 이루어집니다. 그리고 그 Component간의 데이터 전달은 Input/Output을 통해서 이루어집니다. 
예전 `ng-model`이 이제 단방향으로 나뉘어져있다고 생각하면 쉽습니다. (ngModel과 같이 양방향 역시 존재합니다.)

기존 angular1에서의 directive에 데이터를 넣을때를 생각해보시면 쉽습니다. directive를 하나 선언하게 되면 그에 대한 scope의 범위를 다음과 같이 선언하게 됩니다.

```js
scope: {
  ngModel: '='
}
```

위와 같이 선언된 `ngModel`은 html상에서 다음과 같이 사용되어질 수 있습니다. 

```html
<app-directive ng-model="models.data"></app-directive>
```

angular2에서는 Input과 Output을 명확하게 구분합니다. 이 부분이 어찌보면 angular1과 angular2간의 가장 큰 차이라고도 볼 수 있습니다. 

기존 양방향 binding의 경우 performance의 문제가 발생했었고, 이는 angular1에서의 성능향상의 가장 큰 걸림돌이 되었던 `dirty-watch`의 문제점이기도 했습니다.
이 부분은 `react`에서도 적용되어 있는것으로, `javascript`에서의 `refrence` type의 참조가 아닌, `value`로서 참조를 하게 됩니다. 이 부분은 매우 중요합니다. 
결국 angular1에서의 양방향 `reference binding`의 문제로 binding된 model은 2개의 copy 본이 만들어지고 `dirty-watch` 과정을 통해 copy본과의 차이점을 알아내고 그 값을 다시 view에 binding하는 과정에서 angular1은 많은 시스템 자원을 소비하고 있었지만, angular2의 경우에는 이 과정이 없어지는거지요. binding자체가 값으로 set되는것이고, 그 set된 값은 변경되기 전에는 `rendering`과정을 거치지 않게 됩니다.

서론이 길었습니다. 이제 angular2에서의 DataBinding을 알아보도록 하겠습니다.

## Data Binding의 종류

* interpolation : `{{}}`로 표현되는 binding입니다. 값을 화면에 표시하는 용도로 사용됩니다. 
* property binding: `[]`로 표현되는 binding입니다. `Component`의 property값을 `set`할때 사용됩니다.
* event binding: `()`로 표현됩니다. `Component`에서 발생되는 event를 `get`할때 사용됩니다. 
* two-way data binding: `[()]`로 표현됩니다. `Component`에서 값을 `get`, `set`을 할 수 있습니다. 이는 `ngModel` directive를 이용해서만 사용 가능합니다.

먼저 간단한 2개의 Component를 통해, `interpolation`, `property binding`, `event binding`을 알아보도록 하겠습니다.

```ts
import { Component, OnInit } from '@angular/core';
import { TenantService } from '../shared/services';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})
export class FeatureComponent implements OnInit {
  tenantList: any[];
  constructor(private tenantService: TenantService) { }
  ngOnInit() {
    this.tenantService.listAll().then(tenants => {
      this.tenantList = tenants;
    });
  }
  selectedTenant(event) {
    console.log(event);
  }
}
``` 

```ts
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
  select = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  selectTenant(tenantId: number) {
    const selectedTenant = _(this.tenants).find(tenant => tenant.id === tenantId);
    this.select.emit(selectedTenant);
  };
}
```

`FeatureComponent`와 `TenantListComponent`가 있습니다. `FeatureComponent`안에서 `TenantListComponent`가 Table로 구현되는 아주 간단한 구조입니다.

이에 따른 html은 각각 다음과 같습니다.

```html
// feature.component.html
<app-tenant-list [tenants]="tenantList" (select)="selectedTenant($event)"></app-tenant-list>
``` 

```html
// tenant-list.component.html
<table class="table table-hover">
  <thead>
    <th>Id</th>
    <th>Name</th>
  </thead>
  <tbody>
    <tr *ngFor="let tenant of tenants" (click)="selectTenant(tenant.id)">
      <td>{{tenant.id}}</td>
      <td>{{tenant.defaultInfo.name}}</td>
    </tr>
  </tbody>
</table>
```

먼저 `feature.component.html`에서는 `property binding`과 `event binding`이 보여집니다. `TenantListComponent`에서 정의된 Property인 `tenants`가 `[tenants]="tenantList"`로 `set`을 하고 있는 것을 보실 수 있습니다.

`event binding`의 경우에는 다양합니다. 우리가 주로 알고 있는 web에서의 click과 같은 event들이 event binding으로 처리됩니다. 이는 `tenant-list.component.html`을 보면 확인이 가능합니다.

```html
<tr *ngFor="let tenant of tenants" (click)="selectTenant(tenant.id)">
```

`click` event가 발생하게 되면 `selectTenant` method가 호출이 되게 됩니다. `selectTenant` method는 안에서 `EventEmitter` 객체를 통해 이벤트를 발생시킵니다. `Component`에서 외부로 노출되는 값은 모두 Event가 되게됩니다.

 
