# Feature 01 – React Getting Started

> Learning React from the ground up, understanding how things work, experimenting with code, making mistakes, asking questions, and connecting all the pieces together.

## 1. Where We Started

This was our first feature in the React practice repository.

The idea wasn't to jump directly into building a complex application. We wanted to understand React from the beginning: what it is, why we use it, how a React project is structured, and most importantly, how everything connects when we open the application in our browser.

We used **React with Vite**, and throughout this feature, we gradually started exploring JSX, components, imports and exports, rendering, event handling, and component lifecycle.

Something worth mentioning: we didn't write the entire application in one go. We started with a very basic component and kept improving it as we learned new concepts.

That's exactly how this README is organized. Instead of showing only the final code, we'll follow the same progression.

### What we explored

- Introduction to React and its features.
- React vs JavaScript and other frontend frameworks.
- Setting up a React application using Vite.
- npm commands and package management.
- Understanding `package.json`.
- Understanding Vite configuration.
- JSX and embedding JavaScript expressions.
- Creating and importing React components.
- Default exports and named exports.
- ReactDOM and the rendering process.
- Understanding the root element.
- Event handling and the limitations of ordinary variables.
- Introduction to `useEffect()`.
- Component lifecycle and React StrictMode.

---

# 2. Setting Up Our React Project

Before writing any React code, we needed to prepare our environment.

We were working in our practice repository:

```text
BridgeLabz_React_Practice/
```

We used:

- Node.js – JavaScript runtime.
- npm – Package manager.
- React – UI library.
- ReactDOM – Browser renderer.
- Vite – Development server and build tool.
- VS Code – Code editor.

## 2.1 Initializing the project

The first command we executed was:

```bash
npm init -y
```

Let's break it down.

| Part | Meaning |
|---|---|
| `npm` | Node Package Manager |
| `init` | Initializes an npm project |
| `-y` | Automatically accepts the default answers |

Normally, `npm init` asks us several questions about the project, such as its name, version and description.

But using `-y` skips those questions and generates the `package.json` file using default values.

So, in simple words, we initialized our project as an npm-managed project.

## 2.2 Installing React and ReactDOM

Next, we installed:

```bash
npm install react react-dom
```

This installs two packages:

- `react` – The core React library.
- `react-dom` – The browser renderer that allows React to render components into the DOM.

We'll understand why both are necessary when we discuss React and ReactDOM later.

## 2.3 Installing Vite and the React plugin

Then we executed:

```bash
npm install -D vite @vitejs/plugin-react
```

This command might look a little complicated, but it's actually quite straightforward.

| Part | Meaning |
|---|---|
| `npm` | Node Package Manager |
| `install` | Installs packages |
| `-D` | Shorthand for `--save-dev` |
| `vite` | Installs Vite |
| `@vitejs/plugin-react` | Installs the React integration plugin for Vite |

### But why are we using -D?

The `-D` flag tells npm to save the packages under `devDependencies` in `package.json`.

We have two important dependency categories.

**Dependencies**

These are packages required by our application.

```json
"dependencies": {
    "react": "*",
    "react-dom": "*"
}
```

Our application uses React and ReactDOM to build and render its interface.

**Development dependencies**

These are packages primarily needed during development and the build process.

```json
"devDependencies": {
    "vite": "*",
    "@vitejs/plugin-react": "*"
}
```

Vite helps us run the development server and generate production builds. The React plugin integrates React-specific functionality into Vite.

For example:

```bash
npm run dev
```

Starts our development server.

```bash
npm run build
```

Creates an optimized production build.

The deployed application uses the generated assets, not the Vite development server.

**The simple distinction:** React and ReactDOM are part of our application's UI functionality. Vite and its React plugin are primarily development and build tools.

---

# 3. Understanding package.json

After initializing the project and installing the packages, we had a `package.json` file.

Ours looked similar to this:

```json
{
  "name": "bridgelabz-react-practice",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "*",
    "react-dom": "*"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "*",
    "vite": "*"
  }
}
```

Let's go through it. There are a few things here that are worth understanding.

### 3.1 name

```json
"name": "bridgelabz-react-practice"
```

