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

- A component, unlike all other parts of an Angular application, combines an HTML template and a TypeScript class.
- The component truly is the template and the class working together. 
> To adequately test a component, you should test that they work together as intended.


- createComponent()
    - After configuring TestBed, you call its createComponent( ) method.
    - TestBed.createComponent() creates an instance of the BannerComponent, adds a corresponding element to the test-runner DOM, and returns a ComponentFixture.
        ```ruby
            const fixture = TestBed.createComponent(BannerComponent);
        ```
    > Fixture is a test utility type that is going to help us to do some common test operations.
- ComponentFixture
    - The ComponentFixture is a test harness for interacting with the created component and its corresponding element.
    - Access the component instance through the fixture and confirm it exists with a Jasmine expectation:
    ```ruby
        const component = fixture.componentInstance;
        expect(component).toBeDefined();
    ```
    > The **ComponentFixture** properties and methods provide access to the component, its DOM representation, and aspects of its Angular environment.
- beforeEach( )
    - You will add more tests as this component evolves. Rather than duplicate the TestBed configuration for each test, you refactor to pull the setup into a Jasmine beforeEach() and some supporting variables:
    ```ruby
            // Example 1 - synchronous
            describe('BannerComponent (with beforeEach)', () => {
                let component: BannerComponent;
                let fixture: ComponentFixture<BannerComponent>;

                beforeEach(() => {
                    TestBed.configureTestingModule({declarations: [BannerComponent]});
                    fixture = TestBed.createComponent(BannerComponent);
                    component = fixture.componentInstance;
                });

                it('should create', () => {
                    expect(component).toBeDefined();
                });
                });
                //-----------------------------
                // Example 2 - asynchronous
                    let component: CoursesCardListComponent;
                    let fixture: ComponentFixture<CoursesCardListComponent>;
                    let el: DebugElement;

                    beforeEach(async(() => {
                        TestBed.configureTestingModule({
                            imports: [CoursesModule]
                        })
                        .compileComponents()
                        .then(() => {

                            fixture = TestBed.createComponent(CoursesCardListComponent);
                            component = fixture.componentInstance;
                            el = fixture.debugElement;

                        });
                    }));
    ```
    - Using Dependency Injections
        > You must call **compileComponents( )** within an asynchronous test function.
        - After calling **compileComponents**, the TestBed configuration is frozen for the duration of the current spec.
    ```ruby
        let fixture: ComponentFixture<HomeComponent>;
        let component:HomeComponent;
        let el: DebugElement;
        let coursesService: any;

        beforeEach(waitForAsync(() => {

            const coursesServiceSpy = jasmine.createSpyObj('CoursesService', ['findAllCourses'])

            TestBed.configureTestingModule({
                    imports: [
                        CoursesModule,
                        NoopAnimationsModule
                    ],
                    providers: [ //Inject mock service
                        {provide: CoursesService, useValue: coursesServiceSpy}
                    ]
                }).compileComponents()
                    .then(() => {
                        fixture = TestBed.createComponent(HomeComponent);
                        component = fixture.componentInstance;
                        el = fixture.debugElement;
                        coursesService = TestBed.get(CoursesService);
                });

        }));
    ```
    > **waitForAsync** Runs the body of a test (it) or setup (beforeEach) function within a special async test zone. 

- DebugElement
   - The **DebugElement** provides crucial insights into the component's DOM representation.
   - The Angular fixture provides the component's element directly through the `fixture.nativeElement`.
   - This is actually a convenience method, implemented as `fixture.debugElement.nativeElement`.
   - Angular relies on the **DebugElement** abstraction to work safely across all supported platforms.
   - Instead of creating an HTML element tree, Angular creates a DebugElement tree that wraps the native elements for the runtime platform. 
   - The nativeElement property unwraps the DebugElement and returns the platform-specific element object.
   ```ruby
        const bannerDe: DebugElement = fixture.debugElement;
        const bannerEl: HTMLElement = bannerDe.nativeElement;
   ```
   > The properties of the **nativeElement** depend upon the runtime environment.

- By.css( )
  - The **DebugElement** offers query methods that work for all supported platforms.
  - The **By.css( )** static method selects DebugElement nodes with a standard CSS selector.
    ```ruby
        it('should find the <p> with fixture.debugElement.query(By.css)', () => {
            const bannerDe: DebugElement = fixture.debugElement;
            const paragraphDe = bannerDe.query(By.css('p'));
            const p: HTMLElement = paragraphDe.nativeElement;
            expect(p.textContent).toEqual('banner works!');
        });
    ```
