## You Don’t Know JS Yet: Scope & Closures


### Chapter 3:The Scope Chain

The connections between scopes that are nested within other scopes is called the scope chain, which determines the path along which variables can be accessed. The chain is directed, meaning the lookup moves upward/outward only.

***

**“Lookup” Is (Mostly) Conceptual**

- The runtime access of a variable as a “lookup,” where the Engine has to start by asking the current scope’s Scope Manager if it knows about an identifier/variable, and proceeding upward/outward back through the chain of nested scopes (toward the global scope) until found.
- The lookup stops as soon as the first matching named declaration in a scope bucket is found.
- This *suggestion* of a runtime lookup process works well for conceptual understanding, but it’s not actually how things usually work in practice.
- Engine doesn’t need to lookup through a bunch of scopes to figure out which scope bucket a variable comes from. That information is already known! Avoiding the need for a runtime lookup is a key optimization benefit of lexical scope. The runtime operates more performantly without spending time on all these lookups.
>If no declaration is found, that’s not necessarily an error. Another file (program) in the runtime may indeed declare that variable in the shared global scope.

>The “Lookup Failures” covers what happens if a marble is ultimately still uncolored at the moment its reference is runtime executed.

***

**Shadowing**
 
 - If you need to maintain two or more variables of the same name, you must use separate (often nested) scopes. And in that case, it’s very relevant how the different scope buckets are laid out.
    ```ruby
        var studentName = "Suzy";
        function printStudent(studentName) { 
            studentName = studentName.toUpperCase(); 
            console.log(studentName);
        }
        printStudent("Frank");
        // FRANK
        printStudent(studentName);
        // SUZY
        console.log(studentName);
        // Suzy
     ```
     >Any studentName identifier reference will correspond to that parameter variable, never the global studentName variable. It’s lexically impossible to reference the global studentName anywhere inside of the printStudent(..) function (or from any nested scopes).

- **Global Unshadowing Trick**
  
   - It is possible to access a global variable from a scope where that variable has been shadowed, but not through a typical lexical identifier reference.
    ```
        var studentName = "Suzy";

        function printStudent(studentName) { 
            console.log(studentName); 
            console.log(window.studentName);
        }

        printStudent("Frank");

        // "Frank"
        // "Suzy"
    ```
    > The window.studentName is a mirror of the global studentName variable, not a separate snapshot copy.
    
    - This little “trick” only works for accessing a global scope variable (not a shadowed variable from a nested scope), and even then, only one that was declared with var or function.
    - Other forms of global scope declarations do not create mirrored global object properties:
     ```ruby
        var one = 1;
        let notOne = 2; 
        const notTwo = 3; 
        class notThree {}

        console.log(window.one);        // 1
        console.log(window.notOne);     // undefined
        console.log(window.notTwo);     // undefined
        console.log(window.notThree);   // undefined
     ```
     this is another example:
     ```ruby

        var special = 42;

        function lookingFor(special) {
        // The identifier `special` (parameter) in this 
        // scope is shadowed inside keepLooking(), and 
        // is thus inaccessible from that scope.

        function keepLooking() {
            var special = 3.141592; 
            console.log(special); 
            console.log(window.special);
         }
        
        keepLooking();
        
        }

        lookingFor(112358132134);
        // 3.141592
        // 42
     ```

- **Copying Is Not Accessing**
   - Les't check this snnipet:

    ```ruby

        var special = 42;

        function lookingFor(special) { 
            var another = {
                special: special
            };

        function keepLooking() {
            var special = 3.141592;
            console.log(special); 
            console.log(another.special); // Ooo, tricky! 
            console.log(window.special);
        }

        keepLooking();

        }

        lookingFor(112358132134);
        // 3.141592
        // 112358132134
        // 42
    ```
    > { special: special } is copying the value of the special parameter variable into another container (a property of the same name).

    > if you put a value in another container, **shadowing** no longer applies (unless another was shadowed, too!).


- **Illegal Shadowing**
 
   - Not all combinations of declaration shadowing are allowed. `let can shadow var, but var cannot shadow let`: 
     ```ruby

        function something() {

        var special = "JavaScript";

        {
            let special = 42; 
            // totally fine shadowing
            // ..
        } 
        }
     ```
     ```ruby
        function another() {
             // ..
            {
                let special = "JavaScript";
                    {
                        var special = "JavaScript"; 
                        // ^^^ Syntax Error
                        // ..
                    } 
            }
        }
     ```
    > The real reason it’s raised as a SyntaxError is because the var is basically trying to “cross the boundary” of (or hop over) the let declaration of the same name, which is not allowed.
    ```ruby
        function another() {
             // ..
            {

            let special = "JavaScript";

            ajax("https://some.url",function callback(){ 
                    // totally fine shadowing
                    var special = "JavaScript";
                    // ..
                });
            }
        }
    ```
    > - let (in an inner scope) can always shadow an outer scope’s var.
    > - var (in an inner scope) can only shadow an outer scope’s let if there is a function boundary in between.

***

**Function Name Scope**

- Function Declaration:
    ```ruby
        function askQuestion() { 
            // ..
        }
     ```   
    > *function declaration* will create an identifier in the enclosing scope (in this case, the global scope) named askQuestion.     
- Function Expression:
    ```ruby
        var askQuestion = function(){ 
            // ..
        };
    ```
    > *function expression* is a function definition used as value instead of a standalone declaration

    - The function itself will not “hoist”
    - One major difference between function declarations and function expressions is what happens to the name identifier of the function.
  

- Named Function Expression: 
  
    ```ruby
        var askQuestion = function ofTheTeacher(){ 
            // ..
        };

        // ----------------------

        var askQuestion = function ofTheTeacher() { 
            console.log(ofTheTeacher);
        };

        askQuestion();
        // function ofTheTeacher()...

        console.log(ofTheTeacher);
        // ReferenceError: ofTheTeacher is not defined
    ```
    - askQuestion ends up in the outer scope.
    - ofTheTeacher is declared as an identifier inside the function itself (“Implied Scopes”).
  
  > Anonymous function expressions clearly have no name identifier that affects either scope.
    ```
    var askQuestion = function(){ 
                // ..
            };
    ```


***

**Arrow Functions**

- ES6 added an additional function expression form to the language, called “arrow functions”
  ```ruby
   var askQuestion = () => { 
       // ..
   };
  ```
 - The => arrow function doesn’t require the word *function* to define it. 
 - Arrow functions are lexically anonymous, meaning they have no directly related identifier that references the function.
    ```
        () => 42;
        id => id.toUpperCase();
        (id,name) => ({ id, name });
        (...args) => {
        return args[args.length - 1];
        };
    ```
  - Arrow functions have the same lexical scope rules as unction functions do. - Arrow function, with or without { .. } around its body, still creates a separate, inner nested bucket of scope.
  - Variable declarations inside this nested scope bucket behave the same as in a function scope.

***

**Backing Out**
- When a function (declaration or expression) is defined, a new scope is created. The positioning of scopes nested inside one another creates a natural scope hierarchy throughout the program, called the scope chain. The scope chain controls variable access, directionally oriented upward and outward.

- Each new scope offers a clean slate, a space to hold its own set of variables. When a variable name is repeated at different levels of the scope chain, shadowing occurs, which prevents access to the outer variable from that point inward.

_The End_
