# Feature 03 – React Props and State

## 1. Introduction

In the previous feature, we learned how to divide an application into smaller components and combine them to build a complete interface.

We created components such as:

- `Header`
- `Footer`
- `StudentCard`
- `StudentDetails`
- `WelcomeMessage`

But there is something important we haven't explored deeply yet.

**How do components communicate with each other?**

For example:

- How does a parent component send student information to a child?
- How does a child component display information received from its parent?
- What happens when information changes?
- How does React know that something has changed and that the UI needs to be updated?
- How can two components work with the same data?

These questions bring us to two fundamental React concepts:

1. **Props** – Used to pass information between components.
2. **State** – Used to manage data that can change over time.

Together, props and state form the foundation of data flow in React applications.

---

# Part 1 – Props: Component Communication

## 2. What are Props?

Props stands for **properties**.

Props allow a parent component to pass information to its child component.

Let's use our existing Student Management application as an example.

Imagine that we have a `StudentCard` component:

```jsx
<StudentCard
    name="Asher"
    department="Computer Science"
    cgpa={9.86}
/>
```

Here, a parent component renders `StudentCard` and passes three properties:

- `name`
- `department`
- `cgpa`

The child component receives these properties.

```jsx
function StudentCard(props) {

    return (
        <div>
            <h2>{props.name}</h2>
            <p>{props.department}</p>
            <p>{props.cgpa}</p>
        </div>
    );

}
```

Let's understand what is happening.

The parent supplies the information:

```jsx
<StudentCard
    name="Asher"
    department="Computer Science"
    cgpa={9.86}
/>
```

The child receives the information through the `props` parameter:

```jsx
function StudentCard(props)
```

We can then access individual values using:

```jsx
props.name
props.department
props.cgpa
```

**Important:** Props are the mechanism through which data is passed from a parent component to a child component.

This is the basic foundation of parent-to-child communication in React.

## 3. Props Destructuring

Initially, we accessed properties using:

```jsx
props.name
props.department
props.cgpa
```

But JavaScript provides a feature called **destructuring**.

Instead of repeatedly writing `props`, we can extract the properties directly from the object.

```jsx
function StudentCard({ name, department, cgpa }) {

    return (
        <div>
            <h2>{name}</h2>
            <p>{department}</p>
            <p>{cgpa}</p>
        </div>
    );

}
```

Notice the function parameter:

```jsx
function StudentCard({ name, department, cgpa })
```

We are destructuring the incoming props object.

Conceptually, this is equivalent to:

```jsx
function StudentCard(props) {

    const name = props.name;
    const department = props.department;
    const cgpa = props.cgpa;

    // ...
}
```

Both approaches are functionally equivalent.

The difference is mainly how we access the values.

**Remember:** Destructuring is a JavaScript feature, not something exclusive to React.

## 4. Default Props

What happens if a parent doesn't provide a particular property?

Consider:

```jsx
<StudentCard
    name="Asher"
    department="Computer Science"
/>
```

We haven't provided `cgpa`.

If the child tries to display `cgpa`, its value will be `undefined`.

We can provide a default value using JavaScript parameter destructuring.

```jsx
function StudentCard({
    name,
    department,
    cgpa = "Not Available"
}) {

    return (
        <div>
            <h2>{name}</h2>
            <p>{department}</p>
            <p>CGPA: {cgpa}</p>
        </div>
    );

}
```

Now, if `cgpa` is `undefined`, JavaScript uses:

```jsx
cgpa = "Not Available"
```

This is useful when a component should still display sensible information even if the parent doesn't provide every property.

**Important:** A destructuring default is used when the value is `undefined`. It does not replace an explicitly supplied value such as `null`.

## 5. Props Are Read-Only

This is one of the most important React principles.

A child component should never directly modify its props.

Consider this incorrect example:

```jsx
function StudentCard(props) {

    props.name = "Rahul"; // Don't do this!

    return <h2>{props.name}</h2>;

}
```

Why is this incorrect?

Because props represent inputs received from the parent.

The child should use those inputs, not directly modify them.

If the information needs to change, the parent should control that change.

One way to achieve this is by passing a callback function from the parent to the child.

We'll explore this when discussing state and callback props.

The key idea is:

**Props are read-only inputs to a component.**

