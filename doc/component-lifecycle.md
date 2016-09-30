angularjs에서 `Component`와 `directive`는 lifecycle을 갖습니다. `@Inject`되는 `service`, `pipe`와는 다르게 DI pattern이 `Factory`이기 때문입니다.

# lifecycle 

`Component`는 다음과 같은 lifecycle을 갖습니다.

1. constructor
2. ngOnChanges
3. ngOnInit
4. ngDoCheck
5. ngAfterContentInit
6. ngAfterContentChcked
7. ngAfterViewInit
8. ngAfterViewChecked
9. ngDestroy

## constructor

생성자입니다. `DI`를 통해 의존성이 주입되는 곳이기도 합니다. 의존성이 주입되더라도 복잡한 Fetch logic을 넣지 않는것을 권장합니다. 다음은 `constructor`에 대해서 잘못된 로직을 넣고 있다는 징조입니다. 

1. `new` 키워드가 사용되고 있을 때.
2. `static` method가 호출되고 있을때.
3. property 값 할당 이외의 작업이 있을때.
4. `constructor`가 마쳐진 이후에도 초기화가 되지 않을 때.
5. `Control Flow` (if, case) 가 사용되고 있을 때.

그 이유는 다음과 같습니다. 

1. 테스트가 어려워집니다. 생성자에서의 로직은 테스트에서 `before`정도에서만 체크가 가능해집니다. 만약에 복잡한 생성로직을 갖는다면 그 객체는 `Factory`를 통해서 생성되는 것이 좋습니다.
2. `subclassing`이 힘들어집니다.

## ngOnChanges

`@Input`으로 지정된 `property`에 대한 set과 `property`값을 초기화 할때, 발생되는 `event`입니다. 첫값(`null`)이 설정될 때 역시 발생하기 때문에 `ngOnInit`보다 먼저 발생되게 되는 것이 일반적입니다.
 `property` 초기 set이 있는 경우에만 `ngOnInt`보다 먼저 호출됩니다. 

## ngOnInit

객체 초기화. 즉 값의 설정이 모두 마쳐진 상황입니다. property 값의 초기값 역시 설정이 모두 마쳐진 상황이기 때문에 이제 값을 보여줄 준비가 마쳐진 상황입니다. `constructor`의 복잡도를 높일 수 있는 초기화 코드들이 위치하는 곳이기도 합니다.

## ngDoCheck

`ngOnChanges`와 `ngOnInt`가 호출될 때마다 즉시 호출되는 이벤트입니다. 

## ngAfterContentInit

`Component`의 view에 외부 content의 로드가 모두 마쳐진 이후에 발생되는 이벤트입니다. 로드시에 단 **단 한번만 호출이 됩니다.** 

## ngAfterContentChcked

`ngAftercontentInit` 호출 후, 그리고 `ngDoCheck` 호출 된 후에 발생됩니다. 이는 `@Input` 값이 변경되어서 view content가 변경되고 나서도 호출되는 것을 의미합니다.

## ngAfterViewInit

 'Component'의 View의 초기화 및 `child Component`의 View초기화 모두가 마쳐진 이후에 발생되는 이벤트입니다.

 ## ngAfterViewChecked

 `ngAfterViewInit`가 호출 후, 그리고 'ngAfterContentChecked`가 호출 된 후 발생됩니다. 이는 `child Component`의 View Rendering까지 모두 마쳐진 이후에 발생되게 되는 이벤트입니다.

 ## ngDestroy

  더 이상 사용되지 않는 `Component`를 삭제할 때 사용됩니다.  `@jquery.destroy` 함수와 같이 생각하면 쉽습니다.


# Summary

`Componenet`의 lifecycle은 중요한 문제입니다. 특히 외부 module에 의한 component가 들어왔을때, 그에 대한 memory release와 같이 처리해줘야지 되는 일들은 상당히 많습니다. 
또한 `OnChanges`와 같이 외부에서 `@Input property`값을 변경할 때 역시 마찬가지가 되겠지요.