This is simply the name of our npm project/package.

It identifies our project in npm tooling.

### 3.2 private

```json
"private": true
```

This tells npm that we don't intend to publish this package to the public npm registry.

For example, if we accidentally execute:

```bash
npm publish
```

npm refuses to publish the package because it is marked private.

One thing to remember: this does NOT make our GitHub repository private. It only prevents accidental npm publication.

### 3.3 version

```json
"version": "1.0.0"
```

This represents the version of our project.

It generally follows Semantic Versioning:

```text
MAJOR.MINOR.PATCH
```

For example:

| Version | Meaning |
|---|---|
| 1.0.0 | Initial stable release |
| 1.1.0 | New backward-compatible functionality |
| 1.1.1 | Bug fix |
| 2.0.0 | Major release with potentially breaking changes |

### 3.4 type

```json
"type": "module"
```

This one deserves its own explanation.

It tells Node.js to interpret `.js` files in our package scope as ES modules by default.

We'll understand why this matters in Section 6.

### 3.5 scripts

```json
"scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
}
```

These are commands that npm allows us to execute using convenient names.

**dev**

```bash
npm run dev
```

Starts the Vite development server.

Usually, we'll get a local URL:

```text
http://localhost:5173
```

It also provides development features such as Hot Module Replacement (HMR).

**build**

```bash
npm run build
```

Creates the production build.

The generated files are placed inside the `dist` directory.

For example:

```text
dist/
├── index.html
└── assets/
    ├── index-xxxxx.js
    └── index-xxxxx.css
```

**preview**

```bash
npm run preview
```

Runs a local server to preview the production build.

Remember that preview doesn't generate the build. We must execute `npm run build` first.

### 3.6 dependencies

```json
"dependencies": {
    "react": "*",
    "react-dom": "*"
}
```

Contains the packages used by our application.

### 3.7 devDependencies

```json
"devDependencies": {
    "@vitejs/plugin-react": "*",
    "vite": "*"
}
```

Contains our development and build tools.

**A small improvement for our repository:** We initially used `*` for the package versions. We should avoid wildcard versions in a serious project because they can introduce unexpected dependency updates.

We can inspect our installed versions using:

```bash
npm list --depth=0
```

We should retain the appropriate version ranges generated by npm and commit `package-lock.json`. This lock file records the resolved dependency tree and makes installations more reproducible.

---

# 4. Understanding JavaScript Modules

Before we get deeper into React, let's understand something we used throughout the project: `import` and `export`.

Imagine we have two JavaScript files.

**math.js**

```javascript
export function add(a, b) {
    return a + b;
}
```

**app.js**

```javascript
import { add } from './math.js';

console.log(add(10, 20));
```

Output:

```text
30
```

We created a function in one file and made it available to another file.

- `export` makes functionality available outside its file.
- `import` allows another file to use that functionality.

This is called the ES Module system (ESM).

We used exactly the same concept when creating our React components.

But there's something interesting here: JavaScript has both default exports and named exports.

We'll encounter the difference when we discuss our Header component.

---

# 5. Understanding Vite Configuration

We also worked with `vite.config.js`.

This is where we configure Vite and tell it which plugins to use.