## 6. Passing Different Data Types Through Props

Props are not restricted to strings.

We can pass different JavaScript data types.

| Data type | Example |
|---|---|
| String | `name="Asher"` |
| Number | `cgpa={9.86}` |
| Boolean | `isActive={true}` |
| Array | `subjects={["Java", "React"]}` |
| Object | `student={{ name: "Asher" }}` |
| Function | `onDelete={handleDelete}` |
| JSX | `icon={<SomeIcon />}` |

Notice that JavaScript expressions are enclosed in curly braces.

For example:

```jsx
<StudentCard
    name="Asher"
    cgpa={9.86}
    isActive={true}
    subjects={["Java", "React"]}
    student={{ name: "Asher" }}
/>
```

Strings can be passed directly using quotes, while other JavaScript expressions are generally written inside curly braces.

This makes components flexible because they can receive different kinds of information.

## 7. Passing Functions as Props

This is particularly important because it allows a child component to trigger an action defined by its parent.

Consider the following child component:

```jsx
function StudentCard({ name, onDelete }) {

    return (
        <div>
            <h2>{name}</h2>

            <button onClick={onDelete}>
                Delete
            </button>
        </div>
    );

}
```

The child receives two properties:

- `name`
- `onDelete`

Notice:

```jsx
<button onClick={onDelete}>
    Delete
</button>
```

The button uses the callback function received from the parent.

Now let's look at the parent:

```jsx
function StudentList() {

    function handleDelete() {
        console.log("Student deleted");
    }

    return (
        <StudentCard
            name="Asher"
            onDelete={handleDelete}
        />
    );

}
```

Here, the parent defines:

```jsx
function handleDelete() {
    console.log("Student deleted");
}
```

Then it passes the function to the child:

```jsx
onDelete={handleDelete}
```

When the child button is clicked, React invokes the callback.

The important relationship is:

1. The parent defines the function.
2. The parent passes the function as a prop.
3. The child receives the function.
4. The child invokes it when the relevant event occurs.
5. The parent's function executes.

This is how a child can request an action from its parent without directly modifying the parent's props or variables.

---

# Part 2 – State: Managing Component Data

## 8. What Is State?

State is data that a component manages and that can change over time.

Consider a simple counter.

Initially:

```text
Count = 0
```

After clicking a button:

```text
Count = 1
```

After clicking again:

```text
Count = 2
```

The displayed value changes as the user interacts with the application.

React needs to know when this data changes so that it can update the UI.

That's where state comes in.

State allows a component to maintain information between renders.

Examples of state include:

- A counter value.
- A student's information.
- A list of students.
- Whether a user is logged in.
- Whether a form is open.
- Whether a particular item is selected.

## 9. What Is `useState()`?

`useState()` is a React Hook that allows functional components to maintain state.

Let's implement a simple counter.

```jsx
import { useState } from 'react';

function StudentCounter() {

    const [count, setCount] = useState(0);

    return (
        <div>
            <h2>Count: {count}</h2>

            <button onClick={() => setCount(count + 1)}>
                Increase
            </button>
        </div>
    );

}

export default StudentCounter;
```

Let's understand this line:

```jsx
const [count, setCount] = useState(0);
```

It might look a little unusual initially, but it combines React's state Hook with JavaScript array destructuring.

| Part | Meaning |
|---|---|
| `useState(0)` | Creates state with an initial value of `0` |
| `count` | Holds the current state value |
| `setCount` | Function used to request a state update |

We can understand the returned values conceptually as:

```jsx
const result = useState(0);

const count = result[0];
const setCount = result[1];
```

However, we normally use array destructuring:

```jsx
const [count, setCount] = useState(0);
```

The first value represents the current state.

The second value is the updater function returned by React.

**Important:** The array destructuring syntax is JavaScript. `useState()` is the React Hook.

## 10. State vs Normal Variables

This is an important distinction.

Let's first consider an ordinary JavaScript variable.

```jsx
function Counter() {

    let count = 0;

    function increase() {
        count++;
        console.log(count);
    }

    return (
        <button onClick={increase}>
            Increase
        </button>
    );

}
```

The variable changes when the button is clicked.

However, React doesn't automatically re-render the component when an ordinary variable changes.

The value in JavaScript has changed, but React has not been told to update the UI.

