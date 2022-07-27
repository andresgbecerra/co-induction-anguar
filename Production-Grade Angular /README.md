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
***
**Complex Workspaces**
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