- Container component
   - Calling fixture.detectChanges() tells Angular to run change-detection.
   - In our tests, we can make changes to the data in our component, but the component will not be re-rendered until we call fixture.detectChanges() again.
    ```ruby
              it('should display the course list', () => {

                component.courses = setupCourses();

                fixture.detectChanges();

                const cards = el.queryAll(By.css(".course-card"));

                expect(cards).toBeTruthy("Could not find cards");
                expect(cards.length).toBe(12, "Unexpected number of courses");

            });
    ```



***
**Section 4: Asynchronous Jasmine/Angular Testing**
>Jasmine needs to know when the asynchronous work is finished.

- **Jasmine** supports three ways of managing asynchronous work: async/await, promises, and callbacks.

  - **async/await**
      - It's a Jamine function.
      - It waits for any asynchronous operations triggered by the code block.
        ```ruby
            beforeEach(async function() {
                await someLongSetupFunction();
            });

            it('does a thing', async function() {
                const result = await someAsyncFunction();
                expect(result).toEqual(someExpectedValue);
            });
        ```
 
  
  - **promises**
     > If you can’t use async/await or you need more control, you can explicitly return a promise instead. 
     - Jasmine considers any object with a **then( )** method to be a promise, so you can use either the Javascript runtime’s built-in Promise type or a library. 
       ```ruby
             beforeEach(function() {
                return new Promise(function(resolve, reject) {
                    // do something asynchronous
                    resolve();
                });
            });

            it('does a thing', function() {
                return someAsyncFunction().then(function (result) {
                    expect(result).toEqual(someExpectedValue);
                });
            }); 
       ``` 
     
  - **callbacks**
      - This is a lower-level mechanism and tends to be more error-prone, but it can be useful for testing callback-based code or for tests that are inconvenient to express in terms of promises. 
      - It’s vital that the done callback be called exactly once, and that calling done be the last thing done by the asynchronous function or any of the functions that it calls.
      ```ruby
        it('Asynchronous test example with Jasmine done()', (done: DoneFn) => {

            let test = false;

            setTimeout(() => {               

                test = true;

                expect(test).toBeTruthy();

                done();

            }, 1000);

        });
    ```
