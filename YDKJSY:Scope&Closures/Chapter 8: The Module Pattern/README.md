## You Don’t Know JS Yet: Scope & Closures


### Chapter 8: The Module Pattern

***

  **Encapsulation and Least Exposure (POLE)**

***

  **What Is a Module?**
  - A module is a collection of related data and functions (often referred to as methods in this context), characterized by a division between hidden private details and public accessible details, usually called the “public API.”

***

  **Node CommonJS Modules**

  - CommonJS modules are file-based; one module per file.
  - CommonJS modules behave as singleton instances, similar to the IIFE module definition style presented before.
  - No matter how many times you require(..) the same module, you just get additional references to the single shared module instance.
  - require(..) is an all-or-nothing mechanism; it includes a reference of the entire exposed public API of the module. 
  - To effectively access only part of the API, the typical approach looks like this:
    ```ruby
      var getName = require("/path/to/student.js").getName; 

      // or alternately:

      var { getName } = require("/path/to/student.js");
    ```
>Similar to the classic module format, the publicly exported methods of a CommonJS module’s API hold closures over the internal module details. That’s how the module singleton state is maintained across the lifetime of your program.
***

  **Modern ESModules(ESM)**

  - A module is a collection of related data and functions (often referred to as methods in this context), characterized by a division between hidden private details and public accessible details, usually called the “public API.”
  - Instead of module.exports in **CommonJS**, **ESM** uses an export keyword to expose something on the public API of the module.
  - The **import** keyword replaces the **require(..)** statement.
  - Let’s adjust “students.js” to use the ESM format:
    ```ruby

    // The only change here is the export getName statement.

       export getName;

      // ************************

      var records = [
          { id: 14, name: "Kyle", grade: 86 },
          { id: 73, name: "Suzy", grade: 87 },
          { id: 112, name: "Frank", grade: 75 },
          { id: 6, name: "Sarah", grade: 91 }
      ];


      function getName(studentID) {

        var student = records.find(
              student => student.id == studentID
            );
      return student.name; }
    ```
  - ESM offers a fair bit of variation on how the export statements can be specified. For example:
    ```ruby
          export function getName(studentID) {
                // ..
            }
    ```
- Another allowed variation:
  ```ruby
      export default function getName(studentID) { 
        // ..
      }
  ```
  - This is a so-called “default export,” which has different semantics from other exports. In essence, a “default export” is a shorthand for consumers of the module when they import, giving them a terser syntax when they only need this single default API member.
 `Non-default exports are referred to as “named exports.”`

- If getName is a “default export” of the module, we can import
it like this:
  ```ruby
    import getName from "/path/to/students.js";

    getName(73);   // Suzy

  ```

- Multiple API members can be listed inside the { .. } set, separated with commas. 
- A named import can also be renamed with the as keyword:
  ```ruby
    import { getName as getStudentName } from "/path/to/students.js";

    getStudentName(73); // Suzy
  ```
- The other major variation on import is called **“namespace import”**:
```ruby
    import * as Student from "/path/to/students.js"; 

    Student.getName(73); // Suzy
```
- The * imports everything exported to the API, default and named, and stores it all under the single namespace identifier as specified.
***

  **Exit Scope**
  - Whether you use the classic module format (browser or Node), CommonJS format (in Node), or ESM format (browser or Node), modules are one of the most effective ways to structure and organize your program’s functionality and data.

_The End_
