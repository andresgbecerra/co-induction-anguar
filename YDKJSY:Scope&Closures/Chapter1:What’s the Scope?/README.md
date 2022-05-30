
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

***

**Cheating: Runtime Scope Modifications**

***

**Lexical Scope**

***
