## You Don’t Know JS Yet: Scope & Closures


### Chapter 4: Around the Global Scope

***

  **Why Global Scope?** 

***

  **Where Exactly is this Global Scope?** 
  > It might seem obvious that the global scope is located in the outermost portion of a file; that is, not inside any function or other block.

- **Globals Shadowing Globals**
     - where one variable declaration can override and prevent access to a declaration of the same name from an outer scope.
     - An unusual consequence of the difference between a `global variable` and a `global property` of the same name is that, within just the global scope itself, a global object property can be **shadowed** by a global variable:
        ```ruby
            window.something = 42;

            let something = "Kyle";

            console.log(something);
            // Kyle

            console.log(window.something);
            // 42
        ```
    - The let declaration adds a *something* global variable but not a global object property.
    - The effect then is that the *something* lexical identifier shadows the *something* global object property. 
    > A simple way to avoid this gotcha with global declarations: 
      - **Always use var for globals.**
      - **Reserve let and const for block scopes.**

- **Web Workers**
    - Web Workers are a web platform extension on top of browser JS behavior, which allows a JS file to run in a completely separate thread (operating system wise) from the thread that’s running the main JS program.
    - In a Web Worker, the global object reference is typically made using **self**.
        ```ruby

            var studentName = "Kyle"; 

            let studentID = 42;

            function hello() {
             console.log(`Hello, ${ self.studentName }!`);
            }

            self.hello();
            // Hello, Kyle!

            self.studentID;
            // undefined
        ```
- **ES Modules (ESM)**
  
   - ES6 introduced first-class support for the module pattern. 
   - One of the most obvious impacts of using ESM is how it changes the behavior of the observably top-level scope in a file.
        ```ruby
            var studentName = "Kyle";

            function hello() {
                console.log(`Hello, ${ studentName }!`);
            } hello();

            // Hello, Kyle!

            export hello;
        ```
        >**studentName** and **hello** are not global variables. Instead, they are module-wide, or if you prefer, “module-global.”
        - Global variables don’t get created by declaring variables in the top-level scope of a module.
        - The module’s top-level scope is descended from the global scope, almost as if the entire contents of the module were *wrapped* in a function.
        - All variables that exist in the global scope are available as lexical identifiers from inside the module’s scope.

- **Node**
   - Node treats every single .js file that it loads, including the main one you start the Node process with, as a module (ES module or CommonJS module).
   - The top level of your Node programs is never actually the global scope.
   > Before processing, Node effectively wraps such code in a function, so that the var and function declarations are contained in that wrapping function’s scope, not treated as global variables.

   - **global** is a reference to the real global scope object, somewhat like using **window** in a browser JS environment.
    ```ruby
        global.studentName = "Kyle";

        function hello() {
            console.log(`Hello, ${ studentName }!`);
        } 

        hello();
        // Hello, Kyle!

        module.exports.hello = hello;
    ```
    - Here we add *studentName* as a property on the **global** object, and then in the console.log(..) statement we’re able to access *studentName* as a normal **global** variable.

  >the identifier **global** is not defined by JS; it’s specifically defined by Node.
***

  **Global This**

Reviewing the JS environments:
- Declare a global variable in the top-level scope with var or function declarations—or let, const, and class.
- Also add global variables declarations as properties of the global scope object if var or function are used for the declaration.
- Refer to the global scope object (for adding or retrieving global variables, as properties) with window, self, or global.

>window, self, global, and this new Function(..) trick. That’s a lot of different ways to try to get at this **global object**. 
```
const theGlobalScopeObject = (new Function("return this"))();
```
- ES2020, JS has finally defined a **standardized** reference to the global scope object, called **globalThis**. 
  
  - Different forms to get global scope (cross-environment polyfill):
  ```
  const theGlobalScopeObject =
    (typeof globalThis != "undefined") ? globalThis :
    (typeof global != "undefined") ? global :
    (typeof window != "undefined") ? window :
    (typeof self != "undefined") ? self :
    (new Function("return this"))();
  ```

_The End_



