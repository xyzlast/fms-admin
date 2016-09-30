routing은 angularjs의 핵심모듈중 하나입니다. 우리가 개발하는 모든 web은 한개 이상의 page를 가지고, 그 page에 대한 주소, url을 갖게 되는데 그 url과 `@Component`에 대한 matching 을 담당하는 것이 바로 routering module이 하는 일이 됩니다.

# Router 설정

Router의 설정은 다음 단계를 거치게 됩니다. 

1. base href 설정
2. import router library
3. configure router

단계를 거치게 됩니다. 

## base href 설정

angular cli로 생성한 project의 `src` folder에 보면 `index.html`파일이 있습니다. 

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>FmsAdmin</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root>Loading...</app-root>
</body>
</html>
```

여기서 `<base href="/">`로 설정되어 있는 항목이 `base href`입니다. 이는 모든 url의 base를 지정합니다. 기본값은 `/`로 지정되어 있고, 이는 `http(s)://address/`에서 시작되는 것을 의미합니다. 만약에 `base href`에 값이 지정되어 있는 경우에는 다음과 같이 시작되겠지요. `http(s)://address/{bass href}`

## Router import

이제 Router Module을 Import 시켜야지 됩니다. `@angular/router`에 위치하고 있습니다.

```ts
import { RouterModule } from '@angular/router';
```
 
 ## Configure Router

 Router의 설정은 `Routes`로 설정이 됩니다. `Routes`는 `Route[]`를 재정의 한 것으로 `Route`는 다음과 같이 정의됩니다.

 ```ts
 export interface Route {
    path?: string;
    pathMatch?: string;
    component?: Type<any>;
    redirectTo?: string;
    outlet?: string;
    canActivate?: any[];
    canActivateChild?: any[];
    canDeactivate?: any[];
    canLoad?: any[];
    data?: Data;
    resolve?: ResolveData;
    children?: Route[];
    loadChildren?: LoadChildren;
}
 ````

여러 속성이 있지만, 주의해서 봐야지 될 속성은 다음과 같습니다. 

* path: url과 matching될 이름입니다. `patchMatch` 속성과 같이 사용되어 url과 maching됩니다. 
* pathMatch(`prefix`|`full`): `path`를 matching 시키는 방법입니다. 기본값은 `prefix`로 왼쪽부터 maching되는 것을 찾아보게 됩니다. 
> `/team/11/user`는 `team/:id`에 `prefix`로 지정되어 있을때 matching될 수 있습니다. 다만 `full`로 지정되는 경우 matching되지 않습니다.
* component: matching된 url에서 `route-outlet`에 표시될 `Component`를 지정합니다. 
* redirectTo: url과 matching되었을 때, redirect될 `path`를 지정합니다. 
* outlet: `Component`가 rendering될 `route-outlet`의 이름을 지정합니다. 이 부분은 아래 multi outlet에서 다시한번 언급하도록 하겠습니다.
* children: child route를 설정합니다.
> 'team'으로 지정된 route에 children이 지정된 경우, `team/childrenPath` 형식으로 url이 구성되게 됩니다.

예를 들어 아래 설정을 보겠습니다. 

```ts
export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'tenant', component: TenantComponent,
    children: [
      { path: '', redirectTo: 'feature', pathMatch: 'full' },
      { path: 'feature', component: FeatureComponent },
      { path: 'mongo', component: MongoComponent },
    ]
  }
];
``` 
위 설정에서 적용되는 url들은 다음과 같습니다. 

* `/` : `HomeComponent`
* `/` : `HomeComponent`
* `/tenant`: `TenantComponent` -> `FeatureComponent` (children, redirectTo)
* `/tenant/feataure`: `TenantComponent` -> `FeatureComponent` (children, redirectTo)
* `/tenant/mongo`: `TenantComponent` -> `MongoComponent` (children, redirectTo)

Url 설정은 매우 중요합니다. Google Search Engine의 경우, Url의 단어에 매우 높은 비중의 검색조건을 할당합니다. 그리고, `Restful`한 Url을 만들어주면 보기에도 좋고, 문서화도 쉬워집니다. 

이제 구성된 `Routes`를 이용해서 `app.module`에 Routing을 설정합니다. 설정은 다음과 같습니다.

```ts
imports: [
  RouterModule.forRoot(ROUTES)
]
```

여기서 이제 Url type을 어떤 방식으로 할지 고민을 해야지 됩니다. 기존 `angularjs1`에서는 `hash URL`이외에는 별다른 방법이 없었습니다. 
그런데, `hash URL`의 경우에는 단점이 있습니다. 서버사이드에서 `hash URL`부분을 받을 수 가 없습니다. `refer`부분이 `#`전 값만 넘어오기 때문입니다.

그렇지만, `angular2`에서 지원되는 거의 모든 `browser`들이 이제는 `history.pushState`를 지원하고 있기 때문에 기존 `hash URL`을 사용하지 않고, `web application`을 작성할 수 있게 되었습니다.
> history.pushState: https://developer.mozilla.org/en-US/docs/Web/API/History_API#Adding_and_modifying_history_entries

만약 `hash URL`을 사용하기 위해서는 `LocationStrategy` provider를 이용하면 됩니다. 

```ts
RouterModule.forRoot(ROUTES) //PushLocationStrategy
RouterModule.forRoot(ROUTES, { useHash: true }) //HashLocationStrategy
``` 

 
# Sub Path의 동작 (Children Routes)

`children`을 설정하게 되면, sub url로 `children`들이 동작하게 됩니다. 이때, 주의할 점이 먼저 `parent Component`가 우선적으로 실행된 후에 `children Component`가 실행된다는 것입니다. 어떻게 보면 당연한 이야기이지만, 매우 엄격한 순서를 가지고 있습니다. 
life-cycle의 각 단계를 보면 다음과 같습니다. 

```
parent - ngOnInit
parent - ngDoCheck
parent - ngAfterContentInit
parent - ngAfterContentChecked
parent - ngAfterViewInit
parent - ngAfterViewChecked
child - ngOnInit
child - ngDoCheck
child - ngAfterContentInit
child - ngAfterContentChecked
child - ngAfterViewInit
child - ngAfterViewChecked
```

`parent Component`의 모든 load가 마쳐지고 나서야 `child Component`가 동작하게 됩니다. 
이 부분은 매우 중요합니다. 기존 `angular1`에서는 child component의 `init` 시점이 거의 없다시피 했기 때문에 
