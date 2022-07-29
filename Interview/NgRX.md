### NGRX
> Reactive State for Angular
***

- **What is NgRx?**
  - NgRx is a framework for building reactive applications in Angular. NgRx provides libraries for:

    - Managing global and local state.
    - Isolation of side effects to promote a cleaner component architecture.
    - Entity collection management.
    - Integration with the Angular Router.
    - Developer tooling that enhances developer experience when building many different types of applications.



- **@ngrx/store**
    - Store is RxJS powered global state management for Angular applications, inspired by Redux. 
    - Store is a controlled state container designed to help write performant, consistent applications on top of Angular.

- **Key concepts**
  - **Actions** describe unique events that are dispatched from components and services.
  - State changes are handled by pure functions called **reducers** that take the current state and the latest action to compute a new state.
  - **Selectors** are pure functions used to select, derive and compose pieces of state.
  - State is accessed with the Store, an observable of state and an observer of actions.

- **Actions**
  - Actions are one of the main building blocks in NgRx. Actions express unique events that happen throughout your application. From user interaction with the page, external interaction through network requests, and direct interaction with device APIs, these and more events are described with actions.

- **Reducers**
    - Reducers in NgRx are responsible for handling transitions from one state to the next state in your application. 
    - Reducer functions handle these transitions by determining which actions to handle based on the action's type.
    - Reducers are pure functions in that they produce the same output for a given input. 
    - They are without side effects and handle each state transition synchronously.

- **Selectors**
    - Selectors are pure functions used for obtaining slices of store state.

- **Effects**
    - In a service-based Angular application, components are responsible for interacting with external resources directly through services. Instead, 
    - effects provide a way to interact with those services and isolate them from the components. 
    - Effects are where you handle tasks such as fetching data, long-running tasks that produce multiple events, and other external interactions where your components don't need explicit knowledge of these interactions.
    - Key Concepts
      - Effects isolate side effects from components, allowing for more pure components that select state and dispatch actions.
      - Effects are long-running services that listen to an observable of every action dispatched from the Store.
      - Effects filter those actions based on the type of action they are interested in. This is done by using an operator.
      - Effects perform tasks, which are synchronous or asynchronous and return a new action.


- **Meta-reducers**
    - @ngrx/store composes your map of reducers into a single reducer.
    - Developers can think of meta-reducers as hooks into the action->reducer pipeline.
    -  Meta-reducers allow developers to pre-process actions before normal reducers are invoked.
    > Meta-reducers in NgRx are similar to middleware used in Redux.