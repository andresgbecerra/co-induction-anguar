## JavaScript
***

>JavaScript is a dynamically typed language. In a dynamically typed language, the type of a variable is checked during run-time in contrast to a statically typed language, where the type of a variable is checked during compile-time.

**Engine**

**Parser** - The JavaScript source code is first converted to tokens. Tokens represent the alphabet of a language. JavaScript is fed into a Parser, which generates an Abstract Syntax Tree.
**Interpreter** - Abstract Syntax Tree is the input for the V8 Ignition Interpreter, which generates the ByteCode
**Compiler** - The Turbofan Compiler of the V8 Engine takes in the ByteCode and generates machine code
**Optimizing Compiler**- It takes ByteCode and some profiling data as the input and generates optimized machine code

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

- **Scope and Scope Chain**    
  - Scope in JS determines the accessibility of variables and functions at various parts of one’s code.
  - In general terms, the scope will let us know at a given part of code, what are variables and functions we can or cannot access.
  - There are three types of scopes in JS:
    - **Global Scope** - Variables or functions declared in the global namespace have global scope, which means all the variables and functions having global scope can be accessed from anywhere inside the code.
    - **Local or Function Scope** - Any variables or functions declared inside a function have local/function scope, which means that all the variables and functions declared inside a function, can be accessed from within the function and not outside of it.
    - **Block Scope** - Block scope is related to the variables declared using let and const. Variables declared with var do not have block scope. Block scope tells us that any variable declared inside a block { }, can be accessed only inside that block and cannot be accessed outside of it.
  - **Scope Chain:** JavaScript engine also uses Scope to find variables.
    - if the javascript engine does not find the variable in local scope, it tries to check for the variable in the outer scope. If the variable does not exist in the outer scope, it tries to find the variable in the global scope. 


- **primitive data types**    
  - A primitive is a data type that isn't composed of other data types.
  - It's only capable of displaying one value at a time. 
  - By definition, every primitive is a built-in data type (the compiler must be knowledgeable of them) nevertheless, not all built-in datasets are primitives. 
  - In JavaScript, there are 5 different forms of basic data. 
    - The following values are available:
      - **Boolean** - It represents a logical entity and can have only two values : true or false. Booleans are generally used for conditional testing.
      - **Undefined** - When a variable is declared but not assigned, it has the value of undefined and it’s type is also undefined.
      - **Null** - It represents a non-existent or a invalid value.
      - **Number** - It represents a number and can be written with or without decimals.
      - **String** - It represents a series of characters and is written with quotes. A string can be represented using a single or a double quote.
      > -**BigInt** - This data type is used to store numbers which are above the limitation of the Number data type. It can store large integers and is represented by adding “n” to an integer literal.

      > -**Symbol** - It is a new data type introduced in the ES6 version of javascript. It is used to store an anonymous and unique value.

  - **typeof** of primitive types : return the type of value
    ```js
        typeof "John Doe" // Returns "string"
        typeof 3.14 // Returns "number"
        typeof true // Returns "boolean"
        typeof 234567890123456789012345678901234567890n // Returns bigint
        typeof undefined // Returns "undefined"
        typeof null // Returns "object" (kind of a bug in JavaScript)
        typeof Symbol('symbol') // Returns Symbol
    ```

 - **NaN property** represents the “Not-a-Number” value.
   - It indicates a value that is not a legal number.
   - typeof of NaN will return a Number.
   - To check if a value is NaN, we use the isNaN() function:
     ```js
        isNaN("Hello")  // Returns true
        isNaN(345)   // Returns false
        isNaN('1')  // Returns false, since '1' is converted to Number type which results in 0 ( a number) 
        isNaN(true) // Returns false, since true converted to Number type results in 1 ( a number)
        isNaN(false) // Returns false
        isNaN(undefined) // Returns true
     ``` 
  
- **Non-primitive types**
  - Primitive data types can store only a single value. 
  - To store multiple and complex values, non-primitive data types are used.
  - Object - Used to store collection of data. `Collection of data in key-value pairs`
  - Array - `Collection of data as an ordered list`
   > It is important to remember that any data type that is not a primitive data type, is of Object type in javascript 

