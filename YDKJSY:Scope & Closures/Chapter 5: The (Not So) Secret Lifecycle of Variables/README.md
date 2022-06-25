## You Don’t Know JS Yet: Scope & Closures

### Chapter 5: The (Not So) Secret Lifecycle of Variables

***

  **When Can I Use a Variable?**

  - Every identifier is created at the beginning of the scope it belongs to, every time that scope is entered.
  - hoisting: Is the term most commonly used for a variable being visible from the beginning of its enclosing scope, even though its declaration may appear further down in the scope.

```ruby
    greeting();
    // Hello!

    function greeting() { 
        console.log("Hello!");
    }

    // why can we call the greeting() function before it’s been declared?
    // There is a special characteristic of formal function declarations, 
    // called function hoisting.
```
- Function declaration’s name identifier is registered at the top of its scope, it’s additionally auto-initialized to that function’s reference.
- For both function hoisting and var-flavored variable hoisting attach their name identifiers to the nearest enclosing function scope (or, if none, the global scope), not a block scope.

>Declarations with let and const still hoist by the TDZ.

- **Hoisting: Declaration vs. Expression**
  - Function hoisting only applies to formal **function declarations** (specifically those which appear outside of blocks “FiB”), not to **function expression** assignments.
  
    ```ruby
        greeting();
        // TypeError

        var greeting = function greeting() { 
            console.log("Hello!");
        };

        //Line 1 (greeting();) throws an error.
    ```
    > A TypeError means you’re trying to do something with a value that is not allowed.

    > Notice that the error is not a ReferenceError. JS isn’t telling us that it couldn’t find greeting as an **identifier** in the scope.

  - So on that first line, greeting exists, but it holds only the default undefined value. It’s not until line 4 that greeting gets assigned the function reference.
  - A **function declaration** is hoisted and initialized to its function value (again, called function hoisting).
  - A **var** variable is also hoisted, and then auto-initialized to undefined.
  - Any subsequent **function expression** assignments to that variable don’t happen until that assignment is processed during **runtime** execution.
  
- **Variable Hoisting**
  ```ruby
    greeting = "Hello!";
    console.log(greeting);
    // Hello!

    var greeting = "Howdy!";
    
    // greeting isn’t declared until line 5, 
    // it’s available to be assigned to as early as line 1.
    // Why? 
  ```
  > • the identifier is hoisted,
    • and it’s automatically initialized to the value undefined from the top of the scope.

***

  **Hoisting: Yet Another Metaphor**
  
  - Hoisting is a visualization of various *actions* JS takes in setting up the program **before execution**.
   ```ruby
        var greeting;          // hoisted declaration 
        greeting = "Hello!";   // the original line 1 
        console.log(greeting); // Hello!
        greeting = "Howdy!";   // `var` is gone!
   ```
  > The hoisting (metaphor) proposes that JS pre-processes the original program and re-arranges it a bit, so that all the declarations have been moved to the top of their respective scopes, **before execution**.

  - Function declarations are hoisted to the top of each scope.
    ```ruby
        studentName = "Suzy";
        greeting();
        // Hello Suzy!

        function greeting() {
            console.log(`Hello ${ studentName }!`);
        }
        var studentName;

        //--------------------------------------
        // the hoisting story suggests that program
        // is re-arranged by the JS engine to look like this:

        function greeting() {
            console.log(`Hello ${ studentName }!`);
        }
        var studentName;

        studentName = "Suzy";
        greeting();
        // Hello Suzy!

    ```
 > **The rule of the hoisting metaphor** is that function declarations are hoisted first, then variables are hoisted immediately after all the functions.

**Hoisting** should be used to refer to the compile-time operation of generating runtime instructions for the automatic registration of a variable at the beginning of its scope, each time that scope is entered.
`Hoisting is not a re-arrangement of the source code`

Hoisting es una operación en tiempo de compilación de generar instrucciones en tiempo de ejecución para el registro automatico de una variable en la parte superior de su ambito, cada vez que se entra en ese ambito.

***

  **Re-declaration?**

  - Re-declaration happens when a variable is declared more than once in the same scope:
    ```ruby
    var studentName = "Frank"; 
    console.log(studentName); // Frank

    var studentName; 
    console.log(studentName); // ???

    //------------------------------
    // If you consider above program from the perspective
    // of the hoisting metaphor, the code would be 
    // re-arranged like this for execution purposes:

    var studentName;
    var studentName; // clearly a pointless no-op!

    studentName = "Frank";
    console.log(studentName);
    // Frank

    console.log(studentName);
    // Frank

    ```
