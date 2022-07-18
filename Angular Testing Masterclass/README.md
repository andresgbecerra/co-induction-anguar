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
    - A spy only exists in the **describe( )** or **it( )** block in which it is defined, and will be removed after each spec. 
    - There are special matchers for interacting with spies. 
    - The **toHaveBeenCalled( )** matcher will pass if the spy was called.
         `expect(foo.setBar).toHaveBeenCalled();` 
    - The **toHaveBeenCalledTimes( )** matcher will pass if the spy was called the specified number of times. ` expect(foo.setBar).toHaveBeenCalledTimes(2);`
    - The **toHaveBeenCalledWith( )** matcher will return true if the argument list matches any of the recorded calls to the spy. `expect(foo.setBar).toHaveBeenCalledWith(456, 'another param');`
   


> - Jasmine provides the global **beforeEach( )**, **afterEach( )**, **beforeAll( )**, and **afterAll( )** functions.
> - The **this** keyword is used to share variables between a **beforeEach**, **it**, and **afterEach** is through the **this** keyword.
> - Suites can be disabled with the **xdescribe** function. 
> - **pending()** specs do not run, but their names will show up in the results as pending.
> - Any spec declared with **xit** is marked as pending.


***

**Section 2: Angular Service Testing**

- Basic Implementation
    ```ruby
        // Example 1
        it('should add two numbers', () => {

                // preparing component or service that we want to test
            const calculator = new CalculatorService(new LoggerService());

            // execution phase: trigger the operation
            const result = calculator.add(2, 2);

            // test assertions: fail or successful
            expect(result).toBe(4);           

            });
    ```
- Implementing Jasmine Spy
  > Spy can keep track of the number of time that function is called.
  ```ruby
   // Example 2
     it('should add two numbers', () => {

       const logger = new LoggerService();
       
       // Jasmine can overwrite the log() method on LoggerService
       spyOn(logger, 'log'); 
        
       const calculator = new CalculatorService(logger);

        const result = calculator.add(2, 2);

        expect(result).toBe(4);

        // Jasmine checks how many times the method has been called up
        expect(logger.log).toHaveBeenCalledTimes(1);

    });
  ```
- Fake Implementation
   > It can create a complete mock implementation of our dependency.
     ```ruby
      // Example 3
          it('should add two numbers', () => {
          
              // object created by jasmine - fake LoggerService() with log() method
              const logger = jasmine.createSpyObj('LoggerService', ['log']);
              
              const calculator = new CalculatorService(logger);

              const result = calculator.add(2, 2);

              expect(result).toBe(4);

              // this assertion is continue working
              expect(logger.log).toHaveBeenCalledTimes(1);

          });
  ```

  > Values can also be returned from the fake service **LoggerService( )**

    ```ruby
            // the log() method is called 
            logger.log.and.return('...someValue');
    ```

- Set up beforeEach( ) implementation
  > beforeEach( ) block is the ideal place to put inicialization logic.
  - Dependency Injection: 
    - Is a design pattern widely used by the Angular Framework.
    - Is a programming technique that makes a class independent of its dependencies.
    - It achieves that by decoupling the usage of an object from its creation.
  - TestBed:
    - It allows to provide the dependencies to our services by using **dependency injection** instead of calling constructor explicitly.
    ```ruby

     let calculator: CalculatorService,
        loggerSpy: any;

    beforeEach(()=> {       

        loggerSpy = jasmine.createSpyObj('LoggerService', ["log"]); // mocking dependency of CalculatorService

        // Using TestBed instead of new CalculatorService(new LoggerService());

        TestBed.configureTestingModule({
            providers: [
                CalculatorService, // using a real instance of CalculatorService
                {provide: LoggerService, useValue: loggerSpy} // using Angular Dependency Injection
            ]
        });

        calculator = TestBed.get(CalculatorService);

    });
    ```

    > - It is important not inject real instance of dependencies into service.
    > - It's very important that we mock all the dependencies of the service being tested in order to still consider a Unit Test and not an integration test.
    > - Test only small unit of the application.
    > - It's very important that tha multiple tests that we write for a service to be isolated from each other.

