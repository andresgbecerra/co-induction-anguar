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

[Back](#content)

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

        // printing string - return letter
        fmt.Println("T")         // T
        // printing character - return bytes
        fmt.Println('T')         // 84
        fmt.Println(string('T')) // T
    
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


[Back](#content)

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
    - The expression need not be surrounded by parentheses ( ) but the braces { } are required.
    - The if statement can start with a short statement to execute before the condition.
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

        func pow(x, n, lim float64) float64 {
            if v := math.Pow(x, n); v < lim { // the value of the variable can be assigned in the if statement
                return v
            } else {
                fmt.Printf("%g >= %g\n", v, lim)
            }
            // can't use v here, throw an Error
            // this scope can not instantiate v
            return lim
        }

        func main() {
            fmt.Println(sqrt(2), sqrt(-4))
            fmt.Println(pow(3, 2, 10))
        }
    ```

  - **Switch Statement**
    - A switch statement is a shorter way to write a sequence of if - else statements. 
    - It runs the first case whose value is equal to the condition expression.

  ```go
  package main

    import (
        "fmt"
        "runtime"
    )

    func main() {

        ///////////////////

        fmt.Print("Go runs on ")

        switch os := runtime.GOOS; os {
        case "darwin":
            fmt.Println("OS X.")
        case "linux":
            fmt.Println("Linux.")
        default:
            // freebsd, openbsd,
            // plan9, windows...
            fmt.Printf("%s.\n", os)
        }
        ///////////////////
        // Note that you can use multiple arguments 
        // in your case statement separated by a comma.
         var city string

        switch city {
        case "Des Moines":
            fmt.Println("You live in Iowa")
        case "Minneapolis,", "St Paul":  // -
            fmt.Println("You live in Minnesota")
        case "Madison":
            fmt.Println("You live in Wisconsin")
        default:
            fmt.Println("You're not from around here.")
        }
        ///////////////////
        // no switch expression
        switch { // -
        case i > 10: fmt.Println("Greater than 10")
        case i < 10: fmt.Println("Less than 10")
        default: fmt.Println("Is 10")
        }
        /////////////////
        // Add a fallthrough keyword automatically
        // continue running the switch statement
        switch {
        case i != 10:
            fmt.Println("Does not equal 10")
            fallthrough // continue to next case
        case i < 10: fmt.Println("Less than 10")
        case i > 10: fmt.Println("Greater than 10")
        default: fmt.Println("Is 10")
        }
    }

  ```


- **FOR Loops**
  - It is similar to JavaScript FOR loop
  - The basic for loop has three components separated by semicolons:
    - the init statement: executed before the first iteration
    - the condition expression: evaluated before every iteration
    - the post statement: executed at the end of every iteration
    ```go
    package main

        import "fmt"

        func main() {
            sum := 0
            for i := 0; i < 10; i++ {
                sum += i // sum = sum + i
            }
            fmt.Println(sum) // 45

            ////////////////////
            // The init and post statements are optional.
            sum := 1
            for ; sum < 10; { // -
                sum += sum
            }
            fmt.Println(sum)
            //////////////////
            // This will behave like a while loop
            sum := 1
            for sum < 10 { // you can drop the semicolons
                sum += sum
            }
            fmt.Println(sum)
            ////////////////
            // using range
            var mySentence = "This is a sentence"

            for index, letter := range mySentence { // -
                fmt.Println("Index:", index, "Letter:", letter) // Index: 0 Letter: 84 ...
                fmt.Println("Index:", index, "Letter:", string(letter)) // Index: 0 Letter: T ...
            }


        }
    ```

> The loop that does not exist is the `do while`


[Back](#content)

***


# Complex Structures


- **Functions**
  - A function is a group of statements that exist within a program for the purpose of performing a specific task.
  - At a high level, a function takes an input and returns an output.
  ```go
  package main

    import "fmt"

    // SimpleFunction prints a message
    func SimpleFunction() {
        fmt.Println("Hello World")
    }
    //////////////
    // you can omit the type from all but the last.
    func add(x, y int) int {
	return x + y
    }   
    //////////////
    // A function can return any number of results.
    func printAge(age int) (ageOfSally int, ageOfBob int) {
        ageOfBob = 21
        ageOfSally = 35
        return
    }

    func main() {
        SimpleFunction()
        fmt.Println(printAge())
    }
  ```


- **Variadic functions** are just like other functions. 
  - The only difference is its parameter defined in a way that it allows for an unknown number of arguments to be passed when calling the function.
  - To declare a variadic function, the type of the final parameter is preceded by an ellipsis `...`
    ```go
    package main

    import "fmt"

    func main() {
        variadicExample("red", "blue", "green", "yellow")
    }

    func variadicExample(s ...string) { // -
        fmt.Println(s[0])
        fmt.Println(s[3])
    }
    ```

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


- **Arrays**
    - An array is a data structure that consists of a collection of elements of a single type or simply you can say a special variable, which can hold more than one value at a time. 
    - The values an array holds are called its elements or items. 
    - An array holds a specific number of elements, and it cannot grow or shrink. 
    ```go
    package main

    import (
        "fmt"
        "reflect"
    )

    func main() {
        // Initialize an empty array
        var intArray [5]int
        var strArray [5]string

        fmt.Println(reflect.ValueOf(intArray).Kind()) // array
        fmt.Println(reflect.ValueOf(strArray).Kind()) // array
     
        /////////////////
        // You can initialize an array with pre-defined values using an array literal. 
        var score [5]float64 = [5]float64{9, 1.5, 22, 7, 3.6}  // Defining Values
        x := [5]int{10, 20, 30, 40, 50}   // Intialized with values
        var y [5]int = [5]int{10, 20, 30} // Partial assignment
        scores := [...]float64{9, 3, 6.4, 2, 6}

        fmt.Println(x)  //  [10 20 30 40 50]
        fmt.Println(y)  //  [10 20 30 0 0]
    }
    ```


- **Make**
  - Slices: Segments of an underlying array
  - (+ Make): Must be associated with a space in memory
  - Make: Initializes and allocates space in memory for `slice`, `map`, or `channel`.
  - Slices can be created with the built-in `make` function; 
  - This is how you create dynamically-sized arrays.
  - The `make` function allocates a zeroed array and returns a slice that refers to that array:
    ```go
        // make(type, initial length, maximum capacity)
        a := make([]int, 5)  // len(a)=5 -> [0 0 0 0 0]

        // To specify a capacity, pass a third argument to make:
        b := make([]int, 0, 5) // len(b)=0, cap(b)=5

        b = b[:cap(b)] // len(b)=5, cap(b)=5
        b = b[1:]      // len(b)=4, cap(b)=4
    ```
> **Make()** is necessary because, as seen with Arrays, Go is anticipating the need to set aside a specific length of memory for a variable being created. Since `slice` and `map` allow you to define a variable _without_ a set length, `make` helps Go establish where this variable will live and how to access it.


- **Slice**
  - `An array has a fixed size.` A slice, on the other hand, is a dynamically-sized, flexible view into the elements of an array.
  - In practice, slices are much more common than arrays.
  - Managing collections of data with slices and adding and removing elements from a slice.
  - A slice is formed by specifying two indices, a `low` and `high` bound, separated by a colon:
  - `a[low : high]`
    ```go
    package main

    import "fmt"

    func main() {
        primes := [6]int{2, 3, 5, 7, 11, 13}

        var s []int = primes[1:4]
        fmt.Println(s) // [3 5 7]

        ////////////////
        
        fruitArray := [5]string{"banana", "pear", "apple", "kumquat", "peach"}
        fmt.Println(fruitArray[3:])     // [kumquat peach]
        fmt.Println(fruitArray[:3])     // [banana pear apple]

    }
    ```
- `fruitArray[3:]` ==> Everything after (and including) index 3
- `fruitArray[:3]` ==> Everything up to (but not including) index 3

- Slices are like **references** to arrays
- A slice does not store any data, it just describes a section of an underlying array. 

  ```go
  /////////////////////
  // Slices are like references to arrays
  package main

    import "fmt"

    func main() {
        names := [4]string{
            "John",
            "Paul",
            "George",
            "Ringo",
        }
        fmt.Println(names) // [John Paul George Ringo]

        a := names[0:2]
        b := names[1:3]
        fmt.Println(a, b) // [John Paul] [Paul George]

        b[0] = "XXX" // -
        fmt.Println(a, b)       //[John XXX] [XXX George]
        fmt.Println(names)      //[John XXX George Ringo]

    }
  ```
- **append:** To add an item to the end of the slice, use the `append()` method
  ```go
    package main

    import "fmt"

    func main() {

    slice1 := []int{1, 2, 3}
    slice2 := append(slice1, 4, 5)// -

    fmt.Println(slice1, slice2)                 // [1 2 3] [1 2 3 4 5]
    fmt.Println(len(slice1), cap(slice1))       // 3 3
    fmt.Println(len(slice2), cap(slice2))       // 5 6 - the capacity is 6 because it doubles the capacity of the first array
        
    }
  ```

- `len()` (Length) This indicates the longest this slice can be.
- `cap()` (Capacity) This gets the maximum capacity that the slice can be.


> Nil slices: The zero value of a slice is nil.

```go
    func main() {
        var s []int
        fmt.Println(s, len(s), cap(s))
        if s == nil {
            fmt.Println("nil!")
        }
    }
```


- **Maps**
  - Similar to _Object_ in JavaScript
  - A map is a data structure that provides you with an unordered collection of key/value pairs
  - The strength of a map is its ability to retrieve data quickly based on the key. 
  - A key works like an index, pointing to the value you associate with that key.
  ```go
  //////////////
  // map[Key]Value - map[string]int - {"Mark": 10}
  package main
 
    import "fmt"
    
    var employee = map[string]int{"Mark": 10, "Sandy": 20}
    
    func main() {
      fmt.Println(employee)
      //////////////
      var userEmails map[int]string = make(map[int]string)
      userEmails[1] = "user1@gmail.com" // {1: "user1@gmail.com"}
      userEmails[2] = "user2@gmail.com" // {2: "user2@gmail.com"}

      fmt.Println(userEmails) // map[1:user1@gmail.com 2:user2@gmail.com]

      //////////
      m := make(map[string]int)

      m["Answer"] = 42
      fmt.Println("The value:", m["Answer"])  // The value: 42

      m["Answer"] = 48
      fmt.Println("The value:", m["Answer"])  // The value: 48

      delete(m, "Answer") // delete method
      fmt.Println("The value:", m["Answer"])  // The value: 0

      v, ok := m["Answer"]
      fmt.Println("The value:", v, "Present?", ok)    // The value: 0 Present? false
    }
  ```


[Back](#content)

***


# Go Toolkit

|  Commands  | Description |
| ---------- | ----------- |
| `go doc` |  will give you access to local help docs |
| `go run <file name>` | to compile and run our program |
| `go build` and `go install` | to compile all of your go packages and dependencies and put the executable in the current directory (when run without any flags). |
| `go install` | also put the compiled dependencies into the `pkg` directory within your go workspace. |
| `go build` | lets you build an executable file locally, which lets you test your application without having to deploy it immediately. |
| `go fmt` |  will reformat your code based on Go standards. This is often run as a linter, (like on save of a file). |
| `go list` | will list all of the packages in that current directory. |
| `go vet` | runs through your source code and yells about any weird constructs |
| `go get` | to install an external package, in Go you need to specify the location of where that executable lives. i.e, if we want to use the `golint` package, we would install it like so: `go get -u golang.org/x/lint/golint` |

 
- **go lint**
  - Go lint is concerned with style mistakes and maintaining a consistent coding style that is miantained at Google.
  - Install `golint` using the command above.
  - To find out where the library was put, run `go list -f {{.Target}} golang.org/x/lint/golint`
  - For `golint` to be used globally, make sure the path you see from the above command is included in your `$PATH` variable.
  

- **Packages**
  - Packages are directories with one or more Go source files that allow Go to reuse code across a program and across files.
  - Every Go file must belong to a package.
  - So far, the packages we've seen are `main`, the package we wrote, and `fmt` and `reflect`, which are built into the Go source code. 
  - [See more packages](https://golang.org/pkg/).
  - To import packages, you list them at the top of your file either like this:

    ```go
    import "fmt"
    import "math"
    import "reflect"
    //////////
    // or
    import (
        "fmt"
        "math"
        "reflect"
    )
    ```
  - Some of the packages that ship with Go are:
    - `strings` - simple functions to manipulate strings
      - Methods: `Contains`, `Count`, `Index`, `HasPrefix`
  
    - `math` - mathematical operations
      -  `Pow`, `Abs`, `Ceil`, `Floor` ...
  
    - `isNaN`, `NaN`
    
    - `io` - handles input/output methods related to the `os` package (like reading files)
      - Methods: `Copy`, `Reader`, `Writer`

    - `os` - methods around operating system functionality
      - Methods: `Open`, `Rename`, `CreateFile`

    - `testing` - Go's build in test suite
      - Methods: `Skip`, `Run`, `Error`
    
    - `net/http` - provides http client and server implementations
      - Methods: `Get`, `Post`, `Handle`



- **Exported vs Unexported Names**
  - When you import a package, you can only access that package's public, exported names. 
  - These must start with a **capital letter**.
  - Anything that starts with a **lowercase** letter is a **private** method and will NOT be exported. 
  - These are only visible within the same package.

    ```go
    fmt.Println()
    ```
  > Within the `fmt` package, the function `Println` is exported (starts with a capital letter) and therefore can be accessed within our `main` package.
  

- **Custom Packages**
  - To demonstrate how packages work, let's create a folder called `utils`, and within that create a file called `math.go` where we will add a few small functions.
  - In `math.go` add the following:

    ```go
    package utils

    import "fmt"

    func printNum(num int) {
        fmt.Println("Current Number: ", num)
    }

    func Add(nums ...int) int {
        total := 0
        for _, v := range nums {
            printNum(v)
            total += v
        }
        return total
    }
    ```

  - And then in our `main.go` file, lets import and use this package.
  - Note that the import name is a path that is relative to the `src` directory.
  - Also note that the file name itself isn't necessary as long as that file lives within the package directory and has its package declaration at the top of the file.

    ```go
    import {
    "fmt"
    "path/from/src/to/utils" // => ie: myproject/utils
    }

    func calculateImportantData() int {
        totalValue := utils.Add(1, 2, 3, 4, 5) // -
        return totalValue
    }

    func main() {
        total := calculateImportantData()
        fmt.Println(total)
    }
    ```

- **Testing**
  - Go includes a package, `testing`, that contains all the functions necessary to run a test suite and command to run those tests, `go test`.
  - Test file names must end with `_test.go` and the Go compiler will know to ignore these unless `go test` is run.
  - The test files need to be in the same package as the method they are testing.
  - The test name should start with `Test` followed by the name of the function you are testing.
  - The only parameter passed into the test should be `t *testing.T`.

    ```go
    // average_test.go

    package utils

    import "testing"

    // The test should always accept the same argument, t, of type *testing.T)
    func TestAverage(t *testing.T) {
    // the value you expect to get from the tested function
    expected := 4
    actual := utils.average(1, 2, 3)
    if actual != expected {
        t.Errorf("Average was incorrect! Expected: %d, Actual: %d", expected, actual)
    }
    }
    ```

 > To run tests, use the command `go test` from within the directory where the test file lives.



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