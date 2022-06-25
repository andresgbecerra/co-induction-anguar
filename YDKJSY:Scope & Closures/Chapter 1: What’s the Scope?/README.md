
## You Don’t Know JS Yet: Scope & Closures


### Chapter 1: What’s the Scope?


***

**About This Book**
- JS is in fact parsed/compiled in a separate phase before execution begins.
- The code author’s decisions on where to place variables, functions, and blocks with respect to each other are analyzed according to the rules of scope, during the initial parsing/compilation phase.
- The resulting scope structure is generally unaffected by runtime conditions.
  
>JS **functions** are themselves first-class values; they can be assigned and passed around just like numbers or strings. But since these functions hold and access variables, they maintain their original scope no matter where in the program the functions are eventually executed. This is called closure.

>**Modules** are a code organization pattern characterized by public methods that have privileged access (via closure) to hidden variables and functions in the internal scope of the module.

***

**Compiled vs. Interpreted**

- **Code compilation** is a set of steps that process the text of your code and turn it into a list of instructions the computer can understand.
  > The whole source code is transformed at once, and those resulting instructions are saved as output (usually in a file) that can later be executed.
- **Interpretation** performs a similar task to compilation, in that it transforms your program into machine-understandable instructions. `But the processing model is different.`

Unlike a program being **compiled** all at once, with **interpretation** the source code is transformed line by line; each line or statement is executed before immediately proceeding to processing the next line of the source code.

> JS is most accurately portrayed as a **compiled** language.

***

**Compiling Code**

- **Scope** is primarily determined during compilation.
- In classic compiler theory, a program is processed by a **compiler** in three basic stages:
    1. **Tokenizing/Lexing:** breaking up a string of characters into meaningful (to the language) chunks, called tokens.
        ```
        var a = 2;
        tokens: var, a, =, 2, and ;
        ```
        `- Whitespace may or may not be persisted as a token.`
        `- Tokens are identified in a stateless or stateful way.`

    2. **Parsing:** taking a stream (array) of **tokens** and turning it into a tree of nested elements, which collectively represent the grammatical structure of the program. `This is called an Abstract Syntax Tree (AST).`
    3. **Code Generation:** taking an **AST** and turning it into executable code. This part varies greatly depending on the language, the platform it’s targeting, and other factors.
>In the process of **parsing** and **code generation**, there are steps to optimize the performance of the execution (i.e., collapsing redundant elements).

>JS engines use all kinds of tricks (like JITs, which lazy compile and even hot recompile);


- **Required: Two Phases**
>Processing JS program occurs in parsing/compilation before execution.
- The separation of a parsing/compilation phase from the subsequent execution phase is observable fact, not theory or opinion. 
    1. **Syntax errors:**
        ```
            var greeting = "Hello"; console.log(greeting);
            greeting = ."Hi";
            // SyntaxError: unexpected token .
        ```
        the only way the JS engine could know about the syntax error on the third line, before executing the first and second lines, is by the JS engine first *parsing* the entire program before any of it is *executed*.
    2. **Early errors:**
        ```
            console.log("Howdy");

            saySomething("Hello","Hi");

            // Uncaught SyntaxError: Duplicate parameter name not
            // allowed in this context

            function saySomething(greeting,greeting) { 
                "use strict";
                console.log(greeting);
            }
        ```
        How does the JS engine know that the greeting pa- rameter has been duplicated? How does it know that the saySomething(..) function is even in strict-mode while processing the parameter list (the "use strict" pragma appears only later, in the function body)?
        > Again, the only reasonable explanation is that the code must first be fully **parsed** before any **execution** occurs.
    3. **Hoisting**
        ```
            function saySomething() { 
                var greeting = "Hello"; 
                {
                    greeting = "Howdy"; // error comes from here 
                    let greeting = "Hi";
                    console.log(greeting);
                } 
             }

            saySomething();

            // ReferenceError: Cannot access 'greeting' before
            // initialization
        ```
        The only way the JS engine could know, at the line where the error is thrown, that the next statement would declare a block-scoped variable of the same name (greeting) is if the JS engine had already processed this code in an earlier pass, and already set up all the scopes and their variable associations. This processing of scopes and declarations can only accurately be accomplished by parsing the program before execution.