- Since hoisting is actually about registering a variable at the beginning of a scope, there’s nothing to be done in the middle of the scope where the original program actually had the sec- ond var studentName statement. It’s just a no-op(eration), a pointless statement.
- Repeating a declaration within a scope using **let** or **const**:
  ```ruby
  let studentName = "Frank"; 
  console.log(studentName); 
  let studentName = "Suzy";

    // throw a SyntaxError.

  //---------------------------
  var studentName = "Frank"; 
  let studentName = "Suzy"; 
  // and:
  let studentName = "Frank"; 
  var studentName = "Suzy";

    // throw a SyntaxError.

    // the error message will indicate something like: 
    // “studentName has already been declared.” 
    
  ```
  > this is a case where attempted “re-declaration” is explicitly **not allowed!**
- The only way to “re-declare” a variable is to use var for all (two or more) of its declarations.
- **Constants?**
   - The const keyword is more constrained than let. 
   - The const keyword requires a variable to be initialized, so omitting an assignment from the declaration results in a SyntaxError:
    ```ruby
     const empty; // SyntaxError
    ```
   - const declarations create variables that cannot be re-as-
    signed:
    ```ruby 
        const studentName = "Frank"; 
        console.log(studentName); 
        // Frank
        studentName = "Suzy"; // TypeError

        // The studentName variable cannot be re-assigned 
        // because it’s declared with a const.
    ``` 
> The error thrown when re-assigning studentName is a **TypeError**, not a **SyntaxError**.
> - **Syntax errors** represent faults in the program that stop it from even starting execution.
> - **Type errors** represent faults that arise during program execution.

- **Loops**
    ```ruby
        var keepGoing = true;

        while (keepGoing) {
        let value = Math.random();
         if (value > 0.5) {
                keepGoing = false; 
            }
        }

     // let re-declaration does not get errors thrown
    ```
    - All the rules of scope (including “re-declaration” of let- created variables) are applied per scope instance. In other words, each time a scope is entered during execution, everything resets.
***

  **Uninitialized Variables (aka, TDZ)**

  > With var declarations, the variable is “hoisted” to the top of its scope. But it’s also automatically initialized to the undefined value, so that the variable can be used throughout the entire scope.
  - let and const behavior is different:
    ```ruby
        console.log(studentName);        
        // ReferenceError

        let studentName = "Suzy";

        // the error message may say something like:
        // “Cannot access studentName before initialization.”
    ```
    >studentName exists on line 1, but it’s not been initialized, so it cannot be used yet. 
    - Compiler ends up removing any var/let/const declarators, replacing them with the instructions at the top of each scope to register the appropriate identifiers.
        >We cannot use the variable at any point prior to that initialization occuring. The same goes for const as it does for let.
    - The term coined by TC39 to refer to this period of time from the entering of a scope to where the auto-initialization of the variable occurs is: **Temporal Dead Zone (TDZ)**.
        >The TDZ is the time window where a variable exists but is still uninitialized, and therefore cannot be accessed in any way.
        > -TDZ does indeed refer to time not position in code.
- The actual difference is that **let/const** declarations do not automatically initialize at the beginning of the scope, the way **var** does.
- TDZ errors occur because let/const declarations do **hoist** their declarations to the top of their scopes, but unlike var, they defer the auto-initialization of their variables until the moment in the code’s sequencing where the original declaration appeared. 
>- Always put your let and const declarations at the top of any scope. 
 >- Shrink the TDZ window to zero (or near zero) length.
***

  **Finally Initialized**

  - Hoisting is generally cited as an explicit mechanism of the JS engine, but it’s really more a metaphor to describe the various ways JS handles variable declarations during compilation. But even as a metaphor, hoisting offers useful structure for thinking about the life-cycle of a variable—when it’s created, when it’s available to use, when it goes away.
  - Declaration and re-declaration of variables tend to cause confusion when thought of as runtime operations. But if you shift to compile-time thinking for these operations, the quirks and shadows diminish.
  - The TDZ (temporal dead zone) error is strange and frustrating when encountered. Fortunately, TDZ is relatively straightforward to avoid if you’re always careful to place let/const declarations at the top of any scope.

_The End_
