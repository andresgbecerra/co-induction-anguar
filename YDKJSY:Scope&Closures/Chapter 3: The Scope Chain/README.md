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

***

**Function Name Scope**

***

**Arrow Functions**

***

**Backing Out**

***