>Classifying JS as a compiled language is not concerned with the distribution model for its binary (or byte-code) executable representations, but rather in keeping a clear distinction in our minds about the phase where JS code is processed and analyzed; this phase observably and indisputedly happens before the code starts to be executed.

***

**Compiler Speak**

- How the JS engine identifies variables and determines the scopes of a program as it is compiled.

    ```ruby
        var students = [
            { id: 14, name: "Kyle" },
            { id: 73, name: "Suzy" }, 
            { id: 112, name: "Frank" }, 
            { id: 6, name: "Sarah" }
        ];
        function getStudentName(studentID) { 
            for (let student of students) {
                if (student.id == studentID) { 
                    return student.name;
                } 
            }
        }

        var nextStudent = getStudentName(73); 

        console.log(nextStudent);
        // Suzy
    ```
>How do you know if a variable is a target? Check if there is a value that is being assigned to it; if so, it’s a **target**. If not, then the variable is a **source**.
 - **Targets:**
    - What makes a variable a target?
      ```
        students = [ // ..
        nextStudent = getStudentName(73);
      //- This statement is clearly an assignment operation; remember, the var students part is handled entirely as a declaration at compile time, and is thus irrelevant during execution.

        for (let student of students) {
      //- That statement assigns a value to student for each iteration of the loop.
        
        getStudentName(73)
      // - the argument 73 is assigned to the parameter studentID.(an assigment to a target)  

        function getStudentName(studentID) {
      //- A function declaration is a special case of a target reference.

      ```
    

 - **Sources:**
  - In `for (let student of students)`, we said that student is a *target*, but students is a *source* reference.
  -  In the statement `if (student.id == studentID)`, both student and studentID are *source* references. `student` is also a *source* reference in `return student.name`.
  -  In `getStudentName(73)`, getStudentName is a *source* reference (which we hope resolves to a function reference value).
  -  In `console.log(nextStudent)`, console is a *source* reference, as is nextStudent.

***

**Cheating: Runtime Scope Modifications**

> Scope is determined as the program is compiled, and should not generally be affected by runtime conditions.
- In **non-strict-mode**, there are technically still two ways to cheat this rule, modifying a program’s scopes during runtime.
  1. The **eval(..)** function receives a string of code to compile and execute on the fly during the program runtime.
    ```ruby
    function badIdea() {
        eval("var oops = 'Ugh!';");
        console.log(oops);
    }
    badIdea();   // Ugh!
    ```
  2. The **with** keyword, which essentially dynamically turns an object into a local scope—its properties are treated as identifiers in that new scope’s block.
   ```ruby
    var badIdea = { oops: "Ugh!" };
    with (badIdea) { 
        console.log(oops); // Ugh!
    }

   ```
>At all costs, avoid eval(..) (at least, eval(..) creating declarations) and with. Again, neither of these cheats is available in strict-mode, so if you just use strict-mode (you should!) then the temptation goes away!

***

**Lexical Scope**

- The key idea of “lexical scope” is that it’s controlled entirely by the placement of functions, blocks, and variable declarations, in relation to one another.
    >If you place a variable declaration inside a function, the compiler handles this declaration as it’s parsing the function, and associates that declaration with the function’s scope. If a variable is block-scope declared (let / const), then it’s associated with the nearest enclosing { .. } block, rather than its enclosing function (as with var).

    >It’s important to note that compilation doesn’t actually do anything in terms of reserving memory for scopes and vari- ables. None of the program has been executed yet.

    >Instead, compilation creates a map of all the lexical scopes that lays out what the program will need while it executes.



_The End_
