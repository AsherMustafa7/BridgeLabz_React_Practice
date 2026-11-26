# Feature 02 – React Components

## 1. Introduction

In this feature, we explore one of the most important building blocks of React: **components**.

Almost everything we create in React will revolve around components. Whether we are building a Student Management System, an Employee Management System, or a larger application, we will divide the interface into smaller, reusable pieces.

Instead of writing an entire application inside one large component, React allows us to create smaller components, give each one a responsibility, and combine them to build the complete application.

In this feature, we will learn about:

1. Introduction to React Components
2. Functional Components
3. Class Components
4. Component naming conventions
5. Creating and exporting components
6. Named exports vs Default exports
7. Importing and reusing components
8. Nested components
9. Parent-child relationships
10. Component composition
11. Reusable and modular component design

We will learn these concepts by implementing a small Student Management dashboard.

---

## 2. Preparing the Git branch

Before starting a new feature, we first make sure that our previous feature has been merged into `develop`.

Feature 01 – React Getting Started should already be merged.

Once that is done, we switch to `develop`, pull the latest changes, and create a new feature branch.

```bash
# Switch to develop
git switch develop

# Pull latest changes
git pull origin develop

# Create Feature 02
git switch -c feature/02-react-components

# Verify the branch
git branch
```

Our new branch is:

```text
feature/02-react-components
```

Keeping each feature in a separate branch helps us maintain a clean development history.

---

## 3. Implementation – Building the Student Dashboard

Rather than starting with lengthy theoretical explanations, we first implement a small application and then understand the concepts behind it.

Our application will display:

- A header containing the application name.
- A welcome message.
- A list of students.
- A footer.

We will use four functional components and one class component.

### 3.1 Creating the component files

Inside `src/components/`, create the following files:

```text
src/
│
├── App.jsx
│
└── components/
    │
    ├── Header.jsx
    ├── Footer.jsx
    ├── StudentCard.jsx
    ├── StudentDetails.jsx
    └── WelcomeMessage.jsx
```

Each component will have a specific responsibility.

| Component | Responsibility |
|---|---|
| Header | Displays the application heading |
| Footer | Displays footer information |
| StudentCard | Displays information about one student |
| StudentDetails | Manages the student list and renders student cards |
| WelcomeMessage | Displays a welcome message using a class component |

### 3.2 Creating the Header component

**File:** `src/components/Header.jsx`

We begin with a simple functional component.

```jsx
function Header() {

    return (
        <header>
            <h1>Student Management System</h1>
            <p>React Components Learning</p>
        </header>
    );

}

export default Header;
```

A few things are happening here:

- `Header` is a JavaScript function.
- It returns JSX describing the header UI.
- `export default Header` makes this component the default export of the module.

We will understand the export part in more detail later.

### 3.3 Creating the Footer component

**File:** `src/components/Footer.jsx`

The footer is another functional component.

```jsx
function Footer() {

    return (
        <footer>
            <p>ReactJS Development Practice</p>
            <p>Learning Components</p>
        </footer>
    );

}

export default Footer;
```

Notice that we are following the same structure as `Header`.

The component has its own file and responsibility. We can import and reuse it wherever the application needs a footer.

### 3.4 Creating the StudentCard component

**File:** `src/components/StudentCard.jsx`

Now we create a component that displays information about an individual student.

```jsx
export function StudentCard({ name, department, cgpa }) {

    return (
        <div>
            <h3>{name}</h3>

            <p>Department: {department}</p>

            <p>CGPA: {cgpa}</p>

            <hr />
        </div>
    );

}
```

There is something different about this component.

Instead of writing:

```jsx
function StudentCard() {
    // ...
}

export default StudentCard;
```

We are writing:

```jsx
export function StudentCard() {
    // ...
}
```

This makes `StudentCard` a **named export**.

We will revisit the difference between named and default exports shortly.

Also notice the function parameters:

```jsx
function StudentCard({ name, department, cgpa })
```

The component receives an object and extracts these three properties.

This is the basic syntax we will use when working with component data. We will study the concept of Props in more detail in Feature 04.

### 3.5 Creating the StudentDetails component

**File:** `src/components/StudentDetails.jsx`

This component is where we bring our student cards together.

First, we import the `StudentCard` component:

```jsx
import { StudentCard } from './StudentCard.jsx';
```