Now compare this with:

```jsx
const [count, setCount] = useState(0);
```

When we call:

```jsx
setCount(count + 1);
```

we request a state update.

React can then render the component again using the updated state.

### Comparison

| Normal variable | React state |
|---|---|
| Stores ordinary JavaScript data | Stores component data |
| Changing it doesn't trigger a React render | Updating it schedules a React render |
| A local variable is initialized again when the component function runs | React retains state between renders |
| No React setter is provided | Updated using its setter function |

Remember:

**A normal variable can change, but React doesn't track that change as a reason to render.**

State is different because React manages it as part of the component's rendering process.

## 11. Updating State

There are two common approaches to updating state.

### Approach A – Direct value

```jsx
setCount(count + 1);
```

Here, we calculate the next value using the `count` value from the current render.

### Approach B – Functional updater

```jsx
setCount(previousCount => previousCount + 1);
```

Here, React supplies the previous state value to the updater function.

Why does the second approach exist?

Imagine we want to increase the counter three times inside one event handler.

```jsx
function increaseThreeTimes() {

    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);

}
```

This increments the counter by three.

Why?

React can batch state updates.

When multiple updates depend on the previous value, the functional updater ensures that each update receives the result of the preceding update.

Compare this with:

```jsx
function increaseThreeTimes() {

    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);

}
```

All three expressions can read the same `count` value from the current render.

For example, if `count` is initially `0`, all three calls request the value `1`.

The final result may therefore be an increase of only one.

**Rule of thumb:** When the next state depends on the previous state, prefer the functional updater form.

## 12. State With Different Data Types

State isn't limited to numbers.

It can hold different JavaScript values.

### String

```jsx
const [name, setName] = useState("Asher");
```

### Number

```jsx
const [age, setAge] = useState(21);
```

### Boolean

```jsx
const [isLoggedIn, setIsLoggedIn] = useState(false);
```

### Array

```jsx
const [subjects, setSubjects] = useState(["Java", "React"]);
```

### Object

```jsx
const [student, setStudent] = useState({
    name: "Asher",
    cgpa: 9.86
});
```

This is important when building real applications.

For example, our Student Management application may need to store an entire student object or a list of student objects in state.

## 13. Updating Objects in State

Now we reach an important React principle: **state should be treated as immutable.**

Let's consider a student object.

```jsx
const [student, setStudent] = useState({
    id: 1,
    name: "Asher",
    department: "Computer Science",
    cgpa: 9.86
});
```

Suppose we want to update only the student's name to `"Rahul"`.

We should not directly modify the existing state object.

### 13.1 Incorrect approach – Direct mutation

```jsx
student.name = "Rahul";

setStudent(student);
```

What happened here?

1. We modified the existing object.
2. The original object now contains `"Rahul"`.
3. We passed the same object reference back to React.

React compares state values using `Object.is` when deciding whether an update represents a new value.

In this case, the old and new values refer to the same object.

```jsx
Object.is(student, student); // true
```

React may therefore skip rendering this update.

Direct mutation can also create bugs because the previous state has been modified instead of being preserved.

### 13.2 Correct approach – Create a new object

Instead, we write:

```jsx
setStudent({
    ...student,
    name: "Rahul"
});
```

Let's understand this carefully.

Suppose the original object is:

```jsx
const student = {
    id: 1,
    name: "Asher",
    department: "Computer Science",
    cgpa: 9.86
};
```

Its properties are:

| Property | Value |
|---|---|
| id | 1 |
| name | Asher |
| department | Computer Science |
| cgpa | 9.86 |

**Step 1 – Copy the existing properties**

```jsx
{
    ...student
}
```

The spread operator copies the existing object's enumerable own properties into a new object.

Conceptually, this produces:

```jsx
{
    id: 1,
    name: "Asher",
    department: "Computer Science",
    cgpa: 9.86
}
```

Notice that we have a new object.

We haven't modified the original one.

**Step 2 – Provide the updated property**

```jsx
{
    ...student,
    name: "Rahul"
}
```

JavaScript processes object properties from left to right.

The spread operator copies the existing properties first.

Then we provide another value for `name`.

Because the later property has the same name, it takes precedence.

The resulting object becomes:

```jsx
{
    id: 1,
    name: "Rahul",
    department: "Computer Science",
    cgpa: 9.86
}
```