- **Coercion**
  - Type coercion is the automatic or _implicit_ conversion of values from one data type to another (such as strings to numbers).
  - **Type conversion** is similar to type **coercion** because they both convert values from one data type to another with one key difference — type coercion is implicit whereas type conversion can be either implicit or explicit.
  - **Boolean Coercion** takes place when using logical operators, ternary operators, if statements, and loop checks. To understand boolean coercion in if statements and operators, we need to understand truthy and falsy values.
    - Truthy values are those which will be converted (coerced) to true. 
    - Falsy values are those which will be converted to false.
    - All values except false, 0, 0n, -0, “”, null, undefined, and NaN are truthy values.
  
  - **String coercion** takes place while using the ‘ + ‘ operator. When a number is added to a string, the number type is always converted to the string type.
    - ‘ + ‘ operator when used to add two numbers, outputs a number. The same ‘ + ‘ operator when used to add two strings, outputs the concatenated string 
    - Type coercion also takes place when using the ‘ - ‘ operator, but the difference while using ‘ - ‘ operator is that, a string is converted to a number and then subtraction takes place.
  
  - **Logical operators** in javascript, unlike operators in other programming languages, do not return true or false. They always return one of the operands.
    - OR ( | | ) operator - If the first value is truthy, then the first value is returned. Otherwise, always the second value gets returned.
    - AND ( && ) operator - If both the values are truthy, always the second value is returned. If the first value is falsy then the first value is returned or if the second value is falsy then the second value is returned.
  
  - **Equality Coercion** takes place when using ‘ == ‘ operator. 
    - The ‘ == ‘ operator compares values and not types.
    - While the above statement is a simple way to explain == operator, it’s not completely true
    - The reality is that while using the ‘==’ operator, coercion takes place.
    - The ‘==’ operator, converts both the operands to the same type and then compares them.
  
  - **“ == “ and “ === “ operators**
    - Both are comparison operators. 
    - The difference between both the operators is that “==” is used to compare values whereas, “ === “ is used to compare both values and types.
    -  === disallows any sort of type conversion (aka, “coercion”) in its comparison.
    > == loose equality / === stritc equality 
  
- **The charAt()** 
  - It is a function of the JavaScript string finds a char element at the supplied index. 
  - The index number begins at 0 and continues up to n-1, Here n is the string length. 
  - The index value must be positive, higher than, or the same as the string length.


- **Var, Let & Const**
  - The **let** keyword has some differences to **var**, with the most obvious being that **let** allows a more limited access to the variable than **var**. This is called “block scoping” as opposed to regular or function scoping.
  - Variables with the **const** keyword behave exactly like a variable declared with the **let** keyword with only one difference, any variable declared with the **const** keyword cannot be reassigned.

- **“this” keyword** 
    - The “this” keyword refers to the object that the function is a property of.
    - The value of the “this” keyword will always depend on the object that is invoking the function.
    - the global object is the window object.


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
  
 - **strict-mode** 
   - In 'Strict mode,all forms of errors, including silent errors, will be thrown. As a result, debugging becomes a lot simpler.   
   - Characteristics of strict mode in javascript:
     - Duplicate arguments are not allowed by developers.
     - In strict mode, you won't be able to use the JavaScript keyword as a parameter or function name.
     - The 'use strict' keyword is used to define strict mode at the start of the script. Strict mode is supported by all browsers.
     - Engineers will not be allowed to create global variables in 'Strict Mode.

- **call(), apply() and, bind() methods**
  - call():
    - It’s a predefined method in javascript.
    - This method invokes a method (function) by specifying the owner object. 
    - call() method allows an object to use the method (function) of another object.
    - call() accepts arguments
      ```js
        function sayHello(){
            return "Hello " + this.name;
        }
                
        var obj = {name: "Sandy"};
                
        sayHello.call(obj);
                
        // Returns "Hello Sandy" 
        //---------------------------
        var person = {
            age: 23,
            getAge: function(){
                    return this.age;
                }
            }        
        var person2 = {age:  54};
        person.getAge.call(person2);      
        // Returns 54 
        //---------------------------
         function saySomething(message){
                return this.name + " is " + message;
            }     
        var person4 = {name:  "John"};     
        saySomething.call(person4, "awesome");
        // Returns "John is awesome"    
      ``` 
    - apply()
      - The apply method is similar to the call() method. The only difference is that,
      - call() method takes arguments separately whereas, apply() method takes arguments as an array.
        ```js
            function saySomething(message){
                return this.name + " is " + message;
            }        
            var person4 = {name:  "John"};
            saySomething.apply(person4, ["awesome"]);
        ```
    - bind():
      - This method returns a new function, where the value of “this” keyword will be bound to the owner object, which is provided as a parameter.
      - Example with arguments:
        ```js
            var bikeDetails = {
                displayDetails: function(registrationNumber,brandName){
                    return this.name+ " , "+ "bike details: "+ registrationNumber + " , " + brandName;
                }
            }
            
            var person1 = {name:  "Vivek"};
                
            var detailsOfPerson1 = bikeDetails.displayDetails.bind(person1, "TS0122", "Bullet");
                
            // Binds the displayDetails function to the person1 object 
                
            detailsOfPerson1();
            // Returns Vivek, bike details: TS0452, Thunderbird

        ```