Notice the curly braces. We use them because `StudentCard` is a named export.

Now let's create the component.

```jsx
import { StudentCard } from './StudentCard.jsx';

function StudentDetails() {

    const students = [
        {
            id: 1,
            name: "Asher",
            department: "Computer Science",
            cgpa: 9.86
        },
        {
            id: 2,
            name: "Aryan",
            department: "Information Technology",
            cgpa: 9.45
        },
        {
            id: 3,
            name: "Rahul",
            department: "Computer Science",
            cgpa: 8.95
        }
    ];

    return (
        <section>

            <h2>Student Details</h2>

            {students.map((student) => (

                <StudentCard
                    key={student.id}
                    name={student.name}
                    department={student.department}
                    cgpa={student.cgpa}
                />

            ))}

        </section>
    );

}

export default StudentDetails;
```

There are a few important things to notice.

**First: We have an array of student objects.**

Each student has an ID, name, department, and CGPA.

**Second: We use `map()` to iterate over the array.**

```jsx
students.map((student) => (
    // ...
))
```

For every student in the array, we return a `StudentCard` component.

**Third: We render the same component multiple times.**

```jsx
<StudentCard
    key={student.id}
    name={student.name}
    department={student.department}
    cgpa={student.cgpa}
/>
```

We are not writing separate JSX for Asher, Aryan, and Rahul.

Instead, we reuse the same component and provide different student information to each rendered instance.

This is one of the practical benefits of reusable components.

**Fourth: We provide a `key`.**

```jsx
key={student.id}
```

React uses keys to identify elements in a list across renders. We will understand this in more detail in the theory section.

### 3.6 Creating a Class Component

**File:** `src/components/WelcomeMessage.jsx`

So far, we have created functional components.

However, our review also includes class components, so we deliberately create one here.

```jsx
import { Component } from 'react';

class WelcomeMessage extends Component {

    render() {

        return (
            <div>
                <h2>Welcome to React Components!</h2>

                <p>
                    This component was created using
                    a Class Component.
                </p>
            </div>
        );

    }

}

export default WelcomeMessage;
```

Notice the difference in structure.

Instead of creating a JavaScript function, we create a class that extends React's `Component` class.

We also define a `render()` method, which returns the UI.

We will examine this structure when comparing functional and class components.

### 3.7 Updating App.jsx

**File:** `src/App.jsx`

Now that we have created our individual components, we need to bring them together.

We import all four components into `App.jsx`:

```jsx
import Header from './components/Header.jsx';

import Footer from './components/Footer.jsx';

import StudentDetails from './components/StudentDetails.jsx';

import WelcomeMessage from './components/WelcomeMessage.jsx';


function App() {

    return (
        <div>

            <Header />

            <WelcomeMessage />

            <StudentDetails />

            <Footer />

        </div>
    );

}

export default App;
```

Our `App` component now acts as the parent that combines all the smaller components.

Instead of writing the entire dashboard inside `App.jsx`, we simply include the components we created.

This is the basic idea behind component composition.

### 3.8 Expected application output

When we save the files and run the application, the browser should display something similar to:

```text
Student Management System

React Components Learning


Welcome to React Components!

This component was created using a Class Component.


Student Details

Asher
Department: Computer Science
CGPA: 9.86

Aryan
Department: Information Technology
CGPA: 9.45

Rahul
Department: Computer Science
CGPA: 8.95


ReactJS Development Practice
Learning Components
```

At this point, we have a working example of several components being combined into one application.

---

## 4. Understanding React Components

Now that we have implemented the application, let's understand what we actually created.

### 4.1 What exactly is a React component?

A React component is an independent, reusable piece of UI.

Think about a website like Amazon.

It contains different sections:

- Navigation bar
- Search bar
- Product cards
- Product details
- Shopping cart
- Footer

We could write the entire interface inside one enormous file, but that would make the application difficult to maintain.

Instead, we divide the interface into smaller components.

For example:

| Component | Responsibility |
|---|---|
| Header | Displays the navigation or heading |
| StudentDetails | Displays student information |
| StudentCard | Displays one student's information |
| Footer | Displays footer information |

Each component has a specific responsibility.

This approach is called **component-based architecture**.

The main idea is simple: build smaller pieces independently and combine them to create a larger interface.

### 4.2 Functional Components

Let's revisit our Header component.