**Step 3 – Pass the new object to React**

```jsx
setStudent({
    ...student,
    name: "Rahul"
});
```

React receives a new object reference.

This allows React to recognize that the state value is different and schedule the appropriate update.

### 13.3 Visualising the object update

```text
Original object
       |
       v
{
    id: 1,
    name: "Asher",
    department: "Computer Science",
    cgpa: 9.86
}
       |
       | Spread operator
       v
Create a NEW object
       |
       | Override name
       v
{
    id: 1,
    name: "Rahul",
    department: "Computer Science",
    cgpa: 9.86
}
       |
       | setStudent(newObject)
       v
React receives the new state value
       |
       v
Component can render with updated data
```

### 13.4 Verify the difference yourself

```jsx
const student = {
    name: "Asher",
    cgpa: 9.86
};

const updatedStudent = {
    ...student,
    name: "Rahul"
};

console.log(student);
console.log(updatedStudent);

console.log(student === updatedStudent); // false
```

The original object remains unchanged.

The updated object is a different object in memory.

### 13.5 Important detail – Spread is shallow

The spread operator creates a shallow copy, not a deep copy.

Consider a nested object:

```jsx
const [student, setStudent] = useState({
    name: "Asher",
    address: {
        city: "Chennai",
        country: "India"
    }
});
```

Suppose we want to update the city.

This is not sufficient:

```jsx
setStudent({
    ...student,
    address: {
        city: "Lucknow"
    }
});
```

Why?

We copied the outer object, but then replaced the entire `address` object with a new object containing only `city`.

The `country` property is lost.

Instead, we should also copy the nested address:

```jsx
setStudent({
    ...student,
    address: {
        ...student.address,
        city: "Lucknow"
    }
});
```

Now the result is:

```jsx
{
    name: "Asher",
    address: {
        city: "Lucknow",
        country: "India"
    }
}
```

The existing nested property is preserved.

**The key idea:** When updating nested state, create new objects along the path of the properties being changed.

---

## 14. Updating Arrays in State

The same immutability principle applies to arrays.

Suppose we maintain a list of students:

```jsx
const [students, setStudents] = useState([
    "Asher",
    "Aryan"
]);
```

We should avoid directly modifying the existing array.

Instead, we create a new array for each update.

### 14.1 Adding a student

```jsx
setStudents(prev => [...prev, "Rahul"]);
```

The spread operator copies the existing elements into a new array.

Then `"Rahul"` is added at the end.

Result:

```text
["Asher", "Aryan", "Rahul"]
```

### 14.2 Removing a student

```jsx
setStudents(prev =>
    prev.filter(student => student !== "Aryan")
);
```

`filter()` creates a new array containing the elements that satisfy the condition.

Result:

```text
["Asher"]
```

### 14.3 Updating an array element

```jsx
setStudents(prev =>
    prev.map(student =>
        student === "Asher" ? "Asher Mustafa" : student
    )
);
```

`map()` creates a new array.

It replaces `"Asher"` with `"Asher Mustafa"` and keeps the other elements unchanged.

**Important:** These methods create new arrays instead of modifying the existing state array.

This makes them useful for updating React state immutably.

---

# Part 3 – Props and State Working Together

## 15. Parent Owns the State, Child Receives Props

Now let's combine what we have learned.

Imagine a Student Management application.

We have three components:

```text
App.jsx
  |
  | Owns student state
  |
  v
StudentList.jsx
  |
  | Receives students through props
  |
  v
StudentCard.jsx
  |
  | Displays individual student details
```

The parent maintains the student list.

The child components receive the information they need.

### 15.1 App.jsx – Parent component

```jsx
import { useState } from 'react';

function App() {

    const [students, setStudents] = useState([
        { id: 1, name: "Asher", cgpa: 9.86 },
        { id: 2, name: "Aryan", cgpa: 9.45 }
    ]);

    return <StudentList students={students} />;

}
```

Here:

```jsx
const [students, setStudents] = useState([...]);
```

The `App` component owns the student state.

Then:

```jsx
<StudentList students={students} />
```

It passes the student list to `StudentList` through props.

### 15.2 StudentList.jsx – Child component

