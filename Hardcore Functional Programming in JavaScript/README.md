## Hardcore Functional Programming in JavaScript, v2
> Frontend Masters: Brian Lonsdorf

**Introduction**


- Function Programming is programming with functions.
- In JavaScript a function can be either first-order or higher-order.
> -The functions that use other functions as arguments or return functions are named **higher-order** functions.
> -The functions that use only primitives or objects as arguments, and only return primitives or objects are named **first-order** functions.
`We could think that a higher-order function accepts or returns callback functions.`
- The higher-order functions help reduce the code duplication and favor the single-responsibility principle.
- The built-in JavaScript function on arrays, strings, DOM methods, promise method — we could notice that many of them are higher-order functions as soon as they accept a function as an argument, Example:
```ruby
    // --------------------
    // the array.map(mapperFunc) method is a higher-order function
    // because it accepts a mapper function as an argument.
    // --------------------
    const numbers = [1, 2, 4];

    const doubles = numbers.map(function mapper(number) {
        return 2 * number;
    });

    doubles; // [2, 4, 8]

    // --------------------
    // element.addEventListener(type, handler) DOM method is also
    // a higher-order function since it accepts as the second argument
    // the event handler function.
    // --------------------

    document.getElementById('#myButton')
            .addEventListener('click', function handler() {
                console.log('The button was clicked!');
            });

```
**Functions**
- A function is a process which takes some input, called arguments, and produces some output called a return value.
   - Total: For every input there is a corresponding output.
   - Deterministic: Always receive the same output for a given input.
   - No Observable Side-Effects: No observable effects besides computing a value.
`JavaScript functions are similar to algebraic functions.`


    ```math
        f(x) = 2x 
    ```
    ```math
        f(3) = 2(3) = 6
    ```
    ```ruby
        const double = (x) => x * 2;

        double(3); // 6
    ```
- **Pure Functions**
  - Pure functions are predictable.
  - Always return the same result. 
  - Given the same input, always returns the same output.
  - Pure function does not produce any observable side effects such as network requests or data mutation etc.
  
  ```ruby
        Math.max(2, 8, 5); // 8
  ```
**Currying**
- **Properties**
   
  ```ruby
        // associative
        add(add(x, y), z) == add(x, add(y, z))
        
        // commutative
        add(x, y) == add(y, x)
        
        // identity
        add(x, 0) == x
        
        // distributive
        add(multiply(x, y), multiply(x, z)) == multiply(x, add(y,z))
  ```
- Example:
    ```ruby
    const add = (x, y) => x + y ;

    const toPair   = f => ([x, y]) => f(x, y);

    const fromPair = f => (x, y) => f([x, y]);

    const result = fromPair(toPair(add))(1, 2);

    console.log(result); // 3
    ```
- **curry:** es posible gracias al closure y es descomponer funciones en funciones mas pequeñas para que cada una reciba un argumento.
- It divides your function into multiple smaller functions that can handle one responsibility. 
- This makes your function pure and less prone to errors and side effects
  
    ```ruby
        const add = (x, y) => x + y ;

        const curry = f => x => y => f(x, y);

        const curryAdd = curry(add)(7)(3);
        console.log(curryAdd) //10

        //-----------------------
        // Noncurried
        function sumThreeNumbers(a, b, c){
            return a + b + c;
        }

         sumThreeNumbers(1, 2, 3); // 6

        // Curried
        function sumThreeNumbers(a){
            return function(b){
                return function(c){
                    return a + b + c;
                }
            }
        }

         sumThreeNumbers(1)(2)(3); // 6

         // ---------------------

         const sumThreeNumbers = a => b => c => a + b + c;
         const suma3num = sumThreeNumbers(1)(2)(3); 
         console.log(suma3num); // 6


    ```
    >  currying is when a function — instead of taking all arguments at one time — takes the first one and returns a new function, which takes the second one and returns a new function, which takes the third one, etc. until all arguments are completed.
  - Currying can be used to manipulate the DOM:
     ```ruby
            const updateElemText = id => content => document.querySelector(`#${id}`).textContent= content;
            const updateHeaderText = updateElemText('header');
            updateHeaderText('Hello Andres!');  
     ```  
  - Currying vs Partial Application:
    - Partial application: a function is partially applied when it is given fewer arguments than it expects and returns a new function expecting the remaining arguments.
     ```ruby
        const addPartial = (x,y,z) => {
            return x + y + z; 
        }

        var partialFunc= addPartial.bind(this,2,3);

        partialFunc(5); //returns 10
     ```
    > Currying and partial application are not really different; they are related, but they have different theories and applications.

***

**Composition**

***

**Functors**

***

**Either Monad**

***

**Task**

***

**Wrapping Up**

_The End_