```jsx
function Header() {

    return (
        <header>
            <h1>Student Management System</h1>
        </header>
    );

}
```

A functional component is simply a JavaScript function that returns a React node describing the UI.

Notice:

```jsx
function Header()
```

This is an ordinary JavaScript function.

However, React recognizes it as a component when we use it in JSX:

```jsx
<Header />
```

Functional components can also use React Hooks, such as:

```jsx
useState()
useEffect()
useContext()
```

We will explore these in later features.

**An important naming convention:**

A component's name must start with an uppercase letter when we want to use it as a custom JSX component.

Correct:

```jsx
<Header />
```

Incorrect for referencing our custom component:

```jsx
<header />
```

The lowercase version is interpreted as an HTML element, not as our `Header` component.

### 4.3 Class Components

Now let's revisit `WelcomeMessage`.

```jsx
import { Component } from 'react';

class WelcomeMessage extends Component {

    render() {

        return (
            <h2>Welcome to React!</h2>
        );

    }

}
```

Let's break this down.

**First:**

```jsx
class WelcomeMessage extends Component
```

We are creating a JavaScript class that inherits from React's `Component` class.

This is an example of inheritance in JavaScript.

**Second:**

```jsx
render()
```

A class component must provide a `render()` method.

This method returns the React elements describing what should appear on the screen.

**Third:**

```jsx
return <h2>Welcome to React!</h2>;
```

This is the UI that the component describes.

Class components are still supported by React, but functional components with Hooks are the recommended approach for new development.

### 4.4 Functional Components vs Class Components

| Functional Components | Class Components |
|---|---|
| Created using JavaScript functions | Created using JavaScript classes |
| Return JSX or other React nodes | Use a `render()` method |
| Use Hooks for state and other React features | Use class state and lifecycle methods |
| Do not require `this` for component state | Use `this` to access instance members |
| Recommended for modern React development | Still supported and found in older codebases |

**Interview question: Can functional components do everything class components do?**

Modern React provides Hooks that allow functional components to manage state, effects, context, and other React features that were traditionally handled by class components.

There are still some class-specific APIs, such as traditional Error Boundaries, for which React's built-in implementation uses class components.

The important thing to remember is that functional components are the standard approach for new React development, but understanding class components is useful when working with older React applications.

---

## 5. Creating and Exporting Components

Now let's understand how our components are made available to other files.

In JavaScript, modules can export values so that other modules can import and use them.

React uses this same JavaScript module system.

There are two important types of exports:

1. Default exports
2. Named exports

### 5.1 Default Exports

Look at our `Header.jsx` file:

```jsx
function Header() {

    return (
        <header>
            <h1>Student Management System</h1>
        </header>
    );

}

export default Header;
```

The important line is:

```jsx
export default Header;
```

This makes `Header` the default export of that module.

We import it in `App.jsx` like this:

```jsx
import Header from './components/Header.jsx';
```

Notice that we do not use curly braces.

A module can have only one default export.

### 5.2 Named Exports

Now look at our `StudentCard.jsx` file:

```jsx
export function StudentCard() {

    return <h3>Student Card</h3>;

}
```

Here, we directly use `export` before the function declaration.

This makes `StudentCard` a named export.

We import it using:

```jsx
import { StudentCard } from './components/StudentCard.jsx';
```

Notice the curly braces.

A module can have multiple named exports.

For example:

```jsx
export function Header() {}

export function Footer() {}

export function Sidebar() {}
```

We can import all three:

```jsx
import { Header, Footer, Sidebar } from './Layout.jsx';
```

We can also rename a named import using `as`:

```jsx
import { Header as MainHeader } from './Layout.jsx';
```

Now we can use:

```jsx
<MainHeader />
```

### 5.3 Default Exports vs Named Exports

| Feature | Default Export | Named Export |
|---|---|---|
| Export syntax | `export default Header` | `export function Header()` |
| Import syntax | `import Header from './Header.jsx'` | `import { Header } from './Header.jsx'` |
| Curly braces | Not required | Required for named imports |
| Import name | Can be chosen freely | Must match unless aliased |
| Number per module | One default export | Multiple named exports |

### 5.4 A question that came up: Why can we import Header even though the filename and function name are the same?

We have this code:

**Header.jsx**