```jsx
function StudentList({ students }) {

    return (
        <div>
            {students.map(student => (
                <StudentCard
                    key={student.id}
                    name={student.name}
                    cgpa={student.cgpa}
                />
            ))}
        </div>
    );

}
```

The child receives the list:

```jsx
function StudentList({ students })
```

Then it iterates over the array and renders a `StudentCard` for every student.

This demonstrates a fundamental React architecture:

1. State belongs to a component.
2. Props transfer data to child components.
3. Child components display or interact with that data.
4. The parent controls changes to its state.

This pattern is extremely common in React applications.

---

## 16. Lifting State Up

Now consider a slightly more complicated situation.

Suppose our application has two sibling components:

- `StudentForm` – Adds students.
- `StudentList` – Displays students.

Both components need to work with the same student list.

Should each component maintain its own separate copy of the student list?

No.

That could lead to inconsistent data.

For example, `StudentForm` might add a student to its own state, while `StudentList` continues displaying an older list.

Instead, we move the shared state to their closest common parent.

This is called **lifting state up**.

### 16.1 Understanding the component relationship

```text
                 App.jsx
              (Student State)
                 /       \
                /         \
       StudentForm     StudentList
                           |
                           |
                      StudentCard
```

The parent component owns the shared state.

It passes:

- Student data to `StudentList`.
- A callback function to `StudentForm`.

The form can invoke the callback when a new student needs to be added.

The parent then updates its state.

Because the updated student list is passed down through props, `StudentList` receives the new data and renders accordingly.

This is one of the most common patterns in React applications.

---

# Part 4 – Questions and Doubts From Implementation

This section preserves the questions that came up while working through the concepts.

They are particularly useful because they explain not only what the code does, but also why certain approaches work and others don't.

## 17. Question 1 – Can I create my own `setCount()` function?

While implementing `StudentCounter.jsx`, we initially tried the following:

```jsx
import { useState } from 'react';

function StudentCounter() {

    const [count, setCount] = useState(0);

    function setCount()
    {
        count = count + 1;
    }

    return (
        <div>
            <h2>Count: {count}</h2>

            <button onClick={setCount()}>
                Increase
            </button>
        </div>
    );

}

export default StudentCounter;
```

But Vite displayed this error:

```text
Identifier 'setCount' has already been declared
```

The error pointed to these two declarations:

```jsx
const [count, setCount] = useState(0);
```

and:

```jsx
function setCount()
{
    count = count + 1;
}
```

### 17.1 Why did this error occur?

Look at this line:

```jsx
const [count, setCount] = useState(0);
```

It declares two variables:

- `count`
- `setCount`

The second variable already holds the state updater function returned by React.

Then we tried to declare another function with the same name:

```jsx
function setCount() {
    // ...
}
```

JavaScript doesn't allow us to redeclare that name in the same scope using these declarations.

That is why we received the error.

### 17.2 Can we create our own function?

Yes!

We can create our own function, but we should give it a different name.

For example:

```jsx
import { useState } from 'react';

function StudentCounter() {

    const [count, setCount] = useState(0);

    function increaseCount() {
        setCount(count + 1);
    }

    return (
        <div>
            <h2>Count: {count}</h2>

            <button onClick={increaseCount}>
                Increase
            </button>
        </div>
    );

}

export default StudentCounter;
```

Now we have two separate things:

```jsx
const [count, setCount] = useState(0);
```

`setCount` is React's state updater function.

```jsx
function increaseCount() {
    setCount(count + 1);
}
```

`increaseCount` is our own function.

Our function calls React's updater to request a state change.

### 17.3 Another problem: Why can't we write `count = count + 1`?

In the original implementation, we wrote:

```jsx
const [count, setCount] = useState(0);
```

The `count` variable is declared using `const`.

Therefore, we cannot reassign it:

```jsx
count = count + 1; // Incorrect
```

Even if we had used `let`, directly modifying a normal variable would not tell React to re-render the component.

We must use the state updater:

```jsx
setCount(count + 1);
```

### 17.4 Why do we write `onClick={increaseCount}` instead of `onClick={increaseCount()}`?

This is another important distinction.

Correct:

```jsx
<button onClick={increaseCount}>
    Increase
</button>
```

Incorrect for this use case:

```jsx
<button onClick={increaseCount()}>
    Increase
</button>
```

