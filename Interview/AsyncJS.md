## Asynchronous JavaScript
***

### Content

- [Introduction](#introduction)
- [Funtions](#funtions)
- [Callback](#callback)
- [1. Understanding Asynchronous Coding](#1-understanding-asynchronous-coding)
- [2. The Necessity of Callbacks](#2-the-necessity-of-callbacks)
- [3. Promises](#3-promises)
- [4. Async Await](#4-async-await)
- [Generators](#generators)


***


# Introduction


JS Engine Architecture:
    - [JS Engine](https://cabulous.medium.com/how-v8-javascript-engine-works-5393832d80a7)
 ![JS Engine](../assets/js-engine.png)

- **Heap:** Refers to the physical space in memory used to store variables, functions and objects.
- **Stack:** This is the stack where functions and API calls are stored (Web API in browsers and C/C++ API on local machines via NodeJs). This stack behaves as a last-in-first-out (LIFO) structure..
- **API’s (Web or C/C++):** This is where the real functionalities of the built-in functions such as setTimeout() and fetch() are found.
- **Callback queue:** Some API functions require a callback function to be provided to know what to do after the API function has been executed. These callback functions are stored in this queue and behave as a first-in-first-out (FIFO) structure. 
- **Event loop:** It is an algorithm that is constantly monitoring the stack. When the stack is empty, the first function located in the callback queue is entered into the stack to complete its execution and then the next one until the callback queue is empty.


[Back](#content)

# Funtions

**Declarative Functions:**
Declarative functions use the reserved word **function** at the beginning in order to declare the function, and they will always be available at runtime.:
```js
greeting('Juanito');

function greeting(name) {
	console.log(`Hello ${name}`);
}

```
**Expression Function:**
The declaration starts with the reserved word **var**, where a variable that will store an anonymous function will be generated `An anonymous function is a function that does not have a name before the operator ()`.
```js
    greeting(‘Juanito’); // ErrorType: greeting is not defined

    var greeting = function(name){
        console.log(`Hello ${name}`)
    }

    greeting(‘Juanito’); // OK..!!
```
> The expressed functions are only evaluated when the natural flow of execution reaches them.

[Back](#content)


# Callback
  When a function is passed as an argument to another function this is known as a callback:
  ```js
        function functionOne(num) {
            console.log(num);
        }

        function functionTwo(num, callback) {
            callbackNum = 10;
            callback(callbackNum);
            console.log(num);
        }

        functionTwo(5, functionOne); //outputs 10, then 5 on a new line
  ```
  > This creates a Closure where functionOne() has access to the scope of functionTwo().

  > You can not intrinsically write an asynchronous function in JavaScript, what you can do is use functions that interact directly with the callback queue such as the setTimeout() function.

  - JavaScript ES6 introduced a new object called Promise, this object allows you to write Asynchronous JavaScript.
  - A **Promise** is an object that resolves or not a value in the future, this value is returned to the function by means of callbacks.
  `Promises have three statuses: fulfilled, rejected, or pending`

[Back](#content)

***

# 1. Understanding Asynchronous Coding
   
   - Synchronous Code: One piece of code executes and must finish before executing the next piece of code.
   - Features:
     - Easy to write and understand.
     - Can create block code. 
     - Reduces performance.
   - Asynchronous code: A piece of code does not wait for deferred instructions and continues its execution.
   - Features:
     - Increases performance
     - Eliminates the block code
     - Can be difficult to write and understand
  > JavaScript is a single thread, that is it only executes one piece of code at a time.. 
  
[Back](#content)

***

# 2. The Necessity of Callbacks
   - In JavaScript, functions are objects, and it is allowed to pass objects as a parameter to a function, so it is possible to pass functions as a parameter to other functions and call them inside the container functions.
     > A function that is passed to another function as a parameter is a **callback** function.
   ```js
   //Funcion declarativa
    let logCall = function() {
        console.log("locCall was called back.");
    };

    //Ejemplo 2
    setTimeout(logCall, 3000);

    //Ejemplo 3
    setTimeout(function() {
        console.log("The function was called back.");
    }, 3000);
  
   ```
   - Functional use of callback: callbacks facilitate the implementation of asynchronous code, because they ensure the execution of a task (function) after another one has finished.
   ```js
        let students = [{name:"Mary",score:90,school:"East"},
        {name:"James",score:100,school:"East"},
        {name:"Steve",score:40,school:"East"},
        {name:"Gabe",score:90,school:"West"},
        {name:"Rachel",score:85,school:"East"},
        {name:"Rochelle",score:95,school:"West"},
        {name:"Lynette",score:75,school:"East"}];

        let processStudents = function(data, callback) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].school.toLowerCase() === "east") {
                    if (typeof callback === "function") {
                        callback(data[i]);
                    }
                }
            }
        }

        processStudents(students, function(obj) {
            if (obj.score > 60) {
                console.log(obj.name + " passed!");
            }
        });

        let determineTotal = function() {
            let total = 0,
                count = 0;

            processStudents(students, function(obj) {
                total = total + obj.score;
                count++;
            });

            console.log("Total Score: " + total + " - Total Count: " + count);
        }

        determineTotal();
   ```
   - The **callback** is also particularly used for **event** declarations, for example when the user clicks on a button:
      ```js        
            let btn = document.querySelector("#item1");

            btn.addEventListener("click", function(e) {
                console.log("The button was clicked.");
            });
      ```
      > The event listener `addEventListener`, receives two parameters, the first one determines the type of event and the second one is a **callback** function.
   - **Callbacks issue:**
     - Callback Hell, this condition results from nesting functions trying to execute from top to bottom and without a precise error control.
     - Difficult to follow and reason.
     - Inversion of Control, is a term related to the control flow (execution of statements/instructions) of the program, and occurs when using asynchronous code that implements callbacks because the control flow is external to the code.


[Back](#content)

***

# 3. Promises

   > The **promises** are the particular solution to the issues related to the use of **callbacks**..
   - What are JS Promises:
       - An Object with properties and methods.
       - Represents an eventual success or failure of an asynchronous operation.
       - It always returns a value.
   - Creating a Promise:
    ```js
            let asyncFunction = function() {
            return new Promise(function(resolve, reject) {
                setTimeout(function() {
                    resolve("asyncFunction has resolved.");
                }, 4000);
            });
          };
    ```
    > A promise is a returned object to which callback functions are attached, rather than passing callbacks to a function.
    - Using Promises:
    ```js
            let promise = asyncFunction();

            promise.then(functino(val){
                console.log('This is the value: ' + val);
            });
            // This is the value: asyncFunction has resolved.
    ```
    - One of the great advantages of using promises is chaining:
      - Chaining is using two or more asynchronous operations in a row, where each operation begins when the previous one has finished successfully.
       ```js

         let asyncFunction2 = function() {
            return new Promise(function(resolve, reject) {
                setTimeout(function() {
                    resolve("asyncFunction2 has resolved.");
                }, 3000);
            });
          };

        asyncFunction()
        .then(function(val){
             console.log('AsyncFuntion: ' + val);
             return asyncFunction2();
        })
        .then(function(val){
            console.log('AsyncFuntion2: ' + val);
        })

        //--------------------
        // usando funciones de flecha
        //--------------------

        asyncFunction()
        .then(val => {
             console.log('AsyncFuntion: ' + val);
             return asyncFunction2();
        })
        .then(val => console.log('AsyncFuntion2: ' + val));
       ``` 
    - **catch( ) method:** Promises resolve by catching all errors, including thrown exceptions and programming errors. `This is essential for the functional composition of asynchronous operations`
        ```js
            let wordnikWords = "http://api.wordnik.com/v4/words.json/",
                wordnikWord = "http://api.wordnik.com/v4/word.json/",
                apiKey = "?api_key=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                wordObj={};

            fetch(wordnikWords + "randomWord" + apiKey)
            .then(function(response) {
                wordObj = response;
                //console.log(wordObj);
                return response.json();
            })
            .then(function(data) {
                console.log(data.word);
                return fetch(wordnikWord + data.word + "/definitions" + apiKey);
            })
            .then(function(def) {
                //console.log(def);
                return def.json();
            })
            .then(function(def) {
                console.log(def);
            })
            .catch(function(err) { // captura de errores
                console.log(err);
            });

        ```
        - The error returned by a promise can also be caught by passing a second callback in the then() method:
         ```js
          let promise = new Promise(function(resolve, reject) {
                setTimeout(function() {
                    reject("Error");
                }, 4000)
            });

            promise.then(function(val) {
                console.log(val);
            }, function(val) {
                console.log("rejected: " + val);
            });
         ``` 
- **finally( ) method:**
   - This method can be useful if it is necessary to do some processing or cleanup after the promise ends, regardless of its result.
   - The finally( ) method does not take any arguments.
    ```js
        asyncFunction2()
        .then(msg => console.log(msg))
        .catch(err => console.log(err))
        .finally(() => console.log("Cleaning up tasks."));
    ```

  > Asynchonous Commands:
   >- setTimeout()
   >- setInterval()
   >- Node.js: setImmediate()
   >- Node.js: process.nextTick()
   >- Node.js: readFile()
- **Using static .all and .race methods of the Promises**
   - These static methods are in the constructor of the Promise Object and are used to access the functionalities: `Promise.all() ` and ` Promise.race()`.
     ```js
            let firstFunction = function() {
            return new Promise(function(resolve, reject) {
                setTimeout(function() {
                    resolve("Function1");
                }, 1000);
            });
            };

            let secondFunction = function() {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve("Function2");
                    }, 3000);
                });
            };

            let thirdFunction = function() {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve("Function3");
                    }, 5000);
                });
            };

            //----------------
            // Promise.all()
            //----------------
            Promise.all([firstFunction(), secondFunction(), thirdFunction()])
                .then(function(result) {                    
                    console.log(result[0] + " " + result[2] + " " + result[1]);
                })
                .catch(function(result) {
                    console.log(result);
                });

            //----------------
            // Promise.race()
            //----------------
            Promise.race([firstFunction(), secondFunction(), thirdFunction()])
                .then(function(result) {
                    console.log(result);
                })
                .catch(function(result) {
                    console.log(result);
                });

     ```
   > Promise.all( ) and Promise.race( ) are two composition tools for executing asynchronous operations in parallel.


[Back](#content)

***

# 4. Async Await
   > Promises simplified the use of callback, Async Await simplifies the use of Promises.

   - The async function declaration defines an asynchronous function, which returns an AsyncFunction object.
   - Async functions allow promises to resolve in a synchronous and non-blocking manner in the process. async functions can be either expression or declarative.
   - An async function can contain an await expression, which pauses the execution of the asynchronous function and waits for the resolution of the passed Promise.
   - When an async function is called, it returns a Promise element.
    ```js
            const swapiFilms = async function() {
            let url = "https://swapi.dev/api/films/",
                filmsData = {},
                films = [];

            filmsData = await fetch(url).then(data => data.json());

            //processing data
            films = filmsData.results.map(obj => obj.title);
            console.log(films);
           };

          swapiFilms(); // llama la función async
    ```
    - **await Keyword**
       - Can only be used within an Async function.
       - Wait for Promise resolution.
       - Causes the Async function to pause, generating synchronous coding behavior.

[Back](#content)

***

# Generators

**Making Use of Generators**
   - An **iterator** is an object that allows to loop through a collection and return a value when finished. 
     - The iterator implements the _iteration protocol_ through the **next( )** method, which returns an object with two properties: `{value:  , done: }` where **value** is the value of each sequence and **done** represents a boolean value that changes its state to _true_ when the iteration is at the last value of the sequence.
    - A **generator function** (GeneratorFunction constructor) is a special type of function that serves as an iterator factory. When executed, it returns a new Generator object. 
    - A function becomes a GeneratorFunction if it uses the syntax __function *__.
    - It is a way of writing code that can be paused and continued later.
  ```js
        let arr = ['a', 'b', 'c', 'd'];

        //let it = arr[Symbol.iterator]();

        const arrIt = function*(arr) {
            for (let i = 0; i < arr.length; i++) {
                yield arr[i];
            };
        };

        let it = arrIt(arr);

        it.next(); // {value: "a", done:false}
        it.next(); // {value: "b", done:false}
        it.next(); // {value: "c", done:false}
        it.next(); // {value: "d", done:true}

  ```

>Iterators and generators provide a mechanism to customize the behavior of the for loops...of

[Back](#content)

_The End_