```jsx
function Header() {

    return (
        <header>
            <h1>Student Management System</h1>
            <p>React Components Learning</p>
        </header>
    );

}

export default Header;
```

And we import it like this:

```jsx
import Header from './components/Header.jsx';
```

The question was:

*What makes an export a default export? Is it because the filename and function name are the same?*

The answer is **no**.

This line:

```jsx
export default Header;
```

is what makes it a default export.

It has nothing to do with:

- The filename being `Header.jsx`.
- The function being named `Header`.
- The filename and function name matching.

The export statement determines what the module exposes.

The filename is simply used to locate the module.

### 5.5 Can we import it using a different name?

Yes!

This was another important question:

*Can I write `import h from './components/Header.jsx'` and will it still work?*

Absolutely.

All of these are valid:

```jsx
import Header from './components/Header.jsx';
```

```jsx
import h from './components/Header.jsx';
```

```jsx
import StudentHeader from './components/Header.jsx';
```

They all refer to the same default export.

Why?

Because the name after `import` is the local identifier we choose to refer to the default exported value.

For example, consider this:

**Header.jsx**

```jsx
function MyComponent() {
    return <h1>Hello React!</h1>;
}

export default MyComponent;
```

Now look at the import:

**App.jsx**

```jsx
import Header from './components/Header.jsx';
```

This is still valid, even though:

- The filename is `Header.jsx`.
- The function is called `MyComponent`.
- The imported local name is `Header`.

We could also write:

```jsx
import Anything from './components/Header.jsx';
```

The import would still work.

The important distinction is that the default export is imported under the local name we choose.

### 5.6 Why does this work differently for named exports?

Now consider:

**StudentCard.jsx**

```jsx
export function StudentCard() {
    return <h2>Student Card</h2>;
}
```

We import it using:

```jsx
import { StudentCard } from './components/StudentCard.jsx';
```

Here, `StudentCard` is the actual exported name.

We cannot simply write:

```jsx
import { Card } from './components/StudentCard.jsx';
```

unless the module also exports something named `Card`.

However, we can rename the import using `as`:

```jsx
import { StudentCard as Card } from './components/StudentCard.jsx';
```

Now we can use:

```jsx
<Card />
```

### 5.7 The three names are independent

This is the most important takeaway from the question.

There are three separate things:

1. **Filename:** Used to locate the module.
2. **Function name:** The name given to the JavaScript function.
3. **Import name:** The local identifier used in the importing file.

For a default export, these names do not need to match.

Example:

```jsx
// File: Header.jsx

function MyHeader() {
    return <h1>Hello</h1>;
}

export default MyHeader;
```

```jsx
// File: App.jsx

import WhateverNameIWant from './components/Header.jsx';

function App() {
    return <WhateverNameIWant />;
}
```

This is valid.

**Interview takeaway:** A default export allows a module to expose one primary value that can be imported using any local identifier. A named export exposes values under specific names, which must be matched during import unless renamed using `as`.

---

## 6. Nested Components and Component Composition

Now let's look at how our components are connected.

Our application has the following structure:

```text
App
│
├── Header
│
├── WelcomeMessage
│
├── StudentDetails
│   │
│   ├── StudentCard
│   ├── StudentCard
│   └── StudentCard
│
└── Footer
```

This is our **component tree**.

Let's understand the relationships.

- `App` is the parent of `Header`.
- `App` is also the parent of `WelcomeMessage`.
- `App` is the parent of `StudentDetails`.
- `StudentDetails` is the parent of the three rendered `StudentCard` instances.
- `App` is also the parent of `Footer`.

### 6.1 What is component composition?

Component composition means building a larger UI by combining smaller components.

Look at our `App.jsx`:

```jsx
function App() {

    return (
        <div>

            <Header />

            <WelcomeMessage />

            <StudentDetails />

            <Footer />

        </div>
    );

}
```

We are composing the application using smaller components.

Each component handles its own part of the UI.

This makes the application easier to understand, maintain, and extend.

### 6.2 Why do we need reusable components?

Imagine that our Student Management System has 100 students.

Would we create 100 separate JSX blocks?

No.

We create one reusable component:

```jsx
function StudentCard() {
    return (
        <div>
            <h3>Student Name</h3>
        </div>
    );
}
```

Then we render it multiple times.

That is exactly what we did in `StudentDetails.jsx`:

