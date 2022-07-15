## Angular Testing Masterclass
> Udemy - Vasco Cavalheiro




**Section 1: Development Enviroment Setup**

- **Jasmine Framework**
  - Jasmine is a behavior-driven development framework for testing JavaScript code. 
  - It does not depend on any other JavaScript frameworks. 
  - It does not require a DOM. 
  - It has a clean, obvious syntax so that you can easily write tests.
  - The tests are known as specifications or specs, and they are gouped in test suites.
  - It can produce test reports.
  > .spec.ts - spec extension is essential for the Angular CLI to be able to compile the tests and add the types necessary to write them.

- **Test suite Skeleton**

```ruby
    describe("A suite is just a function", function() {
    var a;

    // specification
    it("and so is a spec", function() {
        a = true;

        expect(a).toBe(true);
    });
    });
```
- **describe( )**
  - The describe function is for grouping related specs, typically each test file has one at the top level. 
  - The string parameter is for naming the collection of specs, and will be concatenated with specs to make a spec's full name.
    ```ruby
        describe("A suite", function() {      

            // ... spec

        }); 

    ```  

 - **Especifications**  
    - Specs are defined by calling the global Jasmine function **it( )**, which, like describe takes a string and a function. 
    - The string is the title of the spec and the function is the spec, or test.
    - A group of specifications is called a test suite.
     - A specification(spec) is simply a functional test.
     - The **it()** function define a specification.
    ```ruby

        describe('CalculatorService', () => {          

         
            it('should add two numbers', () => {

                // ... expects
                
            });


            it('should subtract two numbers', () => {

                 // ... expects

            });

        });
    ```
- **Expectations**
    - Expectations are built with the function **expect( )** which takes a value, called the actual. 
    - It is chained with a Matcher function, which takes the expected value. 
        ```ruby
            it("and has a positive case", function() {
                expect(true).toBe(true);
            });
        ```
- **Matchers**
    - Each matcher implements a boolean comparison between the actual value and the expected value.
    - It is responsible for reporting to Jasmine if the expectation is true or false.
    - Jasmine will then pass or fail the spec.
  
       > Any matcher can evaluate to a negative assertion by chaining the call to expect with a **not** before calling the **matcher**.
        ```ruby
          expect(something).not.toBe(true);
        ```

- **Spies**
    - A spy can stub any function and tracks calls to it and all arguments.
    - A spy only exists in the **describe** or **it** block in which it is defined, and will be removed after each spec. 
    - There are special matchers for interacting with spies. 
    - The **toHaveBeenCalled** matcher will pass if the spy was called.
         `expect(foo.setBar).toHaveBeenCalled();` 
    - The **toHaveBeenCalledTimes** matcher will pass if the spy was called the specified number of times. ` expect(foo.setBar).toHaveBeenCalledTimes(2);`
    - The **toHaveBeenCalledWith** matcher will return true if the argument list matches any of the recorded calls to the spy. `expect(foo.setBar).toHaveBeenCalledWith(456, 'another param');`
   


> - Jasmine provides the global **beforeEach( )**, **afterEach( )**, **beforeAll( )**, and **afterAll( )** functions.
> - The **this** keyword is used to share variables between a **beforeEach**, **it**, and **afterEach** is through the **this** keyword.
> - Suites can be disabled with the **xdescribe** function. 


***

**Section 2: Angular Service Testing**
***
**Section 3: Angular Component Testing**
***
**Section 4: Asynchronous Angular Testing**
***
**Section 5: Angular E2E Testing with Cypress**
***
**Section 6: Preparing an Angular Aplication for Continuos Integration (CI)**


_The End_