>Callback style specs are very error-prone and should be avoided if possible.
- **Angular** Testing
     - Zone.js provides a mechanism, called zones, for encapsulating and intercepting asynchronous activities in the browser (e.g. setTimeout, , promises).
     - These zones are execution contexts that allow Angular to track the start and completion of asynchronous activities and perform tasks as required (e.g. change detection).
     > Angular Zone is sort of context that survives multiple asynchronous operations, This is implemented by the Zone JS Library, which is part of the Angular code base, and this is used internally to implement a change detection mechanism. 
     > - The Zone is going to detect all the browser asynchronous operations.
     > - It's something very similar to Jasmine **done( )**, but it's a lot more flexible.
     - **waitForAsync:** 
        - It's an `@angular/core/testing` function.
        - Wraps a test function in an asynchronous test zone. 
        - The test will automatically complete when all asynchronous calls within this zone are done.
        - Can be used to wrap an inject call.
        - It cannot call flush(), tick(), flushMicrotasks() ..etc in its block.
        - It doesn't have full control over the emptying of the tasks and micro-task queue.
        - The waitForAsync test zone is going to keep track of any asynchronous operations created by our code, and then it is going to give us a callback that is going to notify us when all those asynchronous operations are completed. `fixture.whenStable()`
          - whenStable() return a promise, and inside then() block we can put any code that we would like to run.
          ```ruby
               it("should display advanced courses when tab clicked - async", waitForAsync(() => {

                    coursesService.findAllCourses.and.returnValue(of(setupCourses()));

                    fixture.detectChanges();

                    const tabs = el.queryAll(By.css(".mat-tab-label"));

                    click(tabs[1]);

                    fixture.detectChanges();

                    fixture.whenStable().then(() => { // return a promise

                        console.log("called whenStable() ");

                        const cardTitles = el.queryAll(By.css('.mat-tab-body-active .mat-card-title'));

                        expect(cardTitles.length).toBeGreaterThan(0,"Could not find card titles");

                        expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course");

                    });

            }));
          ``` 
        > This test zone is very similar to fakeAsync(), but it works in a fundamentally different way.
        ```ruby
            beforeEach(waitForAsync(() => {
                    TestBed.configureTestingModule({
                        imports: [CoursesModule]
                    })
                    .compileComponents()
                    .then(() => {

                        fixture = TestBed.createComponent(CoursesCardListComponent);
                        component = fixture.componentInstance;
                        el = fixture.debugElement;

                    });
                }));

            it('...', waitForAsync(() => {
                object.doSomething.then(() => {
                    expect(...);
                })
            })); 
        ``` 
    > One major feature of the **waitForAsync** test zone is that it supports actual HTTP requests.
    > - This is also one of the reasons why we are using waitForAsync in beforeEach( ) block.
    > - The use of waitForAsync is going to make sure that the then() promise gets call in all cases with synchronous and asynchronous compiling components.
    - **FakeAsync:** 
        > The best way to wrap our test execution in an Angular Zone is to use the angular **fakeAsync()** test utility.
        - It's an `@angular/core/testing` function.
        - Wraps a function to be executed in the fakeAsync zone.
        - It enables us to control the flow of time and when asynchronous tasks are executed with the  methods tick() and flush().
        ```ruby
            it('Asynchronous test example - setTimeout()', fakeAsync(() => {

                let test = false;

                setTimeout(() => {});

                setTimeout(() => {

                    console.log('running assertions setTimeout()');

                    test = true;

                }, 1000);

                //flush(); // executing all timeOut that were killed

                // clock - waiting for the seconds setting in the timeOut
                tick(500); 
                tick(499);
                tick(1);

                expect(test).toBeTruthy();

            }));  
        ```  
        - If we want to run all the currently queued async tasks we call **flush( )**.  
        - If we have code that uses a timeout, for example, setTimeout(() => {}, 500), then this will be added to the fake async queue with a time delay of 500. We can use the **tick( )** function to advance time by a set amount.`Timers are synchronous; tick() simulates the asynchronous passage of time.`
        - **The Promises** are defined before **the browser asynchronous** operations, because a Promise is considered a **micro-task** in contrast with setTimeout( ), setInterval( ) ...etc, which is considered either a macro-tast or simply a task.
        - All browser asynchronous operation (macro-task) will get added to the event loop, and between each of these macro-tasks, the browser rendering engine is going to get a change to updated the screen.
        - Promises are added to their own separate queue, and the browser will not get the chance to update the view, so micro-task are in a sense more lightweigth.
        - These are two separate queues in JS runtime for asynchronous tasks.
        > When all the tasks in the micro-tasks queue are processed, then will the browser look for another macro-task to execute.
        - **Microtasks** are manually executed by calling flushMicrotasks(). 
        ```ruby
           it('Asynchronous test example - plain Promise', fakeAsync(() => {

                let test = false;

                // Creating promise
                Promise.resolve()
                .then(() => {

                    console.log('Promise first then() evaluated successfully');

                    return Promise.resolve();
                })
                .then(() => {

                    console.log('Promise second then() evaluated successfully');

                    test = true;

                });

                flushMicrotasks();             

                expect(test).toBeTruthy();

            })); 
      ``` 
    > The difference between **flushMicrotasks** and **flush** is that the former only processes the pending micro-tasks (promise callbacks), but not the macro-tasks (scheduled callbacks), while flush processes both.
    - **Mixing micro-task & task Test**
        ```ruby
                it('Asynchronous test example - Promises + setTimeout()', fakeAsync(() => {

                let counter = 0;

                Promise.resolve()
                    .then(() => {

                    counter+=10;

                    setTimeout(() => {

                        counter += 1;

                    }, 1000);

                    });

                expect(counter).toBe(0);

                flushMicrotasks(); // promise execution

                expect(counter).toBe(10);

                tick(500);

                expect(counter).toBe(10);

                tick(500);

                expect(counter).toBe(11);

            }));
        ```
- Testing Observables
  - The Observables are built internally, sometimes with promises, sometimes using operations such as setTimeout( ), setInterval( ) ..etc and many times also they are purely **synchronous** code.
  
   ```ruby
        it('Asynchronous test example - Observables', fakeAsync(() => {

            let test = false;

            console.log('Creating Observable');
            // Observable with delay(1000) - internal setTimeout()
            const test$ = of(test).pipe(delay(1000)); 

            test$.subscribe(() => {

                test = true;

            });

            tick(1000); // clock

            console.log('Running test assertions');

            expect(test).toBe(true);


        }));
   ```
***
**Section 5: Angular E2E Testing with Cypress**
***
**Section 6: Preparing an Angular Aplication for Continuos Integration (CI)**


_The End_