- **Higher Order Functions**
  - Functions that operate on other functions, either by taking them as arguments or by returning them, are called higher-order functions.
  - Higher-order functions are a result of functions being first-class citizens in javascript. 

- **currying** 
  - Currying is an advanced technique to transform a function of arguments n, to n functions of one or fewer arguments.
  - if we have a function f(a,b), then the function after currying, will be transformed to f(a)(b).
  - By using the currying technique, we do not change the functionality of a function, we just change the way it is invoked. 

- **Immediately Invoked Function IIF** 
   ```js
    (function(){ 
        // Do something;
        })();  
   ```  
   - An Immediately Invoked Function ( known as **IIFE** and pronounced as **IIFY**) is a function that runs as soon as it is defined.
   - The first set of parenthesis that tells the compiler that the function is not a function declaration, instead, it’s a function expression.
   - Therefore to invoke the function, we use the second set of parenthesis.

- **exec () and test () methods**
   - test () and exec () are RegExp expression methods used in javascript. 
   - We'll use exec () to search a string for a specific pattern, and if it finds it, it'll return the pattern directly; else, it'll return an 'empty' result.
   - We will use a test () to find a string for a specific pattern. It will return the Boolean value 'true' on finding the given text otherwise, it will return 'false'.

- **Arrow functions** 
   - Arrow functions were introduced in the ES6 version of javascript.
   - They provide us with a new and shorter syntax for declaring functions.
   - Arrow functions can only be used as a function expression. 
   > In the arrow functions, there is no binding of this keyword. This keyword inside an arrow function does not refer to the object calling it. 

- **Callback** 
   - A callback is a function that will be executed after another function gets executed.`Callbacks are a technique of ensuring that a particular code does not run until another code has completed its execution.` 
   - In javascript, functions are treated as first-class citizens:
     -  they can be used as an argument of another function
     -  can be returned by another function
     -  can be used as a property of an object.
    > Functions that are used as an argument to another function are called callback functions.If the same parameter is used again while invoking the function, instead of computing the result, we directly return the stored (cached) value. 

- **Promises**   
  - Promises are basically objects that may or may not resolve (essentially return) a value in the future, but which will notify the calling function via callbacks whether it is successful or not. 
  - Promises are used to handle asynchronous operations in javascript.
  - A promise is created using the Promise constructor which takes in a callback function with two parameters, resolve and reject respectively.
  - Pending - Initial state of promise. This state represents that the promise has neither been fulfilled nor been rejected, it is in the pending state.
  - Fulfilled - This state represents that the promise has been fulfilled, meaning the async operation is completed.
  - Rejected - This state represents that the promise has been rejected for some reason, meaning the async operation has failed.
  - Settled - This state represents that the promise has been either rejected or fulfilled. 
  - A promise is created using the Promise constructor which takes in a callback function with two parameters, **resolve** and **reject** respectively.
    - **resolve** is a function that will be called when the async operation has been successfully completed.
    - **reject** is a function that will be called, when the async operation fails or if some error occurs.
  - We can consume any promise by attaching **then()** and **catch()** methods to the consumer.
    - then() method is used to access the result when the promise is fulfilled.
    - catch() method is used to access the result/error when the promise is rejected.

- **Generator functions**
  - Introduced in the ES6 version, generator functions are a special class of functions.
  - They can be stopped midway and then continue from where they had stopped.
  - Generator functions are declared with the `function*` keyword instead of the normal function keyword
  - The generator object consists of a method called **next()**, this method when called, executes the code until the nearest **yield** statement, and returns the **yield** value.
  
- **Object Destructuring**  
  - Object destructuring is a new way to extract elements from an object or an array.
  - Using object destructuring we can extract all the elements inside an object in one line of code.

- **Classes**
  - Introduced in the ES6 version, classes are nothing but syntactic sugars for constructor functions.
  - They provide a new way of declaring constructor functions in javascript.  
  - Key points to remember about classes:
    - Unlike functions, classes are not hoisted. A class cannot be used before it is declared.
    - A class can inherit properties and methods from other classes by using the **extends** keyword.
    - All the syntaxes inside the class must follow the strict mode(‘use strict’) of javascript. An error will be thrown if the strict mode rules are not followed.