- HTTP implementation
    - HttpClientTestingModule: this module includes a mock implementation of an Http service
    - HttpTestingController: Controller to be injected into tests, that allows for mocking and flushing of requests.
    ```ruby
        let coursesService: CoursesService,
            httpTestingController: HttpTestingController;

        beforeEach(() => {

            TestBed.configureTestingModule({
                imports: [
                    HttpClientTestingModule
                ],
                providers: [
                    CoursesService
                ]
            });

            coursesService = TestBed.get(CoursesService),
            httpTestingController = TestBed.get(HttpTestingController);

        });
    ```
    > Using the HttpClientTestingModule and HttpTestingController provided by Angular makes mocking out results and testing http requests simple by providing many useful methods for checking http requests and providing mock responses for each request.

    ```ruby
        it('should retrieve all courses', () => {

            coursesService.findAllCourses()
                .subscribe(courses => {

                    expect(courses).toBeTruthy('No courses returned');

                    expect(courses.length).toBe(12,
                        "incorrect number of courses");

                    const course = courses.find(course => course.id == 12);

                    expect(course.titles.description).toBe(
                        "Angular Testing Course");

                });

            const req = httpTestingController.expectOne('/api/courses');

            expect(req.request.method).toEqual("GET");

            req.flush({payload: Object.values(COURSES)});

        });
    ```
    - Check Http Request
        - It can  check the details of the http request. In this case, the **expectOne( )** method of httpTestingController also checks that only one request that uses "GET" and the url `/api/courses` was made by the call.
    - Using.flush()
       - The request captured by the httpTestingController, req,  has a flush method on it which takes in whatever response you would like to provide for that request as an argument.
       ```ruby
            req.flush(mockResponse);
       ```
    - Verify All Requests are Complete
       - Once all req have been provided a response using flush, we can verify that there are no more pending requests after the test.
       ```ruby
                afterEach(() => {

                httpTestingController.verify();
            });
       ```
    - Check PUT request
       ```ruby
             it('should save the course data', () => {

                const changes :Partial<Course> =
                    {titles:{description: 'Testing Course'}};

                coursesService.saveCourse(12, changes)
                    .subscribe(course => {
                        expect(course.id).toBe(12);
                    });

                const req = httpTestingController.expectOne('/api/courses/12');

                expect(req.request.method).toEqual("PUT");

                expect(req.request.body.titles.description) // request.body
                    .toEqual(changes.titles.description); 

                // return course updated mock
                req.flush({
                    ...COURSES[12],
                    ...changes
                })

            });
       ```
    - Error Response
        ```ruby
                it('should give an error if save course fails', () => {

                    const changes :Partial<Course> =
                        {titles:{description: 'Testing Course'}};

                    coursesService.saveCourse(12, changes)
                        .subscribe(
                            () => fail("the save course operation should have failed"),

                            (error: HttpErrorResponse) => {
                                expect(error.status).toBe(500);
                            }
                        );

                    const req = httpTestingController.expectOne('/api/courses/12');

                    expect(req.request.method).toEqual("PUT");

                    // return server error mock
                    req.flush('Save course failed', {
                        status:500,
                        statusText:'Internal Server Error'
                        });
                });
        ```
    - Get by ID response
        ```ruby
             it('should find a list of lessons', () => {

                coursesService.findLessons(12)
                    .subscribe(lessons => {

                        expect(lessons).toBeTruthy();

                        expect(lessons.length).toBe(3);

                    });

                const req = httpTestingController.expectOne(
                    req => req.url == '/api/lessons');
                
                // Checking default parameters of the coursesService.findLessons 
                expect(req.request.method).toEqual("GET");
                expect(req.request.params.get("courseId")).toEqual("12");
                expect(req.request.params.get("filter")).toEqual("");
                expect(req.request.params.get("sortOrder")).toEqual("asc");
                expect(req.request.params.get("pageNumber")).toEqual("0");
                expect(req.request.params.get("pageSize")).toEqual("3");

                // return list of lessons mock
                req.flush({
                    payload: findLessonsForCourse(12).slice(0,3)
                });


            });
        ```
***
**Section 3: Angular Component Testing**

- Container component


***
**Section 4: Asynchronous Angular Testing**
>Jasmine needs to know when the asynchronous work is finished.
- Jasmine supports three ways of managing asynchronous work: async/await, promises, and callbacks.

  - **async/await**
  - **promises**
  - **callbacks**
***
**Section 5: Angular E2E Testing with Cypress**
***
**Section 6: Preparing an Angular Aplication for Continuos Integration (CI)**


_The End_