Let's understand the difference.

| Syntax | What happens |
|---|---|
| `onClick={increaseCount}` | Passes the function to React. React calls it when the button is clicked. |
| `onClick={increaseCount()}` | Calls the function immediately while rendering. Its return value is assigned as the handler. |

When we write:

```jsx
onClick={increaseCount}
```

we are giving React a reference to the function.

When the user clicks the button, React invokes it.

This distinction is extremely important in React event handling.

**Final corrected counter:**

```jsx
import { useState } from 'react';

function StudentCounter() {

    const [count, setCount] = useState(0);

    function increaseCount() {
        setCount(count + 1);
    }

    return (
        <div>
            <h2>Count: {count}</h2>

            <button onClick={increaseCount}>
                Increase
            </button>
        </div>
    );

}

export default StudentCounter;
```

---

## 18. Question 2 – Does React fail to detect a change if we update the same student object?

The question came from this code:

```jsx
setStudent({
    ...student,
    name: "Rahul"
});
```

The original explanation was that React state should be treated as immutable and that creating a new object makes the change detectable.

The question was:

*Does this mean that if we update the same student, React won't be able to detect the change, so we just make a copy of the student and store it again using the setter?*

Your understanding was almost exactly right.

Let's make the distinction clear.

### 18.1 Updating the existing object

Suppose our state is:

```jsx
const [student, setStudent] = useState({
    id: 1,
    name: "Asher",
    department: "Computer Science",
    cgpa: 9.86
});
```

Now consider:

```jsx
student.name = "Rahul";

setStudent(student);
```

We changed the existing object.

But the reference to the object is still the same.

Conceptually:

```text
Before:

student ──────> Object A
                 name: "Asher"

After mutation:

student ──────> Object A
                 name: "Rahul"
```

We have modified the object, but we haven't created a new one.

When React compares the previous state with the new state, both refer to the same object.

```jsx
Object.is(student, student); // true
```

React may skip the update because it sees the same state reference.

### 18.2 Creating a new object

Now consider:

```jsx
setStudent({
    ...student,
    name: "Rahul"
});
```

This creates a different object.

Conceptually:

```text
Old state:

student ──────> Object A
                 name: "Asher"


New state:

newStudent ───> Object B
                 name: "Rahul"
```

Object A remains unchanged.

Object B contains the updated information.

React receives the new reference and can schedule a render.

We can verify this with ordinary JavaScript:

```jsx
const student = {
    name: "Asher",
    cgpa: 9.86
};

const updatedStudent = {
    ...student,
    name: "Rahul"
};

console.log(student);
console.log(updatedStudent);

console.log(student === updatedStudent); // false
```

The important distinction is not that we are updating a different student.

We are still updating the same logical student.

What changes is that we create a new object representing that student's updated information.

**Your understanding is correct:** We create a copy with the updated properties and pass that new object to the setter instead of modifying the existing state object.

### 18.3 One detail to remember

The spread operator is a shallow copy.

For nested objects, we must also copy the nested objects that we want to update.

For example:

```jsx
setStudent({
    ...student,
    address: {
        ...student.address,
        city: "Lucknow"
    }
});
```

This preserves the other properties of `address`.

---

## 19. Question 3 – Why do we use `key={student.id}` only when using `map()`?

While studying the `StudentList` component, you noticed:

```jsx
function StudentList({ students }) {

    return (
        <div>
            {students.map(student => (
                <StudentCard
                    key={student.id}
                    name={student.name}
                    cgpa={student.cgpa}
                />
            ))}
        </div>
    );

}
```

You noticed that we used `key` here, but we didn't use it when rendering individual components elsewhere.

Why?

### 19.1 Why does React need keys?

Consider the following student list:

```jsx
[
    { id: 1, name: "Asher" },
    { id: 2, name: "Aryan" },
    { id: 3, name: "Rahul" }
]
```

The `map()` function creates three `StudentCard` elements.

React needs a way to identify which element corresponds to which student when the list changes.

That's the purpose of `key`.

### 19.2 What happens when a student is deleted?

Initially, our list is:

```text
Asher
Aryan
Rahul
```

Now suppose we delete Aryan:

```text
Asher
Rahul
```

React needs to reconcile the previous list with the new list.

Stable keys help React identify that:

