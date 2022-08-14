## Production-Grade Angular 
> Frontend Masters: Lukas Ruebbelke

**Managing Complexity**

- **Tips on Managig complexity**
 > MC is the hardest thing about developing software
 - Compexity consists of managing of states, flow control, and code volume.
 - General rules for managing complexity:
   1. There is no language and framework that does everything.
   2. Make it work, make it known make it right and make it fast.  
   3. Code should be fine grained
   4. Code should do one thing
   5. Code should be self documenting
   6. Favor pure, immutable functions
   7. Abstractions should reduce complexity
   8. Abstractions should reduce coupling
   9. Abstractions should increase cohesion
   10. Abstractions should increase portability
   11. Refactor throught promotion
   12. Composition over inheritance
   13. Do not confuse convention for repetition
   14. Well-structured code will naturally have a large surface area
- Team rules for managing complexity
   1. Be mindful over the limitations of your entire team and optimize around that
   2. Favor best practices over introducing idioms however clever they may be
   3. Consistency is better than righteousness
   4. Follow the style guide until it doesn't make sense for your situation
- Tactical rules for managing complexity
   1. Eliminate hidden state in functions
   2. Eliminate nested logic in functions
   3. Do not break the single responsibility principle
   4. Extracting to a method is one of the most effective refactoring strategies available  
   5. If you need to clarify your code with comments then it is probably too complex
> It is impossible to write good tests for bad code.






- **Managing Complexity in Angular**
  - A **Component** should only ever do two things:
    1. Consume just enough data to satisfy its templates.
    2. Capture user events and delegate them upwards
  - Components should be oblivious to business logic, server communication and application state. 
    > Components should be as thin as possible.
   - **Facades** are an effective delegation layer between components and the rest of the app
     > Facades are for delegation only
  - Server communication and state management should be decoupled.
> The litmus test is when the code can be tested and it can be moved. If you can't test it or you can't move it, then you need to refactor.
  

***
> Make it Work
> 
**CLI & Nx Workspaces**

- Nx Workspace
    - Nx is a smart, fast and extensible build system with first class monorepo support and powerful integrations.
    - Creating Workspace: `npx create-nx-workspace@latest`   
      - Workspace contains the apps directory with Angular and Nest projects.    
    - Scripst setting up - package.json
        ```js
          "scripts": {
            "ng": "nx",
            "postinstall": "node ./decorate-angular-cli.js && ngcc --properties es2020 browser module main",
            "start": "nx serve",
            "build": "nx build",
            "test": "nx test",
            "serve:api": "nx run api:serve",
            "serve:web": "ng serve --open",
            "serve:all": "run-p serve:api serve:web"
        },
        ```
    > Using the run-p command to run in parallel. Installing this library `yarn add npm-run-all --dev`.
    - Install Nx CLI: `npm install -g nx`
    - Installing Angular material `nx add @angular/material` & NgRx/store `nx add @ngrx/store@latest`
    - Creating code-data: `nx g lib core-data --parent-module=apps/devnotes/src/app/app.module.ts --routing --style=scss`
      - Select `@nrwl/workspace:library` 
      - Use to comunicate with server
    - Creating code-state: `nx g lib core-state --parent-module=apps/devnotes/src/app/app.module.ts --routing --style=scss`
      - Select `@nrwl/workspace:library` 
      - It responsibles for managing the states of the application 
    - Creating material: `nx g lib material  --parent-module=apps/devnotes/src/app/app.module.ts --routing --style=scss`
      - Select `@nrwl/workspace:library` 
      
    - Creating Service: `nx g s service/flahscards/flashcards --project=core-data` 
    - Creating Routing in Web project: `nx g m routing --flat=true -m=app.module.ts` 
    - Creating Components:
      - Flashcard Components `nx g c flashcards -m app.module.ts --style=scss && nx g c flashcards/flashcards-list -m app.module.ts --style=scss && nx g c flashcards/flashcards-details -m app.module.ts --style=scss`
      - Home Component: `nx g c home -m app.module.ts --style=scss`