A typical React configuration looks like this:

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()]
});
```

Let's understand it.

- `defineConfig()` helps define the Vite configuration.
- `react()` initializes the React plugin.
- `plugins` tells Vite which plugins to use.
- `export default` makes the configuration available to Vite.

The React plugin provides functionality such as JSX transformation and React Fast Refresh during development.

Think of it this way: Vite manages the development and build process, while the React plugin integrates React-specific functionality into that process.

---

# 6. Why Do We Have type: module in Two Places?

This was one of my questions.

We had:

```json
"type": "module"
```

Inside `package.json`, and:

```html
<script type="module" src="/src/main.jsx"></script>
```

Inside `index.html`.

They look almost identical. So why do we need both?

Let's separate them.

### 6.1 In package.json

```json
"type": "module"
```

This is read by Node.js.

It tells Node.js to interpret `.js` files in our package scope as ES modules by default.

That means we can write:

```javascript
import { defineConfig } from 'vite';
```

And:

```javascript
export default defineConfig({});
```

Without this setting, Node.js traditionally treats `.js` files as CommonJS by default.

CommonJS uses:

```javascript
const math = require('./math');
```

And:

```javascript
module.exports = add;
```

ES Modules use:

```javascript
import { add } from './math.js';
```

And:

```javascript
export { add };
```

### 6.2 In index.html

Now consider:

```html
<script type="module" src="/src/main.jsx"></script>
```

This is read by the browser.

It tells the browser to treat the referenced script as a JavaScript module.

Why is that necessary?

Because our `main.jsx` contains imports:

```jsx
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
```

The browser needs module-script behavior to load JavaScript modules and their dependencies.

Vite processes our JSX and serves the transformed modules.

### The difference

| Configuration | Read by | Purpose |
|---|---|---|
| `"type": "module"` | Node.js | Controls the default module system for `.js` files in the package |
| `type="module"` | Browser | Tells the browser to treat the script as an ES module |

They are not duplicates. They configure two different environments.

---

# 7. Our First App.jsx – Starting with Something Simple

Now comes the interesting part: actually writing React code.

We didn't start with components, hooks or complicated logic.

We started with a very simple `App.jsx`.

Our initial code looked like this:

```jsx
function App() {

    return (
        <div>
            <h1>Hello, React!</h1>

            <p>
                Welcome to my ReactJS Development Practice.
            </p>

            <h2>Learning React with Vite</h2>
        </div>
    );

}

export default App;
```

And that's it!

A function called `App`, returning some JSX.

Let's understand what we have written.

- `function App()` – Defines a JavaScript function that acts as a React component.
- `return` – Returns the JSX describing our interface.
- `<div>` – A wrapper element containing our other elements.
- `<h1>`, `<p>` and `<h2>` – Elements that form our UI.
- `export default App` – Makes the component available to other files as the default export.

When React renders this component, the browser displays our heading and paragraphs.

At this point, we had a very basic React application.

But we didn't stop there. We started experimenting with the component.

---

# 8. Experimenting with JSX and JavaScript Variables

One of the interesting things about JSX is that we can use JavaScript expressions inside it.

Let's say we have:

```jsx
const studentName = "Rahul";
const course = "ReactJS Development Practice";
const year = 3;
```

Now, instead of hardcoding everything inside our JSX, we can reference these variables.

For example:

```jsx
<p>Name: {studentName}</p>
<p>Course: {course}</p>
<p>Year: {year}</p>
```

Notice the curly braces.

```jsx
{studentName}
```

Inside JSX, curly braces allow us to evaluate JavaScript expressions.

We can also use them inside a sentence:

```jsx
<p>
    Welcome to {course}, {studentName}!
</p>
```

The browser will display:

```text
Welcome to ReactJS Development Practice, Rahul!
```

This is much more interesting than writing static HTML!

## 8.1 What else can we put inside JSX?

We also experimented with storing JSX inside a variable.

```jsx
const element = <h1>Hello, React!</h1>;
```

And then directly referencing it:

```jsx
return (
    <div>
        {element}
    </div>
);
```

Yes, we can store a JSX element inside a JavaScript variable and use it inside another JSX structure.

This is a useful demonstration of how JSX and JavaScript work together.

One small distinction: `element` is a React element, not a React component. A component is something like our `App` function.

---

# 9. Creating Our First Separate Component – Header.jsx

Now we wanted to make our application a little more organized.

Instead of putting everything inside `App.jsx`, we created a separate component.

Our structure became:

```text
src/
│
├── App.jsx
├── main.jsx
│
└── components/
    └── Header.jsx
```

Inside `Header.jsx`, we created our Header component.

```jsx
function Header() {
    return (
        <header>
            <h1>ReactJS Development Practice</h1>
        </header>
    );
}