- Asher is still Asher.
- Aryan has been removed.
- Rahul is still Rahul.

Without stable keys, React may have difficulty matching elements correctly, particularly when list items are reordered or when components contain their own state.

### 19.3 Why don't we use keys everywhere?

Consider this:

```jsx
function App() {

    return (
        <div>
            <Header />
            <StudentCard name="Asher" cgpa={9.86} />
            <Footer />
        </div>
    );

}
```

Here, we're rendering three explicitly written elements.

We aren't generating a dynamic collection from an array.

React can identify these elements based on their position and type in the component tree.

Therefore, keys aren't necessary in this example.

### 19.4 Are keys required only when using `map()`?

No.

This is an important distinction.

Keys are not exclusive to `map()`.

They are useful whenever React needs to distinguish elements among siblings, especially when rendering a collection.

For example:

```jsx
{students.map(student => (
    <StudentCard
        key={student.id}
        {...student}
    />
))}
```

Or:

```jsx
{subjects.map(subject => (
    <li key={subject.id}>
        {subject.name}
    </li>
))}
```

Even when we manually render multiple sibling elements, we can use keys:

```jsx
<StudentCard key="student-1" name="Asher" />
<StudentCard key="student-2" name="Aryan" />
```

The important idea is:

**Keys help React identify elements among siblings when their identity needs to be preserved across renders.**

### 19.5 Why use `student.id` instead of the array index?

Consider:

```jsx
students.map((student, index) => (
    <StudentCard
        key={index}
        name={student.name}
    />
))
```

This works syntactically, but it can cause problems.

Suppose our original list is:

| Index | Student |
|---|---|
| 0 | Asher |
| 1 | Aryan |
| 2 | Rahul |

Now we delete Asher.

The indexes become:

| Index | Student |
|---|---|
| 0 | Aryan |
| 1 | Rahul |

The index that previously identified Asher now identifies Aryan.

React may associate an existing component instance with a different student.

This can cause incorrect UI behavior, especially when components contain their own state.

Using stable IDs avoids this problem:

```jsx
key={student.id}
```

### 19.6 One more important detail – Is `key` passed to the child?

No.

`key` is a special React attribute.

It is used by React to track elements and is not passed to the child component as an ordinary prop.

If `StudentCard` needs the ID, pass it separately:

```jsx
<StudentCard
    key={student.id}
    id={student.id}
    name={student.name}
/>
```

Now:

- `key` is used internally by React.
- `id` is available to the `StudentCard` component through props.

---

# Part 5 – Feature 03 Implementation Roadmap

## 20. What Exactly Are We Building?

The complete feature is divided into seven implementation stages.

The goal is to build the concepts gradually rather than implementing everything at once.

<em>Progress recorded in the original learning discussion: 0/7 completed in the roadmap. Basic parent-to-child props had already been implemented before this roadmap was introduced, and the counter implementation was being explored.</em>

### 20.1 The seven stages

| No. | Stage | What we'll implement |
|---|---|---|
| 01 | Props fundamentals | Parent-to-child communication, destructuring, default values, and read-only props |
| 02 | Props with different data types | Strings, numbers, booleans, arrays, objects, functions, and JSX |
| 03 | `useState` fundamentals | Counter, state vs variables, and re-rendering |
| 04 | State updates | Functional updates, batching, and previous state |
| 05 | Object and array state | Add, remove, and update students immutably |
| 06 | Parent-child communication | Callback props and lifting state up |
| 07 | Student Management exercise | Build a functional Student Management interface |

### 20.2 Planned project structure

The planned component structure is:

```text
src/
│
├── components/
│   ├── StudentCard.jsx
│   ├── StudentList.jsx
│   ├── StudentForm.jsx
│   └── StudentCounter.jsx
│
├── App.jsx
└── main.jsx

docs/
└── 03-React-Props-and-State/
    └── README.md
```

The components will have different responsibilities:

| Component | Responsibility |
|---|---|
| `StudentCard.jsx` | Displays an individual student |
| `StudentList.jsx` | Displays the collection of students |
| `StudentForm.jsx` | Provides a way to add student information |
| `StudentCounter.jsx` | Demonstrates React state using a counter |
| `App.jsx` | Coordinates the application and shared state |

The exact implementation will develop as we work through the seven stages.

