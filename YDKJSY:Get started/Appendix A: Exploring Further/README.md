## You Don’t Know JS Yet: Get Started 

### Appendix A: Exploring Further

***

**Values vs. References**

**Values:**
- The two main types of values: primitives and objects.
- How these values are assigned and passed around.
- If you assign/pass a value itself, the value is copied:
  ```ruby
   var myName = "Kyle";
   var yourName = myName;
  ```
  >primitive values are always assigned/passed as value copies.

- How to prove there’s two separate values involved:
  ```ruby
    var myName = "Kyle";

    var yourName = myName;

    myName = "Frank";

    console.log(myName);
    // Frank

    console.log(yourName);
    // Kyle
  ```
  >each variable holds its own copy of the value.

**References**
- References are the idea that two or more variables are pointing at the same value, such that modifying this shared value would be reflected by an access via any of those references. `In JS, only object values (arrays, objects, functions, etc.) are treated as references.`

  ```ruby
    var myAddress = {
        street: "123 JS Blvd",
        city: "Austin", 
        state: "TX"
    };

    var yourAddress = myAddress;

    // I've got to move to a new house!

    myAddress.street = "456 TS Ave";

    console.log(yourAddress.street);
    // 456 TS Ave
  ```
>JS chooses the value-copy vs. reference-copy behavior based on the value type. **Primitives** are held by value, **Objects** are held by reference.
***

**So Many Function Forms**

>The function expression here is referred to as an **anonymous function expression**, it has no name identifier between the function keyword and the (..) parameter list.

```
    var awesomeFunction = function(coolThings) { 
        // ..
        return amazingStuff; 
    };

    awesomeFunction.name;
    // "awesomeFunction"
```
>This function expression is a **named function expression**, since the identifier someName is directly associated with the function expression at compile time;

```
    // let awesomeFunction = ..
    // const awesomeFunction = ..
    var awesomeFunction = function someName(coolThings) {
    // ..
    return amazingStuff; };
    awesomeFunction.name;
    // "someName"
```
>Notice also that the explicit function name, the identifier someName, takes precedence when assigning a name for the name property.

There are more declaration forms:
```
    // generator function declaration
    function *two() { .. }

    // async function declaration
    async function three() { .. }

    // async generator function declaration
    async function *four() { .. }

    // named function export declaration (ES6 modules)
    export function five() { .. }
```
Function expression forms:
```
    // IIFE
    (function(){ .. })(); 
    (function namedIIFE(){ .. })();

    // asynchronous IIFE
    (async function(){ .. })();
    (async function namedAIIFE(){ .. })();

    // arrow function expressions
    var f;
    f = () => 42;
    f = x => x * 2;
    f = (x) => x * 2;
    f = (x,y) => x * y;
    f = x => ({ x: x * 2 });
    f = x => { return x * 2; }; 
    f = async x => {
        var y = await doSomethingAsync(x);
        return y * 2;
     };
    someOperation( x => x * 2 );
    // ..
```
> **Arrow function expressions** are syntactically anonymous, meaning the syntax doesn’t provide a way to provide a direct name identifier for the function. 
`It's not a good idea to frequently use anonymous functions in your programs, the => arrow function form actually has a specific purpose (i.e., handling the **this** keyword lexically)`

- Functions can also be specified in class definitions and object literal definitions. They’re typically referred to as “methods” when in these forms, though in JS this term doesn’t have much observable difference over “function”:
```ruby
    class SomethingKindaGreat { 
        // class methods
        coolMethod() { .. }     // no commas!
        boringMethod() { .. }
    }

    var EntirelyDifferent = { 
        // object methods 
        coolMethod() { .. },     // commas!
        boringMethod() { .. },  
        
      
        // (anonymous) function expression property
        oldSchool: function() { .. } 
    };
```
***

**Coercive Conditional Comparison**

- **if** and ? :-ternary statements, as well as the test clauses in **while** and **for** loops, all perform an implicit value comparison. But what sort? Is it “strict” or “coercive”? Both, actually.
  
  ```ruby
    var x = 1;
    if (x) {
        // will run!
    }
    while (x) {
        // will run, once! 
        x = false;
    }
    //---------------------
    //You might think of these (x) conditional expressions like this:

    var x = 1;
    if (x == true) { 
        // will run!
    }
    while (x == true) {
        // will run, once! 
        x = false;
    }
    //---------------------
    //In this specific case – the value of x being 1 – that mental
    //model works, but it’s not accurate more broadly. 
    
    var x = "hello";
    if (x) {
       // will run!
    }
    if (x == true) { 
        // won't run 
    }
    //-----------------
    //Oops. So what is the if statement actually doing? This is the
    //more accurate mental model:
    var x = "hello";
    if (Boolean(x) == true) { 
        // will run
    }
    // which is the same as:
    if (Boolean(x) === true) { 
        // will run
    }
  ```

***

**Prototypal “Classes”**

- the Object.create(..) style of coding:
    ```ruby
        var Classroom = { 
            welcome() {
                console.log("Welcome, students!");
            }
        };
        var mathClass = Object.create(Classroom);

        mathClass.welcome();
        // Welcome, students!
    ```
    > mathClass object is linked via its prototype to a Classroom object. Through this linkage, the function call mathClass.welcome() is delegated to the method defined on Classroom.

- The **prototypal class** pattern would have labeled this delegation behavior “inheritance,” and alternatively have defined it (with the same behavior) as:
    ```ruby
        function Classroom() { 
            // ..
        }

        Classroom.prototype.welcome = function hello() { 
            console.log("Welcome, students!");
        };

        var mathClass = new Classroom(); // new ..

        mathClass.welcome();
        // Welcome, students!
    ```
>All **functions** by default reference an empty **object** at a property named prototype.

- This “prototypal class” pattern is now strongly discouraged, in favor of using ES6’s class mechanism:
  ```ruby
  class Classroom { 
      constructor() {
             // ..
         }

     welcome() {
            console.log("Welcome, students!");
        } 
    }

    var mathClass = new Classroom(); 

    mathClass.welcome();
    // Welcome, students!
  ```
  >the same prototype linkage is wired up, but this class syntax fits the class-oriented design pattern much more cleanly than “prototypal classes”.



_The End_