export default Header;
```

Now, how do we use this component inside `App.jsx`?

We import it:

```jsx
import Header from './components/Header.jsx';
```

And use it like this:

```jsx
<Header />
```

That's it!

We created a component in one file, exported it, imported it into another file and rendered it.

Our application was becoming more organized.

But this is where I had an interesting doubt.

## 9.1 My question – Are we importing the function Header from Header.jsx? What if the function is named Hem instead?

I noticed something.

We wrote:

```jsx
import Header from './components/Header.jsx';
```

And inside `Header.jsx`:

```jsx
function Header() {
    return <h1>Hello</h1>;
}

export default Header;
```

So, are we importing the function `Header()` from the file `Header.jsx`?

What happens if I change the function name to `Hem()`?

Would I then have to write:

```jsx
import { Hem } from './components/Header.jsx';
```

This is where we need to understand the difference between default exports and named exports.

### A. Default export

Our original code:

```jsx
function Header() {
    return <h1>Hello</h1>;
}

export default Header;
```

Because this is a default export, we can import it using any local name.

For example:

```jsx
import Header from './components/Header.jsx';
```

Or even:

```jsx
import Hem from './components/Header.jsx';
```

Both work!

Why?

Because with a default export, the name used in the importing file is chosen by the importer. It does not have to match the original function name.

We could even write:

```jsx
function Hem() {
    return <h1>Hello</h1>;
}

export default Hem;
```

And import it as:

```jsx
import Header from './components/Header.jsx';
```

This is perfectly valid.

### B. Named export

Now suppose we write:

```jsx
export function Hem() {
    return <h1>Hello</h1>;
}
```

Here, we are using a named export.

We import it using its exported name:

```jsx
import { Hem } from './components/Header.jsx';
```

If we want to use another local name, we can use an alias:

```jsx
import { Hem as Header } from './components/Header.jsx';
```

### The difference

| Default export | Named export |
|---|---|
| One default export per module | Multiple named exports are allowed |
| Import without curly braces | Import with curly braces |
| Importer chooses the local name | Importer uses the exported name, unless aliased |

**The important realization:** The filename and function name are not automatically connected. What matters is what the file exports and how we import it.

This was a small question, but it helped us understand JavaScript modules much better.

---

# 10. Bringing Everything Together – Our App.jsx Starts Growing

Now we had our Header component, and we wanted to bring it into our main application.

We also started experimenting with variables, JSX elements and event handling.

Our `App.jsx` gradually evolved into something like this:

```jsx
import Header from './components/Header.jsx';
import LifecycleDemo from './components/LifecycleDemo.jsx';

function App() {

    const studentName = "Rahul";
    const course = "ReactJS Development Practice";
    const year = 3;

    const element = <h1>Hello, React!</h1>;

    return (
        <div>

            {element}

            <Header />

            <h1>Student Information</h1>

            <p>Name: {studentName}</p>

            <p>Course: {course}</p>

            <p>Year: {year}</p>

            <p>
                Welcome to {course}, {studentName}!
            </p>

            <LifecycleDemo />

        </div>
    );
}

export default App;
```

At this stage, our application was no longer just a heading and two paragraphs.

We had:

- A separate Header component.
- JavaScript variables.
- JSX stored inside a variable.
- JavaScript expressions inside JSX.
- A separate LifecycleDemo component.

And we were learning how to compose these different pieces into one application.

But we still had one more experiment to perform.

---

# 11. Experimenting with Button Clicks and Ordinary Variables

We wanted to see how React handles user interactions.

So we introduced a counter.

Our code became:

```jsx
function App() {

    var counter = 0;

    function handleClick() {
        counter++;
    }

    return (
        <div>
            <p>Counter: {counter}</p>

            <button onClick={handleClick}>
                Click Me
            </button>
        </div>
    );
}
```

Now, something interesting happens.

We click the button, and the function executes.

```javascript
function handleClick() {
    counter++;
}
```

The value of `counter` is incremented.

But the number displayed on the screen doesn't update.

Why?

Because **changing an ordinary JavaScript variable does not tell React that it needs to render the component again.**

React doesn't automatically track changes to ordinary local variables.

When `handleClick()` executes, the variable changes, but React isn't notified about that change.

So the displayed UI remains the same.

This was the observation we recorded in our code:

```jsx
// Just know this won't be rendering on the screen when you press
// the button. It will still be 0 because the component is not
// re-rendering when the counter variable is updated.
//
// To make it re-render, we would need state (useState Hook)
// instead of a regular variable.
```

And this leads us to one of the most important concepts in React:

**State.**

We haven't implemented the state-based counter in this particular exercise yet, but this experiment gives us a reason to learn `useState()` in the next relevant lesson.

One more important detail: if the component does happen to render again for another reason, a normal local variable is initialized again when the component function executes.

That's another reason ordinary local variables are not suitable for storing values that need to persist across renders.

The important takeaway:

- Ordinary variables can store values.
- Updating an ordinary variable does not trigger a React render.
- React state is designed for values that need to affect the rendered UI.

---

# 12. Introducing LifecycleDemo.jsx

We also created another component to observe how components behave during their lifecycle.

Our file:

```text
src/components/LifecycleDemo.jsx
```

The implementation:

```jsx
import { useEffect } from 'react';

