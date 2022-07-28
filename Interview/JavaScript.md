## JavaScript
***

**Engine**
- **Heap:** This refers to the physical space in memory used to store variables, functions and Objects.
- **Stack:** This is the stack where functions and API calls are stored (Web API in browsers and C/C++ API on local machines via NodeJs). This stack behaves as a last-in-first-out (LIFO) structure.
- **API's (Web or C/C++):** This is where the actual functionality of built-in functions such as setTimeout() and fetch() are found.
- **Callback queue:** Some API functions require a callback function to be provided to know what to do after the API function has been executed. These callback functions are stored in this queue and behave as a first-in-first-out (FIFO) structure. 
- **Event loop:** It is an algorithm that is constantly monitoring the Stack. When the stack is empty, the first function located in the callback queue is entered into the stack to complete its execution and then the next one until the callback queue is empty.
- **Garbage collection:** is the process of finding and deleting objects which are no longer being referenced by other objects.`GC is a fundamental component of the memory management system used by JavaScript.`

***

- **Hoisting** 
  - Hoisting is the default behaviour of javascript where all the variable and function declarations are moved on top.
  - This means that irrespective of where the variables and functions are declared, they are moved on top of the scope. The scope can be both local and global.
  - It happens when variables and functions are declared before any type of code is processed.

- **Scope**
  - The scope is the current context of execution in which values and expressions are "visible" or can be referenced.
  > If a variable or expression is not in the current scope, it will not be available for use.
  - JavaScript has the following kinds of **scopes**:
    - Global scope: The default scope for all code running in script mode.
    - Module scope: The scope for code running in module mode.
    - Function scope: The scope created with a function.
     > A function creates a scope, a variable defined exclusively within the function cannot be accessed from outside the function or within other functions. 
  - In addition, variables declared with let or const can belong to an additional scope:
    - Block scope: The scope created with a pair of curly braces `{ }`(a block). 
    > Blocks only scope let and const declarations, but not var declarations.
- **Coercion**
  - Type coercion is the automatic or _implicit_ conversion of values from one data type to another (such as strings to numbers).
  - **Type conversion** is similar to type **coercion** because they both convert values from one data type to another with one key difference — type coercion is implicit whereas type conversion can be either implicit or explicit.
- **Var, Let & Const**
  - The **let** keyword has some differences to **var**, with the most obvious being that **let** allows a more limited access to the variable than **var**. This is called “block scoping” as opposed to regular or function scoping.
- **“ == “ and “ === “ operators**
    - Both are comparison operators. 
    - The difference between both the operators is that “==” is used to compare values whereas, “ === “ is used to compare both values and types.
    -  === disallows any sort of type conversion (aka, “coercion”) in its comparison.
    > == loose equality / === stritc equality 
- **Closures**
   - Closures are an ability of a function to remember the variables and functions that are declared in its outer scope. 
   > This ability of a function to store a variable for further reference even after it is executed is called Closure.

- **Object Prototype**  
  - A prototype is a blueprint of an object. 
  - The prototype allows us to use properties and methods on an object even if the properties and methods do not exist on the current object. 
  - All javascript objects inherit properties from a prototype. For example,
    - Date objects inherit properties from the Date prototype
    - Math objects inherit properties from the Math prototype
    - Array objects inherit properties from the Array prototype.
    - On top of the chain is Object.prototype. Every prototype inherits properties and methods from the Object.prototype.
   
 - **Arrow functions** 
   - Arrow functions were introduced in the ES6 version of javascript.
   - They provide us with a new and shorter syntax for declaring functions.
   - Arrow functions can only be used as a function expression. 
   > In the arrow functions, there is no binding of this keyword. This keyword inside an arrow function does not refer to the object calling it. 
 - **Callback** 
   - A callback is a function that will be executed after another function gets executed. 
   - In javascript, functions are treated as first-class citizens:
     -  they can be used as an argument of another function
     -  can be returned by another function
     -  can be used as a property of an object.
    > Functions that are used as an argument to another function are called callback functions.If the same parameter is used again while invoking the function, instead of computing the result, we directly return the stored (cached) value.    

- **Memoization**
  - Memoization is a form of caching where the return value of a function is cached based on its parameters. If the parameter of that function is not changed, the cached version of the function is returned.
   > using memoization we can store(cache) the computed results based on the parameters

- **Recursion**
  - Recursion is a technique to iterate over an operation by having a function call itself repeatedly until it arrives at a result.

- **Constructor functions**
  - Constructor functions are used to create objects in javascript. 
- **Rest parameter ( … )**
  - It provides an improved way of handling the parameters of a function.
  - Using the rest parameter syntax, we can create functions that can take a variable number of arguments.
  - Any number of arguments will be converted into an array using the rest parameter.
  - It also helps in extracting all or some parts of the arguments.
  - Rest parameters can be used by applying three dots (...) before the parameters. 
  > Rest parameter should always be used at the last parameter of a function. 
- **Spread operator (…)**
  - Although the syntax of the spread operator is exactly the same as the rest parameter, the spread operator is used to spreading an array, and object literals. 
  - We also use spread operators where one or more arguments are expected in a function call.
- Key differences between rest parameter and spread operator:
  - Rest parameter is used to take a variable number of arguments and turns them into an array while the spread operator takes an array or an object and spreads it
  - Rest parameter is used in function declaration whereas the spread operator is used in function calls.




- **Types of errors**
    - There are two types of errors in javascript.
      - **Syntax error:** Syntax errors are mistakes or spelling problems in the code that cause the program to not execute at all or to stop running halfway through. Error messages are usually supplied as well.
      - **Logical error:** Reasoning mistakes occur when the syntax is proper but the logic or program is incorrect. The application executes without problems in this case. However, the output findings are inaccurate. These are sometimes more difficult to correct than syntax issues since these applications do not display error signals for logic faults.


- Even bubbling: indicates whether the event bubbles up through the DOM tree or not.
- Event capturing 


- **DOM**
  - DOM stands for Document Object Model.  
  - DOM is a programming interface for HTML and XML documents.
  - When the browser tries to render an HTML document, it creates an object based on the HTML document called DOM. 
  - Using this DOM, we can manipulate or change various elements inside the HTML document. 