---

# Part 6 – What Is Outside Feature 03?

To keep our learning organized, the following topics are planned for later features.

| Topic | Planned feature |
|---|---|
| Conditional rendering | Feature 04 |
| Event handling in depth | Later React fundamentals feature |
| `useEffect()` | React Hooks feature |
| Context API | Advanced React state management |
| Redux / Zustand | Advanced state management |

This separation helps us avoid mixing too many concepts into one feature.

For example, we will use event handlers in our counter and callback examples, but a deeper study of event handling is planned separately.

---

# Part 7 – Knowledge Check

Before moving forward, try answering these three questions.

### Question 1 – What happens when we call `setCount(count + 1)`?

A. It directly changes the `count` variable.

B. It requests a state update, and React can re-render the component.

C. It creates a new function.

**Correct answer: B**

Calling the state setter requests an update to the component's state. React can then render the component using the new value.

### Question 2 – Why do we use `{...student, name: "Rahul"}`?

A. To modify the original object.

B. To create a new object with copied properties and an updated name.

C. To create a deep copy of the object.

**Correct answer: B**

The spread operator copies the existing object's enumerable own properties into a new object. The later `name` property overrides the copied value.

Remember that this is a shallow copy.

### Question 3 – Why should we use `student.id` as a key in a mapped list?

A. To pass the ID automatically as a prop.

B. To identify list elements consistently during reconciliation.

C. Because `map()` requires an ID.

**Correct answer: B**

React uses keys to identify elements among siblings across renders.

The key is not automatically passed to the child as a normal prop.

---

# 8. Final Revision – The Complete Picture

Let's connect everything we learned.

## Props

Props allow a parent to pass information to a child.

```text
Parent
  |
  | Passes props
  v
Child
  |
  | Uses received information
  v
Rendered UI
```

Props are read-only inputs.

## State

State stores information managed by a component.

```text
Initial state
     |
     v
User interaction
     |
     v
State updater called
     |
     v
React schedules an update
     |
     v
Component renders with updated state
```

## Props and State Together

```text
                  App
             (Owns student state)
                    |
                    |
              Passes students
                through props
                    |
                    v
               StudentList
                    |
                    |
             Renders student cards
                    |
                    v
               StudentCard
```

If another child needs to modify the shared data, the parent can pass a callback function.

```text
                   App
             (Owns student state)
                /         \
               /           \
              v             v
        StudentForm     StudentList
              |
              |
       Calls parent callback
              |
              v
         App updates state
              |
              v
       New props passed down
              |
              v
        StudentList updates
```

This is the fundamental data-flow pattern that we will use throughout our React applications.

## Important Concepts to Remember

| Concept | What to remember |
|---|---|
| Props | Pass data from parent to child |
| Destructuring | Extract properties from the props object |
| Default values | Provide fallback values for `undefined` props |
| Read-only props | A child should not directly modify received props |
| Callback props | Allow a child to trigger a function defined by its parent |
| State | Data managed by a component that can change over time |
| `useState()` | React Hook for managing state in functional components |
| State setter | Requests a state update |
| Functional updater | Uses the previous state to calculate the next state |
| Immutability | Create new objects and arrays instead of mutating existing state |
| Spread operator | Copies enumerable own properties or array elements |
| `map()` | Creates a new array by transforming existing elements |
| `filter()` | Creates a new array containing matching elements |
| Keys | Help React identify elements among siblings |
| Lifting state up | Move shared state to the closest common parent |

---

# 9. What Comes Next?

We now have a complete theoretical roadmap for Feature 03.

We understand:

- How components receive information through props.
- How props can contain different JavaScript data types.
- Why props are read-only.
- How state differs from ordinary variables.
- How `useState()` works.
- Why state updates should be immutable.
- How objects and arrays can be updated.
- How parents and children communicate through callback functions.
- Why shared state is lifted to a common parent.
- Why React uses keys when rendering collections.

We won't try to implement all seven stages at once.

Instead, we will follow the roadmap and implement each part separately, testing the code as we go.

**Our final objective:** By the end of Feature 03, we should be able to explain how data flows through a React application and build a small interactive Student Management interface using props and state without needing to look up the basic syntax.

The next implementation step is to work with props more deeply: destructuring, default values, read-only behavior, and different data types.