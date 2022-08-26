## GO for JavaScript Developers 
> Frontend Masters: Brenna Martenson

***

### Content

- [Introduction](#introduction)
- [Printing](#printing)
- [Basic Go Syntax](#basic-go-syntax)
- [Complex Structures](#complex-structures)
- [Go Toolkit](#go-toolkit)
- [Struts](#struts)
- [Pointers](#pointers)
- [Error Handling](#error-handling)
- [Methods](#methods)
- [Interfaces](#interfaces)
- [Web Servers](#web-servers)
- [Hitting an External API](#hitting-an-external-api)
- [Concurrency](#concurrency)

***


# Introduction

- **GO vs JS**
  
    |   | GO | JavaScript |
    | - | -- | ---------- |
    | _TYPING_ | Strongly | Dynamically |
    | _STRUCTURES_ | Structs, Pointers, Methods, Interfaces | ES6 Classes |
    | _ERROR HANDLING_ | Explicit | Built in |
    | _MULTI-TASK_ | Multi-Threaded | Single-Threaded |
    | _OPINIONATED-NESS_ | Strong Opinions | Fluid Opinions |

- **Anatomy of a GO file**
  - Every GO program needs at least a **package main**, this package is going to encompass whatever files live in the same folder, and allows us access to some of the variables and functions that only are associated with this main package.
  - The following line will be any **import** statement for any additional libraries.
  - And the actual **main function**, every go program needs both a package main and the main function, the main function is the entry point of the program, where GO starts executing the code and fires off whatever else happens in our program.
  - Running: to excecute this program, we are going to use the following command - `go run <file name>.go`
    ```go
        package main

        import "fmt"

        func main() {
            fmt.Println("Hello World!")
        }
    ```

***


# Printing

- **The fmt package**
  - Here are the most common variadic functions which are available in the package:
    - Print, Printf & Println
    - Fprint, Fprintf & Fprintln
    - Fscan, Fscanf & Fscanln
    - Sprint, Sprintf & Sprintln
    - Sscan, Sscanf & Sscanln
  - All functions starting with **F** writes or reads the string to or from the stream provided as its argument. The argument must implement io.Writer or io.Reader interface depending on the use case.
  - All functions which start with **S** returns the string it created using the format specifiers. It doesn’t print items automatically.
  - The functions which end with **ln** such as Fprintln or Fscanln adds a newline.
  - The functions with an **f** at the ends support formatting.
```go
    package main
    
    import (
        "fmt"
        "os"
    )
    
    func main() {
    
        v := 42
    
        // Spaces are to be added manually
        fmt.Print("This", "is", "a", 42, "string\n")        // Thisisa42string  
        
        fmt.Println("Another", "string")                    // Another string
        
        fmt.Printf("The value is %d\n", v)                  // The value is 42  
        
        // formatting support
        
        s := "formatted"
        
        // Spaces are to be added manually
        // os.Stdout is an io.Writer
        fmt.Fprint(os.Stdout, "Yet", "another", "string\n") // Yetanotherstring
        fmt.Fprintln(os.Stdout, "A", "string")              // A string
        fmt.Fprintf(os.Stdout, "A %s string\n", s)          // A formatted string
    }
```
> **Variadic functions** are just like other functions. The only difference is its parameter defined in a way that it allows for an unknown number of arguments to be passed when calling the function.

- The scan functions are used to take values from the standard input.
  ```go
        package main
        
        import (
            "fmt"
        )
        
        func main() {
            var a, b int
        
            // use address-of operator to get the values into the variable
            fmt.Scan(&a, &b)
        
            // print the values taken
            fmt.Println(a, b)
        }
  ```
- The stringer interface in fmt package
    - The stringer interface implementor can simply be passed to a print function as an argument and it will print in the way it is defined.
    ```go
        package main
        
        import (
            "fmt"
        )
        
        // define a struct
        type Book struct{
            Name string
            Author string
        }
        
        // implement the stringer interface by
        // implementing the String() string function
        func (b Book)String() string {
            return fmt.Sprintf("%s was written by %s\n", b.Name, b.Author)
        }
        
        func main() {
            b := Book{
                "1981",
                "Andres",
            }
            
            // pass as argument directly
            fmt.Println(b)                // 1981 was written by Andres
        }
    ```
- **Documentation**
  - To get the GO documentation from the CLI, execute the following command - `go doc fmt` this command gets the information about fmt package, but if we are going to get specific information for instance Println function, we can run `go doc fmt.Println`
***


# Basic Go Syntax

- **Type**
    | Name  | Type Name | Example |
    | ----- | --------- | ------- |
    | _INTEGER_ | int int8 int16 int32 int64 uint uin8 uint26 uint32 uint64 | 1 2 44 770 ... var age int = 21 |
    | _FLOAT_ | float32 float64 | 1.5 3.4 2100 ... var gpa float64 = 4.1 |
    | _STRING_ | string | "Andres" ... var address string = "Cll 45" |
    | _BOOLEAN_ | bool && \| \|  ! < <=  > >= == != | true false ... var isHide bool = true |

- The **reflect** package allows us to change or modify the object or any variable at the dynamic. In more technical words, it allows us to manipulate the value of objects dynamically. 
- Reflection is the way a programming language can check the type of values at runtime. 
  ```go
  package main
 
        import (
            "fmt"
            "reflect"
        )
        
        type Person struct{
            Name string
            Age int
        }
        
        func main() {
            p := Person{"Andres", 22}
            fmt.Println(reflect.TypeOf(p))      // main.Person

            fmt.Println(reflect.TypeOf("Andres"))  // string
            
            var x = 10
            fmt.Println(reflect.TypeOf(float64(x) * 5.5))  // float64

        }
  ```


- **Variables**
    - The ***var*** keyword is used to declare a variable.
    ```go
        package main
        
        import "fmt"
        
        func main() {
                var name = "Andres"               // no type declaration
                var username string = "Andres123" // type declaration
                var numberOfPosts int             // no initialization
                fmt.Println(numberOfPosts)        // prints 0
        }
    ```
    - Initialization shorthand enables us to initialize variables in a concise manner. Which means we can initialize without using var and declaring datatype of that variable.
    - Inside a function, the := short assignment statement can be used in place of a var declaration with implicit type.
    ```go
        package main
        
        import "fmt"
        
        func main() {
                name := "Andres"  // notice the colon equal syntax
        }
    ```


- **Control Structures**
  - **IF Statement:**
    - the if statement can start with a short statement to execute before the condition.
    - Variables declared by the statement are only in scope until the end of the if.
    ```go
        package main

        import (
            "fmt"
            "math"
        )

        func sqrt(x float64) string {
            if x < 0 {
                return sqrt(-x) + "i"
            }
            return fmt.Sprint(math.Sqrt(x))
        }

        func main() {
            fmt.Println(sqrt(2), sqrt(-4))
        }
    ```





[Back](#content)

***


# Complex Structures

[Back](#content)
***


# Go Toolkit

[Back](#content)
***


# Struts


[Back](#content)

***


# Pointers


[Back](#content)

***


# Error Handling


[Back](#content)

***


# Methods


[Back](#content)

***


# Interfaces


[Back](#content)

***


# Web Servers


[Back](#content)

***


# Hitting an External API


[Back](#content)

***


# Concurrency

[Back](#content)


_The End_