function LifecycleDemo() {

    useEffect(() => {

        console.log("Component Mounted");

        return () => {
            console.log("Component Unmounted");
        };

    }, []);

    return (
        <div>
            <h2>Lifecycle Demonstration</h2>

            <p>
                Open the browser console to observe the lifecycle.
            </p>
        </div>
    );
}

export default LifecycleDemo;
```

And we imported it into `App.jsx`:

```jsx
import LifecycleDemo from './components/LifecycleDemo.jsx';
```

Then used:

```jsx
<LifecycleDemo />
```

Now we had a component that could help us observe effect setup and cleanup.

But before understanding the console output, we needed to understand `useEffect()`.

## 12.1 What is useEffect()?

`useEffect()` is a React Hook.

It allows a component to synchronize with external systems.

Some examples:

- Fetching information from an API.
- Adding event listeners.
- Setting up subscriptions.
- Working with timers.
- Managing connections to external services.

Its general structure is:

```jsx
useEffect(() => {
    // Effect logic
}, [dependencies]);
```

There are two important things here:

1. The effect function.
2. The dependency array.

The dependency array determines when React needs to re-run the effect.

## 12.2 What does the empty dependency array mean?

Our code contains:

```jsx
useEffect(() => {

    console.log("Component Mounted");

    return () => {
        console.log("Component Unmounted");
    };

}, []);
```

Notice the empty array:

```jsx
[]
```

It means that the effect doesn't need to re-run because of changes to props or state.

Under normal production behavior, the sequence is:

1. Component renders.
2. React commits it to the DOM.
3. The effect runs.
4. When the component is removed, the cleanup function runs.

## 12.3 What is the cleanup function?

Look at this:

```jsx
return () => {
    console.log("Component Unmounted");
};
```

We are returning a function from inside the effect.

We aren't calling that function immediately.

React stores it and executes it when the effect needs to be cleaned up.

For example, imagine that we establish a connection to a server.

```jsx
useEffect(() => {

    const connection = connectToServer();

    return () => {
        connection.disconnect();
    };

}, []);
```

The effect establishes the connection, and the cleanup function disconnects it.

This helps prevent unnecessary connections from remaining active.

## 12.4 Three dependency patterns

**Case 1 – No dependency array**

```jsx
useEffect(() => {
    console.log("Effect executed");
});
```

Runs after every committed render.

**Case 2 – Empty dependency array**

```jsx
useEffect(() => {
    console.log("Effect executed");
}, []);
```

Runs after the initial mount, with an additional development check when StrictMode is enabled.

It does not re-run because of props or state changes.

**Case 3 – Dependency array with values**

```jsx
useEffect(() => {
    console.log("Name changed");
}, [name]);
```

Runs after the initial mount and when `name` changes.

---

# 13. Why Are We Seeing Extra Logs? Understanding StrictMode

In our `main.jsx`, we used:

```jsx
ReactDOM.createRoot(
    document.getElementById('root')
).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
```

So what exactly is `StrictMode`?

It's a development tool provided by React that helps identify potential problems in our application.

Among other checks, it performs an additional setup-and-cleanup cycle for effects in development.

Let's see why that matters.

Suppose our effect is:

```jsx
useEffect(() => {

    console.log("Effect setup");

    return () => {
        console.log("Effect cleanup");
    };

}, []);
```

With StrictMode enabled, we may see:

```text
Effect setup
Effect cleanup
Effect setup
```

Why?

React performs an additional development check:

1. Runs the effect setup.
2. Runs the cleanup.
3. Runs the setup again.

This helps us check whether our effects are correctly cleaning up after themselves.

Imagine opening a connection to a server but forgetting to close it.

That could result in unnecessary active connections.

StrictMode helps expose this kind of problem during development.

**Important:** This additional effect cycle is a development-only check. It does not mean our production application mounts twice.

## 13.1 What if we remove StrictMode?

We can temporarily modify `main.jsx`:

```jsx
ReactDOM.createRoot(
    document.getElementById('root')
).render(
    <App />
);
```

Now refresh the application.

We should normally observe the effect setup once during the initial mount.

After experimenting, we should put StrictMode back.

## 13.2 How does this relate to class component lifecycle methods?

Historically, React class components used lifecycle methods such as:

- `componentDidMount()`
- `componentDidUpdate()`
- `componentWillUnmount()`

Functional components use Hooks such as `useEffect()` to manage effect setup and cleanup.

A conceptual comparison:

| Class components | Functional components |
|---|---|
| `componentDidMount()` | Effect setup after mount |
| `componentDidUpdate()` | Effect re-running when dependencies change |
| `componentWillUnmount()` | Effect cleanup |

These are conceptual correspondences, not exact one-to-one replacements.

We'll explore class components in the next feature, so this connection will become more useful then.

---

# 14. Understanding How Everything Connects – The Complete Execution Flow

At this point, we had created several files and components.

But how does everything actually come together when we open the browser?

Let's follow the complete journey.

```text
User opens localhost:5173
          |
          v
      index.html
          |
          | Contains the root element
          | and loads main.jsx
          v
       main.jsx
          |
          | Finds the root element
          | and initializes ReactDOM
          v
       App.jsx
          |
          | Main application component
          v
  Header.jsx and other
    child components
          |
          | Reusable UI components
          v
      Browser DOM
          |
          v
  Rendered User Interface
