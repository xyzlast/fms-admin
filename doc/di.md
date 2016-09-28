Dependency Injection은 angular, angular2의 핵심 기능입니다. 

이미 Server side 부분에서 자주 언급되고 있는 것으로, 특정 객체가 사용하는 객체군들을 만들어서 객체를 사용하는 쪽에서 골라 사용하는 개념이지요. 


`angularjs2`는 자체 Dependency Injection Framework를 가지고 있습니다. 모든 `Component`, `Service`, `Pipe`, `Delegate`는 Dependency Injection Framework를 통해 사용되어야지 됩니다.

# Root Dependency Injection Tree

`angularjs2` applicaiton은 한개 이상의 `NgModule`을 갖습니다. `bootstrap`에 연결된 이 `NgModule`에서 선언된 `providers` `import`의 경우에는 전체 Global Root Dependency Injection Tree에 등록되게 됩니다. 

`NgModule`에 등록된 `providers`와 `import`는 모든 `Component`에서 사용가능합니다. 각 `Component`에서 한정적으로만 사용될 `Service`나 `Pipe`, `Delegate`의 경우에는 각 `Component`별 `provider`에 등록해서 사용하면 됩니다.


# @Injectable

`@Injectable` annotation은 DI 대상을 지정합니다. `service`에서만 `@Injectable` annotation이 사용되게 됩니다. 다른 `@Component`, `@Pipe`, `@Directive` annotation 모두 `@Injectable`의 subset이기 때문에 따로 지정할 필요는 없습니다.

# Inject Provider

기본적으로 providers에는 그 객체가 지정됩니다. 다음 코드는 일반적인 providers code입니다.
```js
providers: [ Logger ]
``` 

이는 축약된 표현으로 원 표현은 다음과 같습니다.
```js
providers: [ { provide: Logger, useClass: Logger } ]
``` 

`Logger`라는 객체를 얻어낼려고 하면 `Logger`를 넘겨준다는 표현식이 됩니다. 이를 좀 응용하면 다른 일들을 할 수 있습니다. `Logger`로 지정해두고, `AnotherLogger`를 inject 시킬 수 있다는 뜻이 됩니다. 다음과 같이요.
```js
providers: [
  AnotherLogger, 
  { provide: Logger, useClass: AnotherLogger } 
]
```

위 표현식은 `Logger`와 `AnotherLogger` 2개의 instance가 생성되게 됩니다. 모든 `Logger`를 `AnotherLogger`로 바꾸어 사용하고 싶은 경우에는 다음과 같이 선언합니다.
```js
providers: [
  AnotherLogger, 
  { provide: Logger, useExisting: AnotherLogger } 
]
```

지정된 객체는 `singleton instance`로 동작하는 것이 기본값입니다. 사용될 때마다 새로운 객체를 얻어내기 위해서는 `Factory`를 생성해야지 됩니다. `Factory`는 `function` 형태로 다음과 같이 선언될 수 있습니다.

```ts
const anotherLoggerFactory = (logger: Logger) => {
  return new AnotherLogger(logger); 
}; 
```  

이렇게 선언된 `Factory`를 다음과 같이 providers에 등록하면 이제 `AnotherLogger`는 사용될 때마다 신규 객체를 생성해서 처리가 되게 됩니다.

```js
providers : [
  {
    provide: AnotherLogger,
    useFactory: anotherLoggerFactory,
    deps: [ Logger ]
  }
]
```

# Value Provider

직접적인 `값`을 제공하고 싶을 때 사용할 수 있습니다. applicaiton의 여러 설정들이나 상수값들을 지정할 때 사용 가능합니다.
다음과 같은 값을 전달할 때 사용할 수 있습니다.

```ts
const appConfig = {
  apiUrl: 'http://testserver:8080/api',
  userToken: 'jkfla;sjdifpqiowjerkjskadj;fla'
};
```

그런데, 이와 같은 값을 어떻게 하면 `provider`에 지정이 가능할지 의문이 듭니다. 위 `값`은 객체가 아닙니다. 객체가 아니기 때문에 `DI`에서 이용되는 `Class`가 무엇인지 알 수 없습니다. 그래서 `angular2`에서는 `OpaqueToken`이라는 것을 제공하고 있습니다.
`OpaqueToken`을 이용해서 다음과 같이 선언후, `@Inject`에서 `OpaqueToken`을 지정해주면 됩니다.

```ts
import { OpaqueToken } from '@angular/core';
export const APP_CONFIG = new OpaqueToken('app.config');

....

import { APP_CONFIG } from './config';

providers: [
  { provide: APP_CONFIG, useValue: appConfig }
]

....

constructor(@Inject(APP_CONFIG) config: any) {
  console.log(config.apiUrl);
 }
``` 

# Manual Injector

직접적으로 객체를 `DI` tree에서 가지고 와서 처리하고 싶을 때도 있을 수 있습니다. sping에서 `ApplicationContext`에서 바로 객체를 들고오고 싶을 그럴 때와 같이요.
이러한 경우에는 다음과 같이 처리하면 됩니다.

```ts
export class InjectorComponent {
  car: Car = this.injector.get(Car);
  heroService: HeroService = this.injector.get(HeroService);  
  hero: Hero = this.heroService.getHeroes()[0];
  constructor(private injector: Injector) { }
}
```

`Root Provider`에 이미 `Injector` 서비스가 등록이 되어 있습니다. 이 등록된 서비스를 가지고 와서 사용하면 됩니다.
개인적으로는 정말 추천하지 않는 방법이긴 합니다.;

# SUMMARY

angular2는 다양한 방법의 `DI`를 제공하고 있습니다. `Spring`이나 `Castle`, `Ninject`등을 사용해보신 분들이라면 매우 익숙하겠지만, 지금까지 FrontEnd만 해본 사람들에게는 복잡한 내용임은 사실입니다. 그렇지만, `DI`는 angular2에서 가장 중요한 기능중 하나입니다. 객체를 어떻게 다루고, 관리할지에 대한 pattern을 결정하는 설정이니까요. 개인적으로는 `OpaqueToken`이 매우 인상적인것 같습니다. 