- **Temporal Dead Zone - TDZ**
  - Temporal Dead Zone is a behaviour that occurs with variables declared using let and const keywords. It is a behaviour where we try to access a variable before it is initialized.
  - Throws a reference error 

- **prototypal and classical inheritance**
  - Programers build objects, which are representations of real-time entities, in traditional OO programming. 
  - Classes and objects are the two sorts of abstractions. 
  - A class is a generalization of an object, whereas an object is an abstraction of an actual thing. 
  - `A Vehicle, for example, is a specialization of a Car. As a result, automobiles (class) are descended from vehicles (object).`
  - **Classical** inheritance differs from **prototypal** inheritance in that classical inheritance is confined to classes that inherit from those remaining classes, but prototypal inheritance allows any object to be cloned via an object linking method. 
  - Despite going into too many specifics, a prototype essentially serves as a template for those other objects, whether they extend the parent object or not. 

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

- **WeakSet**
  - In javascript, a Set is a collection of unique and ordered elements.
  - Just like Set, WeakSet is also a collection of unique and ordered elements with some key differences:
    - Weakset contains only objects and no other type.
    - An object inside the weakset is referenced weakly. This means, that if the object inside the weakset does not have a reference, it will be garbage collected.
    - Unlike Set, WeakSet only has three methods, add() , delete() and has() . 
    ```js
        const newSet = new Set([4, 5, 6, 7]);
        console.log(newSet);// Outputs Set {4,5,6,7}

        const newSet2 = new WeakSet([3, 4, 5]); //Throws an error


        let obj1 = {message:"Hello world"};
        const newSet3 = new WeakSet([obj1]);
        console.log(newSet3.has(obj1)); // true

    ```

- **WeakMap**
  - In javascript, Map is used to store key-value pairs.
  -  The key-value pairs can be of both primitive and non-primitive types. 
  -  WeakMap is similar to Map with key differences:
     - The keys and values in weakmap should always be an object.
     - If there are no references to the object, the object will be garbage collected.
  ```js
        const map1 = new Map();
        map1.set('Value', 1);

        const map2 = new WeakMap();
        map2.set('Value', 2.3); // Throws an error

        let obj = {name:"Vivek"};
        const map3 = new WeakMap();
        map3.set(obj, {age:23});

  ```
- **Types of errors**
    - There are two types of errors in javascript.
      - **Syntax error:** Syntax errors are mistakes or spelling problems in the code that cause the program to not execute at all or to stop running halfway through. Error messages are usually supplied as well.
      - **Logical error:** Reasoning mistakes occur when the syntax is proper but the logic or program is incorrect. The application executes without problems in this case. However, the output findings are inaccurate. These are sometimes more difficult to correct than syntax issues since these applications do not display error signals for logic faults.


- **Even bubbling & Event capturing** 
  -  indicates whether the event bubbles up through the DOM tree or not.
  -  Bubbling and Capturing are two models that DOM events use to propagate.


- **pass-by-reference or pass-by-value**
  - In JavaScript, primitive data types are passed by value and non-primitive data types are passed by reference. 
  - The variable's data is always a reference for objects, hence it's always pass by value. As a result, if you supply an object and alter its members inside the method, the changes continue outside of it. It appears to be pass by reference in this case. However, if you modify the values of the object variable, the change will not last, demonstrating that it is indeed passed by value.

 
- **DOM**
  - DOM stands for Document Object Model.  
  - DOM is a programming interface for HTML and XML documents.
  - When the browser tries to render an HTML document, it creates an object based on the HTML document called DOM. 
  - Using this DOM, we can manipulate or change various elements inside the HTML document. 
  
- **BOM** 
  - Browser Object Model is known as BOM. 
  - It allows users to interact with the browser. 
  - A browser's initial object is a window. 
  - As a result, you may call all of the window's functions directly or by referencing the window. 
  - The document, history, screen, navigator, location, and other attributes are available in the window object.

- **Client-side JavaScript** is made up of two parts, a fundamental language and predefined objects for performing JavaScript in a browser. JavaScript for the client is automatically included in the HTML pages. At runtime, the browser understands this script.
- Client-side JavaScript is similar to server-side JavaScript. It includes JavaScript that will execute on a server. Only after processing is the server-side JavaScript deployed.