```

Let's go through it one more time.

### Step 1 – The user opens the application

We open:

```text
http://localhost:5173
```

Vite serves our application.

### Step 2 – The browser loads index.html

Our HTML contains:

```html
<div id="root"></div>
```

And:

```html
<script type="module" src="/src/main.jsx"></script>
```

The browser creates the DOM representation of the HTML and loads our JavaScript entry point.

### Step 3 – main.jsx initializes ReactDOM

We use:

```javascript
document.getElementById('root')
```

This finds our empty HTML element.

Then:

```javascript
ReactDOM.createRoot(rootElement)
```

Creates a React root associated with that element.

Finally:

```javascript
root.render(<App />);
```

Tells React to render our application.

### Step 4 – App.jsx gets executed

React evaluates the App component.

App imports and uses Header, LifecycleDemo and other child components.

### Step 5 – React renders the component tree

React processes the component structure and renders the resulting UI into the root container.

### Step 6 – The browser displays the application

And there it is!

Our HTML, JavaScript, React components and ReactDOM have all worked together to produce the interface.

One small but important clarification: `root` is not a folder. It is an HTML DOM element. React manages the application UI inside that element.

Also, the element doesn't have to be called `root`. We could use `app`, `container` or another ID, provided that `main.jsx` uses the same ID.

---

# 15. The Questions I Asked – My Doubts and Their Answers

This is one of the sections I want to preserve particularly carefully.

These aren't just interview questions. These are the things I genuinely wanted to understand while implementing the feature.

### Q1. Why do we install both React and ReactDOM if we are only importing ReactDOM?

**My doubt:**

We executed:

```bash
npm install react react-dom
```

But in `main.jsx`, we were importing:

```jsx
import ReactDOM from 'react-dom/client';
```

Why do we need both?

**What we learned:**

React provides the core component and UI functionality.

ReactDOM provides the browser renderer.

Our React components use React's functionality, and ReactDOM connects the component tree to the browser DOM.

Installing a package and explicitly importing it into a particular file are different things. A package can be used by other modules in the application.

Also, modern React projects generally don't require a manual React import just to write JSX because they use the automatic JSX runtime.

### Q2. What does each part of npm install -D vite @vitejs/plugin-react mean?

**My doubt:**

I wanted to understand the command rather than blindly copy it.

**What we learned:**

- `npm` is the package manager.
- `install` installs packages.
- `-D` means development dependency.
- `vite` installs our development and build tool.
- `@vitejs/plugin-react` integrates React with Vite.

### Q3. What does every property in package.json mean?

**My doubt:**

I wanted to understand the entire configuration.

**What we learned:**

- `name` identifies the project.
- `private` prevents accidental public npm publication.
- `version` identifies the project version.
- `type` configures Node.js module interpretation.
- `scripts` defines reusable npm commands.
- `dependencies` contains application dependencies.
- `devDependencies` contains development and build tools.

### Q4. Why do we have type: module in package.json and type="module" in HTML?

**My doubt:**

Both look similar. Why do we need them in different places?

**What we learned:**

The package.json property is read by Node.js and configures the default module system for `.js` files in the package.

The HTML attribute is read by the browser and tells it to treat the referenced script as an ES module.

They serve different environments.

### Q5. Why do we have an empty root element in index.html?

**My observation:**

We wrote:

```html
<div id="root"></div>
```

Why do we need it?

**What we learned:**

React needs an existing DOM element where it can mount its application.

`main.jsx` finds that element using:

```javascript
document.getElementById('root')
```

ReactDOM then creates a React root associated with it and renders our application.

The root element starts empty, and React renders the application inside it.

### Q6. Are we importing the function Header from Header.jsx? What if the function name is Hem?

**My doubt:**

Would I need to write:

```jsx
import { Hem } from './components/Header.jsx';
```

**What we learned:**

Not necessarily. It depends on the type of export.

For a default export:

```jsx
function Hem() {
    return <h1>Hello</h1>;
}

