## RxJS
> Reactive Extensions Library for JavaScript
 ***

 - RxJS is a library for composing asynchronous and event-based programs by using observable sequences.

- ReactiveX combines the Observer pattern with the Iterator pattern and functional programming with collections to fill the need for an ideal way of managing sequences of events.

-  The essential concepts in RxJS which solve async event management are:

    - **Observable:** represents the idea of an invokable collection of future values or events.
    - **Observer:** is a collection of callbacks that knows how to listen to values delivered by the Observable.
    - **Subscription:** represents the execution of an Observable, is primarily useful for cancelling the execution.
    - **Operators:** are pure functions that enable a functional programming style of dealing with collections with operations like map, filter, concat, reduce, etc.
    - **Subject:** is equivalent to an EventEmitter, and the only way of multicasting a value or event to multiple Observers.
    - **Schedulers:** are centralized dispatchers to control concurrency, allowing us to coordinate when computation happens on e.g. setTimeout or requestAnimationFrame or others.

- **What is an Observer?** 
  - An Observer is a consumer of values delivered by an Observable. Observers are simply a set of callbacks, one for each type of notification delivered by the Observable: next, error, and complete.
  
- **What are operators?** 
  - Operators are functions. There are two kinds of operators:
    - **Pipeable Operators** are the kind that can be piped to Observables using the syntax observableInstance.pipe(operator()). These include, filter(...), and mergeMap(...). 
    - **Creation Operators** are the other kind of operator, which can be called as standalone functions to create a new Observable. For example: of(1, 2, 3) creates an observable that will emit 1, 2, and 3, one right after another.

- Use the **pipe()** function to make new operators
- If there is a commonly used sequence of operators in your code, use the pipe() function to extract the sequence into a new operator. Even if a sequence is not that common, breaking it out into a single operator can improve readability.


- **Categories of operators**
    - There are operators for different purposes, and they may be categorized as: creation, transformation, filtering, joining, multicasting, error handling, utility, etc.

- Creation Operators
    - ajax
    - bindCallback
    - bindNodeCallback
    - defer
    - empty
    - from
    - fromEvent
    - fromEventPattern
    - generate
    - interval
    - of
    - range
    - throwError
    - timer
    - iif

- Transformation Operators
    - buffer
    - bufferCount
    - bufferTime
    - bufferToggle
    - bufferWhen
    - concatMap
    - concatMapTo
    - exhaust
    - exhaustMap
    - expand
    - groupBy
    - map
    - mapTo
    - mergeMap
    - mergeMapTo
    - mergeScan
    - pairwise
    - partition
    - pluck
    - scan
    - switchScan
    - switchMap
    - switchMapTo
    - window
    - windowCount
    - windowTime
    - windowToggle
    - windowWhen

- Utility Operators
    - tap
    - delay
    - delayWhen
    - dematerialize
    - materialize
    - observeOn
    - subscribeOn
    - timeInterval
    - timestamp
    - timeout
    - timeoutWith
    - toArray