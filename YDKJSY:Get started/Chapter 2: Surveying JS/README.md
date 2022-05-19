## You Don’t Know JS Yet: Get Started 

### Chapter 2: Surveying JS?
> The best way to learn JS is to start writing JS.Gracias y paciencia
***
>
**Each File is a Program**

> In JS, each standalone file is its own separate program.
- The only way multiple standalone .js files act as a single program is by sharing their state (and access to their public functionality) via the “global scope.” They mix together in this global scope namespace, so at runtime they act as as whole.
- ES6, JS has also supported a module format in addition to the typical standalone JS program format.`A module is a collection of state and publicly exposed methods to operate on that state as a standalone program, JS does in fact still treat each module separately. `
_Regardless of which code organization pattern (and loading mechanism) is used for a file (standalone or module), you should still think of each file as its own (mini) program, which may then cooperate with other (mini) programs to perform the functions of your overall application._

***

**Values**

> Values are data
- Values come in two forms in JS: **primitive** and **object**.
  
**Primitives**
  1. **strings** are ordered collections of characters, usually used to represent words and sentences.
  ```
  const name = "Andres";
  const lastName = 'Becerra';
  const fullName = `${name} ${lastName}`; // interpolation
  ```
  2. **numbers**
  3. **boolean**
  4. **null** & **undefined**
   In the most part both values serve the purpose of indicating emptiness (or absence) of a value.
     > It’s safest and best to use only _undefined_ as the single empty value, instead of null value.
  6. **symbol** is immutable and unique, once you create a symbol, its value is kept private and for internal use.`Every time you invoke Symbol() we get a new and unique symbol, guaranteed to be different from all other symbols.`

**Arrays and Objects**

Other value type in JS is an **Object** value and **Arrays** are a special type of object that’s comprised of an ordered and numerically indexed list of data.

Objects are more general: an unordered, keyed collection of any various values. In other words, you access the element by a string location name (aka “key” or “property”) rather than by its numeric position (as with arrays). 

```
// Object
name = {
    first: "Andres",
    last: "Simpson",
    age: 39,
    specialties: [ "JS", "Table Tennis" ]
};
// Array
names = [ "Frank", "Andres", "Peter", "Susan" ];
```
> Converting from one value type to another, such as from string to number, is referred to in JS as “coercion.”
***

**Declaring and Using Variables**

> Think of variables as just containers for values.

- Variables have to be declared (created) to be used.
- The **let** keyword has some differences to **var**, with the most obvious being that **let** allows a more limited access to the variable than **var**. This is called “block scoping” as opposed to regular or function scoping.
  ```
    var adult = true;
    if (adult) {
    var name = "Andres";
    let age = 39;
    console.log("Shhh, this is a secret!");
    }
    console.log(name);
    // Andres
    console.log(age);
    // Error!
   ```
- A third declaration form is **const**. It’s like let but has an additional limitation that it must be given a value at the moment it’s declared, and cannot be re-assigned a different value later. `The safest and best way to use const is only with primitives values instead Objects and Arrays.`

***

**Functions**

In JS, we should consider “function” to take the broader meaning of another related term: “procedure.” A procedure is a collection of statements that can be invoked one or more times, may be provided some inputs, and may give back one or more outputs.
- Funtion Declaration Statement:
    ```
        function awesomeFunction(coolThings) { 
            //...
            return amazingStuff; 
        }
    ```
- Function Expression
  ```
    // let awesomeFunction = ..
    // const awesomeFunction = ..
    var awesomeFunction = function(coolThings) {
    // ..
    return amazingStuff;
     };

  ```
> It’s extremely important to note that in JS, functions are values that can be assigned (as shown in this snippet) and passed around. Functions are a special type of the **object** value type.
- JS functions can receive parameter input:
  ```
   function greeting(myName) { 
       console.log(`Hello, ${ myName }!`);
   }
   greeting("Andres");   // Hello, Andres!
  ```
- Functions also can return values using the return keyword:
  ```
   function greeting(myName) { 
       return `Hello, ${ myName }!`;
    }
    var msg = greeting("Andres");
    console.log(msg);   // Hello, Andres!
  ```
> You can only return a single value, but if you have more values to return, you can wrap them up into a single object/array.

***

**Comparisons**

- ===’s equality comparison is often described is, “checking both the value and the type”.`All value comparisons in JS consider the type of the values being compared, not just the === operator.`
- === disallows any sort of type conversion (aka, “coercion”) in its comparison.

_Primitives:_
```
    3 === 3.0;        // true
    "yes" === "yes";  // true
    null === null;    // true  
    false === false;  // true

    42 === "42";          // false
    "hello" === "Hello";  // false
    true === 1;           // false
    0 === null;           // false
    "" === null;          // false
    null === undefined;   // false
```
> For NaN comparisons, use the Number.isNaN(..) utility.
> You could think of Object.is(..) as the “quadruple-equals” ====, the really- really-strict comparison instead of === that is not actually strictly exactly equal comparison, in the strictest sense.

_Objects & Arrays:_
```
    [1,2,3]===[1,2,3];       //false
    { a: 42 } === { a: 42 } // false
    (x=>x*2)===(x=>x*2)    //false
```
- In JS, all object values are held by **reference**, are assigned and passed by reference-copy.
- JS does not define === as structural equality for **object** values. Instead, === uses identity equality for **object** values.
> JS does not provide a mechanism for structural equality comparison of object values, only reference identity compar- ison. To do structural equality comparison, you’ll need to implement the checks yourself.

**Coercive Comparisons**

> Coercion means a value of one type being converted to its respective representation in another type.
- The == operator performs an equality comparison similarly to how the === performs it. In fact, both operators consider **the type of the values** being compared.
- If the comparison is between the same value type, both == and === **do exactly the same thing**, no difference whatsoever.
- If the value types being compared are different, the == differs from === in that it allows **coercion** before the comparison.

> == allows type conversions first, and once the types have been converted to be the same on both sides, then == does the same thing as ===. Instead of “loose equality,” the == operator should be described as “coercive equality.”
```
    42 == "42"; // true 
    1 == true; // true
```
In both comparisons, the value types are different, so the == causes the non-number values ("42" and true) to be converted to numbers (42 and 1, respectively) before the comparisons are made.
`== that it prefers primitive and numeric comparisons`
The comparison operators like <, > (and even <= and >=) just like ==, these operators will perform as if they’re “strict” if the types being relationally compared already match, they’ll allow **coercion** first (generally, to numbers) if the types differ.
> These relational operators typically use numeric comparisons, except in the case where both values being compared are already strings; in this case, they use alphabetical comparison of the strings

***

**How We Organize in JS**

Two major patterns for organizing code (data and behavior) are used broadly across the JS ecosystem: classes and modules.

- **Classes**
  - A class in a program is a definition of a “type” of custom data structure that includes both data and behaviors that operate on that data.
  - Classes define how such a data structure works, but classes are not themselves concrete values. To get a concrete value that you can use in the program, a class must be instantiated (with the new keyword) one or more times.


***

**The Rabbit Hole Deepen**

***
