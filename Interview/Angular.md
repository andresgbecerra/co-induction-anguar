## Angular

>Angular is an application design framework and development platform for creating efficient and sophisticated single-page apps.
***
**TypeScript**
Angular was written in TypeScript, a typed superset of JavaScript that implements many modern EcmaScript features.
> ES6 is the current version of JavaScript. TypeScript is a superset of ES6, which means all ES6 features are part of TypeScript, but not all TypeScript features are part of ES6. Consequently, TypeScript must be transpiled into ES5/ES6 to run in most browsers.

**Definitions**

- **Module**
  - In general, a module collects a block of code dedicated to a single purpose. 
  - Angular uses standard JavaScript modules and also defines an Angular module, `NgModule`.
  - In JavaScript, or ECMAScript, each file is a module and all objects defined in the file belong to that module.
  - Objects can be exported, making them public, and public objects can be imported for use by other modules.
  - **Types:**
     - Root Module - main module `AppModule`
     - Routing Module - Module dedicated to routing rules `AppRoutingModule`
     - Feature Module: are modules that encapsulate elements of the application that turn around a business unit.
  - **Properties:**
    - Declarations
    - Exports
    - Imports
    - Providers
    - Bootstrap - Root module only.   

  - Angular ships as a collection of JavaScript modules. 
  - A collection of JavaScript modules are also referenced as a library. 
  - Each Angular library name begins with the @angular prefix. 
  - Install Angular libraries with the npm package manager and import parts of them with JavaScript import declarations.
- **Components**
  - Components are the most basic UI building block of an Angular application. 
  - Basically, a component is anything that is visible to the end user and which can be reused many times within an application.
  - Each component consists of:
    - An HTML template that declares what renders on the page
    - A TypeScript class that defines behavior
    - A CSS selector that defines how the component is used in a template.
    - Optionally, CSS styles applied to the template
  > The core concept of any Angular application is the component. In effect, the whole application can be modeled as a tree of these components.
- **Binding** 
  - A process that allows applications to display data values to a user and respond to user actions. 
  - User actions include clicks, touches, keystrokes, and so on. 
  - Passing Data:
    - **Interpolation** `{{property}}` - uses the double curly braces {{ and }} as delimiters
    - **Property binding** `[objChild]="objParent"`- enclose it in square brackets, which identifies the property as a target property.
    - **Event binding** `(click)=onSave()` - lets you listen for and respond to user actions such as keystrokes, mouse movements, clicks, and touches
    - **Attribute binding** `[attr.aria-label]="actionName"` - you can improve accessibility, style your application dynamically, and manage multiple CSS classes or styles simultaneously.
    - **Class and style binding** `[class.sale]="onSale"` - to add and remove CSS class names from an element's class attribute and to set styles dynamically.
    - **Two-way data binding with ngModel** - to listen for events and update values simultaneously between parent and child components.
- **Directive**
   - A class that can modify the structure of the DOM `Document Object Model` or modify attributes in the DOM and component data model.
   - There are three main types of directives in Angular:
     - **Component** - directive with a template.
     - **Attribute directives** - directives that change the behavior of a component or element but _don't affect_ the template. `ngStyle, ngClass`
     - **Structural directives** - directives that change the behavior of a component or element by _affecting_ how the template is rendered. `ngFor, ngIf, ngSwitch`
>  In fact, Angular components are in large part directives with templates. 
- **Life cycle Hooks** 
   - Here is the complete lifecycle hook interface inventory:
     - ngOnChanges - called when an input binding value changes
     - ngOnInit - after the first ngOnChanges
     - ngDoCheck - after every run of change detection
     - ngAfterContentInit - after component content initialized
     - ngAfterContentChecked - after every check of component content
     - ngAfterViewInit - after component's view(s) are initialized
     - ngAfterViewChecked - after every check of a component's view(s)
     - ngOnDestroy - just before the component is destroyed 
- **Accessing Other Components** 
   - The **@ViewChild** and **@ViewChildren** decorators provide access to the instantiated class of child components, allowing you to interact with non-private fields programmatically. 
- **Dependency injection** 
- **Async Pipe**
- **@Decorator** 
- **First-party libraries**
   These libraries are only required if and when they can help you add functionality to your applications or solve a particular problem.
   ![angular cli](../assets/angular-libraries.png)
**JIT**
***
**Angular CLI**
The Angular CLI is a command-line interface tool that you use to initialize, develop, and maintain Angular applications directly from a command shell.
![angular cli](../assets/angular-cli.png)
***
- **Module**

**AOT**
***
**AOT**
***
**AOT**
***
****
***
***