***
**Boilerplate & Components**
 - for running entire workspace excute `npm run serve:all` command
 - Typical code to edit or create a new record:
  ```js
      saveData(model: Model) {
          if(model.id){
            this.updatedData(model);
          } else {
            this.createData(model);
          }

      }
  ```
  - Adding JSON Server: `yarn add json-server --save-dev` 
    - [json-server tutorial](https://jsonplaceholder.typicode.com/)
    - [json-server references](https://github.com/typicode/json-server)
  - Creating server folder & db json file: `mkdir server && touch server/db.json` with mock data.
    ```js
          {
          "widgets": [{
                  "id": "1",
                  "title": "Remote widget 01",
                  "description": "Pending..."
              },
              {
                  "id": "2",
                  "title": "Remote widget 02",
                  "description": "Pending..."
              },
              {
                  "id": "3",
                  "title": "Remote widget 03",
                  "description": "Pending..."
              }
          ]
        }
    ```
  - Adding new package.json script: 
     ```js
      {
        ...
        "serve:json": "json-server server/db.json",
        ...
      }
     ```
     - running above command we get data from `http://localhost:3000/widgets`
 - Creating the service to start consuming the mock data defined in db.json
    - command to create service in workspace: `nx g s services/widgets/widgets --project=core-data -d` -d dry-run 
      ```js

        const API_ENDPOINT = 'http://localhost:3000'; 
        @Injectable({
          providedIn: 'root'
        })
        export class WidgetsService {

          model = 'widgets';

          constructor(private http: HttpClient) { }

        private getUrl(): string{
          return `${API_ENDPOINT}/${this.model}`;
        }

        private getUrlWithId(id): string {
          return `${this.getUrl()}/${id}`;
        }

        all(): Observable<Widget[]> {
          return this.http.get<Widget[]>(this.getUrl());
        }

        find(id: string): Observable<Widget> {
          return this.http.get<Widget>(this.getUrlWithId(id));
        }

        create(widget: Widget): Observable<Widget> {
          return this.http.post<Widget>(this.getUrl(), widget);
        }

        update(widget: Widget): Observable<Widget> {
          return this.http.put<Widget>(this.getUrlWithId(widget.id), widget);
        }

        delete(widget: Widget): Observable<Widget> {
          return this.http.delete<Widget>(this.getUrlWithId(widget.id));
        }

        }
      ```
    - command to create service in workspace: `nx g s services/items/items --project=core-data -d` -d dry-run 
    - Every time we implement a new service we will use the same methods to fetch data, Now we have two services that contain the same functions, then We should abstract the things that change away from the things that do not change to improve the performance and reusing code.`This is how we can reduce coupling in large scale apps`
 > The business logic around the entities change but the mechanisms to fecht that from REST endpoint doesn't change.
- **Errors Handling:** the best place to catch an error is at the point of origin and some other considerations are what the nature of the error is and whether it requires human intervention. In the context of an Angular application using NgRx errors should be handled at the effects layer.


***
**Complex Workspaces**

- **Multiple Apps with Nx Workspace:**
  - Creating new App called client - `nx g app client --linter=tslint --style=scss --routing=false -d` -d run-dry, and then to run we excute `nx run client:serve` command that it raise up the localhost:4200  
  - Adding new script: now the workapace has two applications dashboard and client
  ```js
      {
        ...
      "serve:client": "nx run client:serve --port=4400 --open",
        ...
      }
      > npm run serve:client
  ```
  - Now we can handle two frontend apps (dashboard & client) and also two backend implementations (api & json-server), then we could share live data form json-server to both frontend apps by the service implemented in core-data project.
  > The component layer doesn't need to know the implementation details of where the data is coming from. All it needs to know is that whatever it received it should be renderer.

- **Sharing components through a Lib:**
- The first step is to implement new lib, where we can share the component for all workspace apps.
  - Creating new Lib: `nx g lib ui-toolbar --style=scss -d` 
- And then, Creating new component defined as a toolbar in Lib folder(ui-toolbar project): `nx g c toolbar/toolbar --project=ui-toolbar --style=scss -d` 

- Finally, we could refactor the toolbar component in the dashboard, the idea is to implement a new toolbar in the ui-toolbar project and it renderer on both apps (dashboard & client apps).


***
**Mock APIs**

- Nest provides:
  - architecture
  - highly testable
  - scalable
  - loosely coupled
  - easily maintainable

- practice:
  - Adding uuid: `yarn add uuid` 
  - Adding nest mapped types: `yarn add @nestjs/mapped-types` 
    - As you build out features, it's often useful to construct variants on a base entity type. A good example of such a variant is a Data Transfer Object (DTO). A Data Transfer Object is an object that is used to encapsulate data, and send it from one part of your application to another. DTO’s help us define the input and output interfaces of our system.
  - Generating schematics: `nx g @nestjs/schematics:resource widgets --type rest --crud true --source-root apps/api/src -d`
    - the above command generate the REST api.
    - Import the module `WidgetsModule` in app.module.ts file from backend app (api).
    - Finally add this line `app.enableCors();` in main.ts file from api directory to enable CORS validations.
      ```js
        import { Logger } from '@nestjs/common';
        import { NestFactory } from '@nestjs/core';

        import { AppModule } from './app/app.module';

        async function bootstrap() {
          const app = await NestFactory.create(AppModule);
          const globalPrefix = 'api';
          app.enableCors();
          app.setGlobalPrefix(globalPrefix);
          const port = process.env.PORT || 3333;
          await app.listen(port, () => {
            Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
          });
        }

        bootstrap();
      ```
- **Adding Swagger**
  
  - The OpenAPI specification is a language-agnostic definition format used to describe RESTful APIs. Nest provides a dedicated module which allows generating such a specification by leveraging decorators. 
  - Installation: To begin using it, we first install the required dependency.
    - execute command: `yarn add @nestjs/swagger swagger-ui-express` 
  - Bootstrap: Once the installation process is complete, open the main.ts file and initialize Swagger using the SwaggerModule class: 
  - If you're using `@nestjs/swagger@5`, then you should upgrade `@nestjs/common` and `@nestjs/core` up on version 8.
  ```js
    ...
    const configureSwagger  = (app) => {
        const options = new DocumentBuilder()
         .setTitle('Production Angular API')
        .setDescription('REST API for the production Angular course')
        .setVersion('1.0')
        .addTag('..Tags')
        .build();
      const document = SwaggerModule.createDocument(app, options);
      SwaggerModule.setup('api', app, document);
    }
    async function bootstrap() {
      const app = await NestFactory.create(AppModule);
      const globalPrefix = 'api';
      app.enableCors();
      app.setGlobalPrefix(globalPrefix);
      configureSwagger(app); // call swagger config
      const port = process.env.PORT || 3333;
      await app.listen(port, () => {
        Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
      });
    }

  ```
  ![Swagger](../assets/swagger-home.png)
> The OpenAPI Specification (OAS) defines a standard, language-agnostic interface to RESTful APIs which allows both humans and computers to discover and understand the capabilities of the service without access to source code, documentation, or through network traffic inspection. When properly defined, a consumer can understand and interact with the remote service with a minimal amount of implementation logic.

***
**Reactive Angular & State Management**

> There are two transitional patterns (The Facade Pattern & a service with a Subject) very useful and they set the stage for doing proper state management in Angular application.
  
  - **The Facade Pattern**
    -  Facades are controversial and can be misused.
    -  Facades are a pure delegation layer and shuold NOT handle business logic.
    -  Facades provide a clean separation between components and te rest of the application.
    -  Just as Input and Output provide an API for your components, Facades provide an API for you application.
    -  Facades are an excellent way to incrementally integrate NgRx.
    -  Facades are great for mocking out a business logic layer.

  - **Reactive Angular, the Facade Pattern, & Subject Pattern**
  - The problem is that the component usually has some knowledge of where the data is coming from and how it's being fetched. so the implementation details are still leaking into the component.
     - The typical component that is injecting a service and it's pulling data, basically it's calling the server into the service into the component. 
     - Being that we have essentially coupled this component to the service. 
     > Intoduce a **Facades** to decouple the component from the implementation details. 
     > - Now we are decoupling or creating abstracting the implementation details from the component
     > - Now we can expose state from the facade directly into the component.
  - Observable stream typically has three events: next(), error, complete()
    - An Observable stream, when we have a subject and we expose the portion that's the observable stream and we call next() on the subject it is going to take that data and it's going to emit it to any subscriber that is subscribed to that stream.
    - Observable stream are very powerful for communicating state or data for one place to another in conjunction with the event that caused it.    
  > Complexity is state management, control flow, and code volume.
***

**Facades**

- **Creating a Facade:**
  - creating facade command: `nx g @nrwl/angular:ngrx widgets --module=libs/core-state/src/lib/core-state.module.ts --directory widgets --defaults --facade`, this command create a  DEFAULT FACADE from ngrx library into core-data folder.
  - > Notice the comments here we have segmented facade state about the data flow. In NgRx state flows down & events(actions) flows up.
  - ![Swagger](../assets/facade-code-data.png)
- **Refactoring Default Facade:**
  - We are going to refactor this default facade to implement a service with Subjects: 
    - The subjects have the ability to control flow within observable stream, so if we have any reference to the subject, we can call next() on that subject. 
      1. Define private the subjects. 
      2. Expose the observables. 
    > Segment the subject which is responsible for propagating data from the stream itself. 
    ```js
      
      // imports ...
      
      @Injectable()
      export class WidgetsFacade {

        private allWidgets = new Subject<Widget[]>();
        private selectedWidget = new Subject<Widget>();
        private mutations = new Subject();

        allWidgets$ = this.allWidgets.asObservable();
        selectedWidget$ = this.selectedWidget.asObservable();
        mutations$ = this.mutations.asObservable();

        constructor(private widgetsService: WidgetsService){}

        loadWidgets(){
          this.widgetsService
                    .all()
                    .subscribe((widgets: Widget[]) => this.allWidgets.next(widgets));
        }

        selectWidget(widget: Widget){
          this.selectedWidget.next(widget);
        }


      }  
    ```  



- This is **The typical Component** that is **injecting a service**:
  - > Here we are calling the widgetService, and we are taking that result, and assigning it in a single transaction (Command and a Query together).
  - > This component is coupled to the implementation details.

  ```js

    // imports ...

    const emptyWidget: Widget = {
        id: null,
        title: '',
        description: '',
      };

      @Component({
        selector: 'fem-widgets',
        templateUrl: './widgets.component.html',
        styleUrls: ['./widgets.component.scss'],
      })
      export class WidgetsComponent implements OnInit {
        widgets$: Observable<Widget[]>;
        selectedWidget: Widget;

        constructor(private widgetsService: WidgetsService) {}

        ngOnInit(): void {
          this.reset();
        }

        reset() {
          this.loadWidgets();
          this.selectWidget(null);
        }

        resetForm() {
          this.selectedWidget = emptyWidget;
        }

        selectWidget(widget: Widget) {
          this.selectedWidget = widget;
        }

        loadWidgets() {
          this.widgets$ = this.widgetsService.all();// COMMAND + QUERY
        }

        saveWidget(widget: Widget) {
          if (widget.id) {
            this.updateWidget(widget);
          } else {
            this.createWidget(widget);
          }
        }

        createWidget(widget: Widget) {
          // COMMAND + QUERY
          this.widgetsService.create(widget).subscribe((result) => this.reset());
        }

        updateWidget(widget: Widget) {
          // COMMAND + QUERY
          this.widgetsService.update(widget).subscribe((result) => this.reset());
        }

        deleteWidget(widget: Widget) {
          // COMMAND + QUERY
          this.widgetsService.delete(widget).subscribe((result) => this.reset());
        }
      }

  ```
- This is **The Reactive Component** with **the FACADE pattern injected**:
  - > Now we have removed all the implementation details around state management out of the component.
  - > Command and a Query are separated.
  ```js
      // imports ...

    const emptyWidget: Widget = {
      id: null,
      title: '',
      description: '',
    };

    @Component({
      selector: 'fem-widgets',
      templateUrl: './widgets.component.html',
      styleUrls: ['./widgets.component.scss'],
    })
    export class WidgetsComponent implements OnInit {

      // Instantiating the observables defined in the facade
      // ... and these Obs$ are redered in the component by Async PIPE
      widgets$: Observable<Widget[]> = this.widgetsFacade.allWidgets$; // QUERY
      selectedWidget$: Observable<Widget> = this.widgetsFacade.selectedWidget$; // QUERY

      // Injected Facade service
      constructor(private widgetsFacade: WidgetsFacade) {}

      ngOnInit(): void {
        this.reset();
      }

      reset() {
        this.loadWidgets();
        this.selectWidget(null);
      }

      resetForm() {
        this.selectWidget(emptyWidget);
      }

      selectWidget(widget: Widget) {
        this.widgetsFacade.selectWidget(widget);// COMMAND
      }

      loadWidgets() {
        this.widgetsFacade.loadWidgets();// COMMAND
      }

      saveWidget(widget: Widget) {
        if (widget.id) {
          this.updateWidget(widget);
        } else {
          this.createWidget(widget);
        }
      }

      createWidget(widget: Widget) {
        //this.widgetsService.create(widget).subscribe((result) => this.reset());
      }

      updateWidget(widget: Widget) {
        //this.widgetsService.update(widget).subscribe((result) => this.reset());
      }

      deleteWidget(widget: Widget) {
        //this.widgetsService.delete(widget).subscribe((result) => this.reset());
      }
    }

  ```
***
**NGRX**
- **Introduction**
  - ***Data Binding***
    - we pass data from the class (component.ts file) to the template (component.html file) via **property binding**.
    - we pass events from the template (component.html file) back to the class (component.ts file) via **events binding**.
  
    ![Data Binding](../assets/data-binding.png)

  - ***Custom Data Binding***
    - we can find a custom **Input** from this component to another component and also we can listen to a custom **output** from this child component into the parent component.
  
    ![Custom Data Binding](../assets/custom-data-binding.png)

    - The parent can send data to the child through the **input** if it has a defined **property**.
    - The child can send **events** back to the parent via **output** so that the parent can then handled that.
    > Data Flow:
    > - **Parent**   [property] IN ---> (event) OUT
    > - **Child**    @Input IN ---> @Output OUT

    ![Parent-Child Data Binding](../assets/parent-child-data-binding.png)
    > Properties/Input data goes down, events/output flow up

  - **States Flow down**  
    - In the container component, we get the data and we feed it into the presentation component. 
    ![States flow](../assets/state-flow-down.png)
  - **Events Flow up**  
    - When something happens, the presentation component routes this event, so the container component processes event sends it up. 
    ![Event flow](../assets/event-flow-up.png)

- **NgRx Flow data**
  - **States flow down** 
    - States flow down from the store to the service(or Facade) into the component class, into the template. 
    ![NgRx State flow](../assets/ngrx-state-flow-down.png)
  - **Events flow up** 
    - From the template Events flow up from the template component class into the service (or Facade), and it also could be an effect into the store with store being the single source the truth. 
    ![NgRx Event flow](../assets/ngrx-event-flow-up.png)
- **NGRX state management Lifecycle**  
  ![NgRx State Management](../assets/ngrx-state-management.png)
  - We have the Store that surfaces data to the component via SELECTOR.
  - A component communicate the event via ACTIONS into the REDUCER, which then modify the state in the STORE.
  - If we need an asynchronous event, it call a SERVICE, then that same object can go to an EFFECT to service, change something and come back.
  > The STORE is ***the single source of truth***.


**NGRX implemeted with Facade**

- **Actions:** 
  - Is nothing more than an Object that has a type and a payload
  - It doesn't have a Test, because there's nothing to them. 
  - They are data structure.
- **Reducer:**  
  - Listen for an action based on the action type and it performs some operation and return new state. 
- **Selectors:**
  - They are nothing more than really queries. 
  - They are functions that can take other selectors.
  - They return slices of state.
- **Effects:**
  - They are typically where we can put the business logic.
  - They are asynchronous.
  - They use streams to provide new sources of actions to reduce state based on external interactions such as:
    - network requests
    - web socket messages
    - time-based events.
- **Facades:** Do two things
  1. Dispatches *Actions*.
  2. Allow to select data from the *Store* 
- **Adapter:**
  - The adapter is handling the underlying collection.
  - It is implemented in the reducer.





***
>Make it Right
**Testing**
***
>Make it Fast
**Build & Deploy**