```jsx
students.map((student) => (

    <StudentCard
        key={student.id}
        name={student.name}
        department={student.department}
        cgpa={student.cgpa}
    />

))
```

The same component is used for every student.

Only the information supplied to it changes.

This is one of the main reasons component-based development is useful.

We will explore how information is passed between components through Props in Feature 04.

---

## 7. Understanding the `key` Prop

While implementing `StudentDetails`, we used:

```jsx
key={student.id}
```

Why is this necessary?

React needs a stable way to identify individual elements when rendering lists.

Imagine our list initially contains:

```text
Asher
Aryan
Rahul
```

Now suppose we insert another student at the beginning:

```text
John
Asher
Aryan
Rahul
```

React needs to match the items in the new list with the items from the previous render.

We provide a stable key:

```jsx
key={student.id}
```

This allows React to identify which list item was inserted, removed, or moved.

Good keys should be:

- Unique among sibling elements.
- Stable across renders.
- Based on a reliable identifier, such as a database ID, whenever possible.

Avoid using array indexes as keys when list items can be inserted, deleted, or reordered.

**Important:** The `key` is used by React to track list elements. It is not an ordinary prop that the child component can access through its props.

---

## 8. Understanding Parent-Child Relationships

One important distinction is that a parent component can contain child components, but the child does not automatically get access to all the parent's local variables.

Consider:

```jsx
function App() {

    const name = "Asher";

    return <StudentDetails />;

}
```

Can `StudentDetails` directly access the `name` variable declared inside `App`?

No.

The variable belongs to the local scope of the `App` function.

A child component does not automatically inherit the parent's local variables.

We will learn how to pass information from a parent to a child using **Props** in Feature 04.

This is an important foundation for understanding React's one-way data flow.

---

## 9. Practical Exercises

Before closing this feature, try implementing the following exercises:

1. Create a `DepartmentCard` functional component.
2. Create a class component called `CollegeInfo`.
3. Create a `StudentList` component that renders five `StudentCard` instances.
4. Create a file with three named exports and import all three into `App.jsx`.
5. Move the Header and Footer into a separate `Layout.jsx` component and use them through `Layout`.

These exercises help reinforce component creation, exports, imports, nesting, and composition.

---

## 10. Git Checkpoint

Once the implementation and exercises are complete, run a production build:

```bash
npm run build
```

Then check the repository status:

```bash
git status
```

Stage and commit the changes:

```bash
git add .

git commit -m "[Asher Mustafa]: Implement React Components"
```

Finally, push the feature branch:

```bash
git push -u origin feature/02-react-components
```

Our documentation for this feature will be stored at:

```text
docs/
└── 02-React-Components/
    └── README.md
```

The commands above are the checkpoint for this feature; they should be run after the implementation and exercises are finished.

---

## 11. Final Revision

Let's quickly revisit the main concepts.

| Concept | What to remember |
|---|---|
| React Component | A reusable piece of UI |
| Functional Component | A JavaScript function that returns a React node |
| Class Component | A JavaScript class extending React's `Component` |
| Component Naming | Custom component names start with uppercase letters |
| Default Export | One default value per module; import name can be chosen freely |
| Named Export | Multiple named values can be exported; import by name or alias |
| Component Reuse | The same component can be rendered multiple times |
| Nested Components | A component can render other components |
| Parent-Child Relationship | A parent renders its children, but local variables are not automatically shared |
| Component Composition | Combining smaller components to build a larger UI |
| Keys | Help React identify list elements across renders |

### Interview Questions to Practise

1. What is a React component?
2. What is the difference between functional and class components?
3. Why do component names start with uppercase letters?
4. What is the difference between default and named exports?
5. Can we import a default export using a different name?
6. Can a file contain multiple named exports?
7. What is component composition?
8. What is a component tree?
9. Why do we use keys when rendering lists?
10. Can a child component directly access a parent's local variables?
11. Why is component reusability important?

---

## 12. What Comes Next?

In Feature 02, we learned how to divide an application into smaller components and combine them to build a complete interface.

We also explored functional components, class components, exports, imports, nested components, and parent-child relationships.

The next feature is:

**Feature 03 – Virtual DOM and Reconciliation**

This is particularly important because it will help us understand what React is doing behind the scenes when components render and update.

We have learned how to build an interface using components. Now we will explore how React manages changes to that interface.