export default Hem;
```

We can import it as:

```jsx
import Header from './components/Header.jsx';
```

Or:

```jsx
import Hem from './components/Header.jsx';
```

Both work.

For a named export:

```jsx
export function Hem() {
    return <h1>Hello</h1>;
}
```

We import it using:

```jsx
import { Hem } from './components/Header.jsx';
```

The important thing is understanding the difference between default and named exports.

### Q7. Why does my counter not update when I click the button?

**My observation:**

We wrote:

```jsx
var counter = 0;

function handleClick() {
    counter++;
}
```

The button executes the function, but the UI still shows zero.

**What we learned:**

React doesn't track ordinary JavaScript variables.

Changing `counter` does not notify React that the UI needs to be rendered again.

For that, React provides state through Hooks such as `useState()`.

This experiment gave us a reason to learn state management.

### Q8. What does the empty dependency array in useEffect() mean?

**My doubt:**

Why did we write `[]` at the end of our effect?

**What we learned:**

The empty dependency array means the effect does not re-run because of changes to props or state.

It runs after the initial mount, subject to the additional development checks performed by StrictMode.

The returned function is the cleanup function, which React executes when the effect is being cleaned up.

### Q9. Why does StrictMode sometimes execute the effect more than once?

**My doubt:**

Was something wrong with my code?

**What we learned:**

Not necessarily.

StrictMode intentionally performs an additional effect setup-and-cleanup cycle in development to help identify missing cleanup logic and other problems.

It is intentional behavior, not a production double-mount requirement.

---

# 16. Final App.jsx – What We Had Built

After our experiments, the `App.jsx` code looked like this:

```jsx
import Header from './components/Header.jsx';
import LifecycleDemo from './components/LifecycleDemo.jsx';

function App() {

    const studentName = "Rahul";
    const course = "ReactJS Development Practice";
    const year = 3;

    // A normal variable will not trigger a React re-render.
    var counter = 0;

    function handleClick() {
        counter++;
    }

    const element = <h1>Hello, React!</h1>;

    return (
        <div>

            {element}

            <Header />

            <h1>Student Information</h1>

            <p>Name: {studentName}</p>

            <p>Course: {course}</p>

            <p>Year: {year}</p>

            <p>Counter: {counter}</p>

            <p>
                Welcome to {course}, {studentName}!
            </p>

            <button onClick={handleClick}>
                Click Me
            </button>

            <LifecycleDemo />

        </div>
    );
}

