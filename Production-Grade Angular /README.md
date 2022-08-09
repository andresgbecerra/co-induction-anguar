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
 - for runing entire workspace excute `npm run serve:all` command
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

- **Sharing components throgh a Lib:**
- The first step is to implement new lib, where we can share the component for all workspace apps.
  - Creating new Lib: `nx g lib ui-toolbar --style=scss -d` 
- And then, Creating new component defined as a toolbar in Lib folder(ui-toolbar project): `nx g c toolbar/toolbar --project=ui-toolbar --style=scss -d` 

- Finally, we could refactor the toolbar component in the dashboard, the idea is to implement a new toolbar in the ui-toolbar project and it renderer on both apps (dashboard & client apps).


***
**Mock APIs**
***
**Reactive Angular & State Management**
***
**Facades**
***
**ngrx**
***
>Make it Right
**Testing**
***
>Make it Fast
**Build & Deploy**
