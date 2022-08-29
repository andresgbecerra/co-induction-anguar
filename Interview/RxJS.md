## RxJS
> Reactive Extensions Library for JavaScript
 ***

 - RxJS is a library for composing asynchronous and event-based programs by using observable sequences.
 - The RxJS library also provides utility functions for creating and working with observables.
    - Converting existing code for async operations into observables
    - Iterating through the values in a stream
    - Mapping values to different types
    - Filtering streams
    - Composing multiple streams

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
  
- Join Creation Operators
  - These are Observable creation operators that also have join functionality -- emitting values of multiple source Observables.
    - **combineLatest:** Combines multiple Observables to create an Observable whose values are calculated from the latest values of each of its input Observables.
    - concat
    - forkJoin
    - merge
    - partition
    - race
    - zip

- Transformation Operators
    - buffer
    - bufferCount
    - bufferTime
    - bufferToggle
    - bufferWhen
    - **concatMap:** merges each internal subscription sequentially, that is, it does not emit values of the next observable until the previous one is completed.
    - concatMapTo
    - exhaust
    - **exhaustMap:** omits merging new internal subscriptions while returning values, merges a new subscription only if the previous observable has been completed.
    - expand
    - groupBy
    - **map:** it passes each source value through a transformation function to get corresponding output values.
        ```js
        import { fromEvent, map } from 'rxjs';

        const clicks = fromEvent<PointerEvent>(document, 'click');
        const positions = clicks.pipe(map(ev => ev.clientX));

        positions.subscribe(x => console.log(x));
        ```
    - **mapTo**: Transforms the input data into a specific output value.
        ```js
        import { fromEvent, mapTo } from 'rxjs';

        const clicks = fromEvent(document, 'click');
        const greetings = clicks.pipe(mapTo('Hi'));

        greetings.subscribe(x => console.log(x));
        ```
    - **mergeMap:** Merge all internal subscriptions or functions into the observable output.
        ```js
            import { of, mergeMap, interval, map } from 'rxjs';

            const letters = of('a', 'b', 'c');
            const result = letters.pipe(
            mergeMap(x => interval(1000).pipe(map(i => x + i)))
            );

            result.subscribe(x => console.log(x));

            // Results in the following:
            // a0
            // b0
            // c0
            // a1
            // b1
            // c1
            // continues to list a, b, c every second with respective ascending integers
        ```
    - **mergeMapTo:** Projects each source value to the same Observable which is merged multiple times in the output Observable. `Deprecate`
    - **mergeScan:** Applies an accumulator function over the source Observable where the accumulator function itself returns an Observable, then each intermediate Observable returned is merged into the output Observable.`It's like scan, but the Observables returned by the accumulator are merged into the outer Observable.`
    - pairwise
    - partition
    - **pluck:** is used to extract values from a specific property in a data stream.
    - **scan:** Useful for encapsulating and managing state. Applies an accumulator (or "reducer function") to each value from the source after an initial state is established -- either via a seed value (second argument), or from the first value from the source.
      ```js
       import { of, scan, map } from 'rxjs';

        const numbers$ = of(1, 2, 3);

        numbers$
        .pipe(
            // Get the sum of the numbers coming in.
            scan((total, n) => total + n),
            // Get the average by dividing the sum by the total number
            // received so var (which is 1 more than the zero-based index).
            map((sum, index) => sum / (index + 1))
        )
        .subscribe(console.log);

        // 1
        // 1.5
        // 2

      ```
    - switchScan
    - **switchMap:** maintains only one internal and active subscription, this means that it returns values only from the active observable, and when it receives a new internal subscription it will emit values when the previous one has been completed. 
      ```js
      import { of, switchMap } from 'rxjs';

        const switched = of(1, 2, 3).pipe(switchMap(x => of(x, x * 2)));
        switched.subscribe(x => console.log(x));
        // outputs
        // 1
        // 2
        // 2
        // 4
        // 3
        // 6
      ```
    - switchMapTo
    - window
    - windowCount
    - windowTime
    - windowToggle
    - windowWhen

- Utility Operators
    - **tap:** Using tap to analyze a value and force an error. Used to perform side-effects for notifications from the source observable
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

- Mathematical and Aggregate Operators
    - count
    - max
    - min
    - **reduce:** is used to apply an accumulator function to the emissions of the observable and returns the total value of the accumulator.