export default App;
```

Notice how much this has grown compared to our original component!

We started with a heading and two paragraphs.

Now we have:

- Imported components.
- JavaScript variables.
- JSX expressions.
- A JSX element stored in a variable.
- Event handling.
- An experiment with ordinary variables.
- A lifecycle demonstration.

This is why I want to document the progression rather than just preserve the final code. The final code tells us what we wrote, but the journey explains why we wrote it.

---

# 17. Git Progress – Saving Our Work

After implementing the initial feature and documenting our work, we committed and pushed our branch.

Our branch:

```text
feature/01-react-getting-started
```

Our commit message:

```bash
git commit -m "[Asher Mustafa]: Implement React Getting Started"
```

And our push command:

```bash
git push -u origin feature/01-react-getting-started
```

Git confirmed that the branch was successfully pushed to GitHub.

Our commit hash was:

```text
31833eb
```

We also encountered some LF/CRLF warnings.

These are line-ending differences between operating systems:

- LF – Line Feed.
- CRLF – Carriage Return + Line Feed.

They were warnings, not errors. Our commit and push were successful.

### Was the feature completely finished?

Not automatically.

We had successfully pushed the initial implementation, but our discussion identified practical exercises and final documentation/integration as remaining tasks.

We should distinguish between:

- Implementation pushed successfully.
- Concepts covered.
- Exercises completed.
- Documentation completed.
- Feature merged into `develop`.

A successful push alone does not establish that all these steps are complete.

---

# 18. Things I Should Remember Before Moving Forward

Here are the important things I want to be able to explain without looking at this README.

| Concept | What I should remember |
|---|---|
| npm init -y | Initializes the npm project using default answers |
| dependencies | Packages used by the application |
| devDependencies | Development and build tools |
| Vite | Development server and production build tool |
| JSX | HTML-like syntax inside JavaScript |
| Curly braces in JSX | Allow JavaScript expressions inside JSX |
| Component | A reusable piece of UI |
| Export | Makes functionality available to other modules |
| Import | Allows another module to use exported functionality |
| Default export | Can be imported using a chosen local name |
| Named export | Imported using its exported name, unless aliased |
| React | Core UI library |
| ReactDOM | Browser renderer |
| createRoot() | Creates a React root associated with an existing DOM element |
| render() | Renders the React application |
| root element | The DOM container for the React application |
| useEffect() | Synchronizes a component with external systems |
| Cleanup function | Handles effect cleanup |
| StrictMode | Helps identify potential problems during development |
| Ordinary variable | Updating it does not trigger a React re-render |
| useState() | Provides state that can trigger re-rendering when updated |

---

# 19. What Comes Next?

We have established the basic foundation of a React application.

We know how the project starts, how files communicate, how components are created, how JSX works and how React renders the interface.

But we have also discovered a few things that we haven't explored deeply yet.

For example:

- How does React state work?
- How do we create functional components properly?
- What are class components?
- How do parent and child components communicate?
- What is component composition?
- How do we organize reusable components?
- What's the difference between named and default exports in larger applications?

These questions naturally lead us to our next feature:

**Feature 02 – React Components**

We'll continue implementing concepts rather than just reading about them.

And as always, we'll keep our questions, experiments and explanations in the documentation.

---

## Final Note

The most important thing I want to take away from this feature isn't a list of React APIs.

It's the understanding of how everything connects.

We started with an empty project, initialized npm, installed React and Vite, created our first component, experimented with JSX, separated our Header into its own file, discovered how imports and exports work, tried handling button clicks, and finally explored effect setup and cleanup.

There were questions along the way, and those questions helped us understand the concepts more deeply.

That's the entire point of maintaining this repository: not just to have code on GitHub, but to have a record of what I learned, what I struggled with, and how I eventually understood it.

**Feature 01 – React Getting Started.**