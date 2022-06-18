## You Don’t Know JS Yet: Scope & Closures

### Chapter 6:Limiting Scope Exposure 

***
  
  **Least Exposure**
  - POLP (The Principle of Least Privilege) expresses a defensive posture to software architecture: components of the system should be designed to function with least privilege, least access, least exposure.
  `If POLP focuses on system-level component design, the POLE Exposure variant focuses on a lower level.`
  - When variables used by one part of the program are exposed to another part of the program, via scope, there are three main hazards that often arise:
    - Naming Collisions
    - Unexpected Behavior
    - UnintendedDependency
  - POLE (Least Exposure), as applied to variable/function scoping, essentially says, default to exposing the bare minimum necessary, keeping everything else as private as possible. Declare variables in as small and deeply nested of scopes as possible, rather than placing everything in the global (or even outer function) scope.
  

***

  **Hiding in Plain (Function) Scope**
  - What about hiding var or function declarations in scopes? `That can easily be done by wrapping a function scope around a declaration.`

- **Invoking Function Expressions Immediately**
    ```ruby
    var factorial = (function hideTheCache() { 

            var cache = {};

            function factorial(x) { 
                if (x < 2) return 1;
                if (!(x in cache)) {
                          cache[x] = x * factorial(x - 1);
                      }
                      return cache[x]; 
            }
            return factorial; 
    })();

    factorial(6);
    // 720 

    factorial(7);
    // 5040
    ``` 
    - The function expression that’s then immediately invoked is a common pattern has a name: `Immediately Invoked Function Ex- pression (IIFE).`
    - An **IIFE** is useful when we want to create a scope to hide **variables/functions**. 
    - Since it’s an expression, it can be used in any place in a JS program where an expression is allowed.
    - Example of a standalone IIFE:
      ```ruby
        // outer scope

        (function(){
            // inner hidden scope
        })();

        // more outer scope
      ```
 - **Function Boundaries**
    > Beware that using an **IIFE** to define a scope can have some unintended consequences, depending on the code around it. Because an IIFE is a full function, the function boundary alters the behavior of certain statements/constructs.
    - If the code you need to wrap a scope around has **return**, **this**, **break**, or **continue** in it, an IIFE is probably not the best approach. In that case, you might look to create the scope with a block instead of a function.
***

  **Scoping with Blocks**

  - In general, any { .. } curly-brace pair which is a statement will act as a **block**, but not necessarily as a **scope**.
  > A **block** only becomes a **scope** if necessary, to contain its block-scoped declarations (let or const).
   ```ruby
        {
        // not necessarily a scope (yet)

        // ..

        // now we know the block needs to be a scope
        let thisIsNowAScope = true;

        for (let i = 0; i < 5; i++) {
          // this is also a scope, activated each
          // iteration

              if (i % 2 == 0) {
                  // this is just a block, not a scope 
                  console.log(i);
              } 
            }
         }
         // 0 2 4
   ```
- Not all { .. } curly-brace pairs create blocks (and thus are eligible to become scopes):
    - **Object** literals use { .. } curly-brace pairs to delimit their key-value lists, but such object values are not scopes. 
    - **class** uses { .. } curly-braces around its body defini- tion, but this is not a block or scope.
    - A **function** uses { .. } around its body, but this is not technically a block—it’s a single statement for the function body. It is, however, a (function) scope.
    - The { .. } curly-brace pair on a **switch** statement (around the set of case clauses) does not define a block/scope.
  >An explicit block of this sort — if it has no declarations, it’s not actually a scope —
- **var and let**
   - var attaches to the nearest enclosing function scope, no matter where it appears.Even though var is inside a block, its declaration is function-scoped, not block-scoped.
   - var should be reserved for use in the top-level scope of a function.
   - var better communicates function-scoped than let does.
   - let communicates block-scoping where var is insufficient.
  > var is not factually broken or deprecated; it has worked since early JS and it will continue to work as long as JS is around.

- **Where To let?**
   - reserve **var** for (mostly) only a top-level function scope means that most other declarations should use **let**.
   - If a declaration belongs in a block scope, use **let**. 
   - If it belongs in the function scope, use **var**.
> POLE already guides you on those decisions, but let’s make sure we explicitly state it. The way to decide is not based on which keyword you want to use. The way to decide is to ask, “What is the most minimal scope exposure that’s sufficient for this variable?”

- **What’s the Catch?**
  > var and parameters are function-scoped, and let/const signal block-scoped declarations.There’s one little exception to call out: **the catch clause.**
  - Since the introduction of try..catch back in ES3 (in 1999), the catch clause has used an additional block-scoping declaration capability.
  - ES2019 changed catch clauses so their declaration is optional; if the declaration is omitted, the catch block is no longer (by default) a scope; it’s still a block, though!
  ```ruby
      try { 
        doOptionOne();
      }
      catch { 
        // catch-declaration omitted
          doOptionTwoInstead();
      }
  ```

***

  **Function Declarations in Blocks (FiB)**

  ```ruby
      if (false) { 

        function ask() { //FiB
              console.log("Does this run?");
          }

      } 
      ask();
  ```
- One of the most common use cases for placing a function declaration in a block is to conditionally define a function one way or another (like with an if..else statement) depending on some environment state. 
>**FiB is not worth it, and should be avoided.**

_The end_

 
