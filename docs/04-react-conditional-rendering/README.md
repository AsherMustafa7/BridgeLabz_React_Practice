# Feature 04 – React Conditional Rendering

## Overview

Conditional rendering is the process of displaying different UI elements based on a condition.

In React, we use ordinary JavaScript conditional statements and expressions to decide what should be rendered.

In this feature, we build on the concepts covered in **Feature 03 – React Props and State** and learn how to make our Student Management application respond to different application states.

### What We Will Learn

- `if` and `if-else` statements in React
- Ternary operator
- Logical AND (`&&`)
- Logical OR (`||`)
- Nullish coalescing (`??`)
- Logical NOT (`!`)
- Conditional component rendering
- JSX element variables
- Returning `null`
- Hiding versus unmounting components
- Conditional rendering with `useState`
- Empty, loading, and error states
- Role-based rendering
- Switch statements
- Practical implementation in the Student Management application

---

# 1. What Is Conditional Rendering?

Conditional rendering means displaying different UI elements depending on whether a particular condition is true or false.

Consider our Student Management application.

| Condition | UI displayed |
|---|---|
| User is logged in | Dashboard |
| User is not logged in | Login page |
| User is an administrator | Admin dashboard |
| User is a student | Student dashboard |
| Students are available | Student list |
| No students are available | Empty state |
| Data is loading | Loading indicator |
| An error occurs | Error message |

React does not introduce a special programming language for conditional rendering. We use ordinary JavaScript conditions inside our React components.

# Part 2 – Conditional Rendering Techniques

## 2. Using `if` Statements

The `if` statement is the most straightforward approach.

### Example

```jsx
function Dashboard() {

    const isLoggedIn = true;

    if (isLoggedIn) {
        return <h1>Welcome to Dashboard</h1>;
    }

    return <h1>Please Login</h1>;
}

export default Dashboard;
```

### How Does It Work?

1. `isLoggedIn` is evaluated.
2. If it is `true`, the first `return` executes.
3. If it is `false`, JavaScript skips the first return and executes the second.

A React component can return different JSX depending on a condition.

### Using `if-else`

```jsx
function Dashboard() {

    const isLoggedIn = true;

    if (isLoggedIn) {
        return (
            <div>
                <h1>Welcome!</h1>
                <p>You are logged in.</p>
            </div>
        );
    } else {
        return (
            <div>
                <h1>Login Required</h1>
                <p>Please log in to continue.</p>
            </div>
        );
    }
}
```

Both versions are valid.

**When should we use it?**

Use `if-else` when conditions involve substantial logic or when you want to return completely different component layouts.

## 3. Using the Ternary Operator

The ternary operator is a shorter way to write an `if-else` expression.

### Syntax

```javascript
condition ? expressionIfTrue : expressionIfFalse;
```

### Example

```jsx
function LoginStatus() {

    const isLoggedIn = true;

    return (
        <div>
            {isLoggedIn
                ? <h2>Welcome Back!</h2>
                : <h2>Please Login</h2>
            }
        </div>
    );
}
```

### Understanding the Syntax

```jsx
{isLoggedIn ? <h2>Welcome</h2> : <h2>Login</h2>}
```

- `isLoggedIn` is the condition.
- `?` separates the condition from the true expression.
- `:` separates the true expression from the false expression.
- `{}` allows us to evaluate a JavaScript expression inside JSX.

### Nested Ternary Operators

We can also check multiple conditions.

```jsx
function StudentStatus({ marks }) {

    return (
        <div>
            {marks >= 90
                ? "Excellent"
                : marks >= 75
                    ? "Very Good"
                    : marks >= 50
                        ? "Pass"
                        : "Fail"
            }
        </div>
    );
}
```

This works, but deeply nested ternaries become difficult to read. For complicated logic, prefer `if-else` or separate functions and components.

## 4. Using Logical AND (`&&`)

Logical AND is one of the most commonly used conditional rendering techniques.

Suppose we want to display a message only when students are available.

```jsx
function StudentList({ students }) {

    return (
        <div>
            <h1>Student List</h1>

            {students.length > 0 && (
                <p>Students are available!</p>
            )}

        </div>
    );
}
```

### How Does `&&` Work?

In JavaScript:

```javascript
true && "Hello";   // "Hello"

false && "Hello";  // false
```

The logical AND operator returns:

- The right-hand expression if the left-hand expression is truthy.
- The left-hand expression if it is falsy.

Therefore:

```jsx
{students.length > 0 && <p>Students Available</p>}
```

If students exist, React receives the paragraph element.

If they don't, React receives `false`, which React does not render.

### Important: The Zero Rendering Problem

Consider this:

```jsx
{students.length && <p>Students Available</p>}
```

What happens when the array is empty?

```javascript
students.length = 0;
```

The expression becomes:

```javascript
0 && <p>Students Available</p>
```

The result is `0`.

React renders the number `0` as visible text!

**Avoid this mistake.** Instead, write:

```jsx
{students.length > 0 && <p>Students Available</p>}
```

Or:

```jsx
{!!students.length && <p>Students Available</p>}
```

The double negation converts the number into a boolean.

## 5. Using Logical OR (`||`)

Logical OR is commonly used for fallback values.

### Example

```jsx
function StudentProfile({ name }) {

    return (
        <div>
            <h2>{name || "Unknown Student"}</h2>
        </div>
    );
}
```

If `name` is truthy, its value is displayed.

Otherwise, `"Unknown Student"` is displayed.

### JavaScript Examples

```javascript
" Asher " || "Unknown"; // " Asher "

"" || "Unknown";        // "Unknown"

null || "Unknown";      // "Unknown"

undefined || "Unknown"; // "Unknown"

0 || 100;               // 100
```

### Logical OR vs Nullish Coalescing

There is another operator worth knowing: `??`.

Compare:

```javascript
const age = 0;

console.log(age || 18); // 18

console.log(age ?? 18); // 0
```

Why?

- `||` uses the fallback for any falsy value.
- `??` uses the fallback only when the value is `null` or `undefined`.

This matters when `0`, `false`, or an empty string is a valid value.

| Value | `value || fallback` | `value ?? fallback` |
|---|---|---|
| `0` | Fallback | `0` |
| `false` | Fallback | `false` |
| `""` | Fallback | `""` |
| `null` | Fallback | Fallback |
| `undefined` | Fallback | Fallback |
| `"Asher"` | `"Asher"` | `"Asher"` |

## 6. Using Logical NOT (`!`)

The logical NOT operator reverses a boolean value.

```javascript
!true;  // false

!false; // true
```

### Example

```jsx
function LoginMessage({ isLoggedIn }) {

    return (
        <div>
            {!isLoggedIn && <p>Please log in first.</p>}
        </div>
    );
}
```

When `isLoggedIn` is false, the message appears.

When it is true, the expression does not render anything.

We can also use it in normal conditions:

```jsx
if (!isLoggedIn) {
    return <Login />;
}
```

This checks whether the value is falsy. If `isLoggedIn` is guaranteed to be a boolean, it is equivalent to checking:

```javascript
if (isLoggedIn === false) {
    return <Login />;
}
```

# Part 3 – Other Conditional Rendering Approaches

## 7. Conditional Component Rendering

Instead of displaying different HTML elements, we can render completely different React components.

Imagine we have two components.

### Login.jsx

```jsx
function Login() {
    return (
        <div>
            <h2>Login Page</h2>
            <p>Please enter your credentials.</p>
        </div>
    );
}

export default Login;
```

### Dashboard.jsx

```jsx
function Dashboard() {
    return (
        <div>
            <h2>Student Dashboard</h2>
            <p>Welcome to your dashboard.</p>
        </div>
    );
}

export default Dashboard;
```

We can conditionally render them:

### App.jsx

```jsx
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';

function App() {

    const isLoggedIn = true;

    return (
        <div>
            {isLoggedIn ? <Dashboard /> : <Login />}
        </div>
    );
}

export default App;
```

Notice that we are rendering components instead of individual HTML elements.

This is particularly useful when applications have multiple dashboards, user roles, and authentication states.

## 8. Using Element Variables

We can also store JSX inside JavaScript variables.

### Example

```jsx
function Dashboard({ isLoggedIn }) {

    let content;

    if (isLoggedIn) {
        content = <h2>Welcome to Dashboard</h2>;
    } else {
        content = <h2>Please Login</h2>;
    }

    return (
        <div>
            {content}
        </div>
    );
}
```

Here:

```javascript
let content;
```

is an ordinary JavaScript variable.

We assign JSX to it depending on the condition.

Then we render it using:

```jsx
{content}
```

This approach is helpful when conditional logic is too complicated to place directly inside JSX.

## 9. Returning `null`

Sometimes we don't want to render anything.

React allows a component to return `null`.

```jsx
function AdminPanel({ isAdmin }) {

    if (!isAdmin) {
        return null;
    }

    return (
        <div>
            <h2>Admin Controls</h2>
            <button>Manage Students</button>
        </div>
    );
}
```

If the user isn't an administrator, the component renders nothing.

This is different from returning an empty `<div>`, because `null` creates no corresponding DOM element.

## 10. Hiding vs Conditionally Rendering Components

These two approaches look similar but behave differently.

### Conditional Rendering

```jsx
{isVisible && <StudentList />}
```

When `isVisible` becomes false, `StudentList` is removed from the React tree. Its local component state is discarded.

### Hiding with CSS

```jsx
<div style={{ display: isVisible ? "block" : "none" }}>
    <StudentList />
</div>
```

The component remains rendered in the React tree, but CSS hides its DOM representation. Its local state is generally preserved.

| Conditional rendering | CSS hiding |
|---|---|
| Component is removed from the rendered tree when false | Component remains rendered |
| Local component state is discarded on unmount | Local component state is generally preserved |
| Useful when the component should not exist in the UI | Useful when the component should remain mounted but invisible |

This distinction becomes important when working with forms, tabs, modals, and components that maintain their own state.

# Part 4 – Conditional Rendering with State

## 11. Using `useState()` for Conditional Rendering

Previously, we used:

```jsx
const [count, setCount] = useState(0);
```

Now we can use state to determine which component appears.

### Example

```jsx
import { useState } from 'react';

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div>
            {isLoggedIn
                ? <h2>Welcome to Dashboard</h2>
                : <h2>Please Login</h2>
            }

            <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
                {isLoggedIn ? "Logout" : "Login"}
            </button>
        </div>
    );
}

export default App;
```

### Understanding the Flow

1. Initially, `isLoggedIn` is `false`.
2. React renders the login message.
3. The user clicks the button.
4. `setIsLoggedIn(!isLoggedIn)` updates the state to `true`.
5. React renders the component again.
6. The dashboard message appears.

This is an example of interactive conditional rendering.

The UI changes because the state changes.

# Part 5 – Practical Application Scenarios

## 12. Empty State Rendering

Suppose our student list is empty.

We shouldn't display a blank section. Instead, we show a message.

```jsx
function StudentList({ students }) {

    if (students.length === 0) {
        return <h3>No students found.</h3>;
    }

    return (
        <div>
            {students.map(student => (
                <p key={student.id}>{student.name}</p>
            ))}
        </div>
    );
}
```

This is called empty-state rendering.

It is frequently used in dashboards, shopping carts, task managers, and admin panels.

## 13. Loading State Rendering

When an application requests data from a backend, the response may take some time.

During that time, we can display a loading indicator.

```jsx
function StudentList({ isLoading, students }) {

    if (isLoading) {
        return <h2>Loading students...</h2>;
    }

    return (
        <div>
            {students.map(student => (
                <p key={student.id}>{student.name}</p>
            ))}
        </div>
    );
}
```

Here, the loading condition takes priority over displaying the student list.

## 14. Error State Rendering

Sometimes the backend request fails.

We should show an error message instead of pretending the data loaded successfully.

```jsx
function StudentList({ isLoading, error, students }) {

    if (isLoading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        return <h2>Something went wrong!</h2>;
    }

    if (students.length === 0) {
        return <h2>No students found.</h2>;
    }

    return (
        <div>
            {students.map(student => (
                <p key={student.id}>{student.name}</p>
            ))}
        </div>
    );
}
```

Notice the order:

1. Loading
2. Error
3. Empty list
4. Actual data

This makes sure we display the correct UI for the current application state.

## 15. Role-Based Rendering

In a real application, different users may have different permissions.

For example:

| Role | Access |
|---|---|
| Admin | Manage students, add students, delete students |
| Student | View student details |
| Guest | Login page only |

We can conditionally render based on roles:

```jsx
function Dashboard({ role }) {

    if (role === "admin") {
        return <h2>Admin Dashboard</h2>;
    }

    if (role === "student") {
        return <h2>Student Dashboard</h2>;
    }

    return <h2>Access Denied</h2>;
}
```

**Important security distinction:** Hiding an admin button or dashboard in React is only a UI decision. It does not secure the underlying operation. The backend must independently enforce authorization.

# Part 6 – Complete Student Management Implementation

Now let's bring these concepts together into our Student Management application.

We will implement:

- Login and logout.
- Conditional dashboard rendering.
- Admin and student roles.
- Empty student list.
- Loading indicator.
- Error message.
- Conditional messages using `&&`.
- Fallback values using `||`.
- Ternary rendering.
- `if-else` component returns.

## 16. Project Structure

```text
src/
├── components/
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── StudentList.jsx
│   ├── Loading.jsx
│   └── ErrorMessage.jsx
│
├── App.jsx
└── main.jsx
```

We already have `StudentCard.jsx` from the previous feature. We will reuse it.

## 17. StudentCard.jsx

**Location:** `src/components/StudentCard.jsx`

```jsx
function StudentCard({ name, department, cgpa }) {

    return (
        <div>
            <h3>{name || "Unnamed Student"}</h3>

            <p>
                Department: {department || "Not Provided"}
            </p>

            <p>CGPA: {cgpa ?? "Not Available"}</p>

            <hr />
        </div>
    );

}

export default StudentCard;
```

### Concepts Used

- Props destructuring.
- Logical OR (`||`) for fallback strings.
- Nullish coalescing (`??`) for a missing CGPA.

## 18. Login.jsx

**Location:** `src/components/Login.jsx`

```jsx
function Login({ onLogin }) {

    return (
        <div>
            <h2>Login Page</h2>

            <p>Please log in to access Student Management.</p>

            <button onClick={onLogin}>
                Login
            </button>
        </div>
    );

}

export default Login;
```

### Concepts Used

- Props.
- Passing a callback function.
- Conditional component rendering.

The parent component passes `handleLogin` through the `onLogin` prop. The child calls that function when the button is clicked.

## 19. Loading.jsx

**Location:** `src/components/Loading.jsx`

```jsx
function Loading() {

    return (
        <div>
            <h2>Loading Students...</h2>
            <p>Please wait while we retrieve the data.</p>
        </div>
    );

}

export default Loading;
```

## 20. ErrorMessage.jsx

**Location:** `src/components/ErrorMessage.jsx`

```jsx
function ErrorMessage({ message }) {

    return (
        <div>
            <h2>Error!</h2>
            <p>{message}</p>
        </div>
    );

}

export default ErrorMessage;
```

## 21. StudentList.jsx

**Location:** `src/components/StudentList.jsx`

```jsx
import StudentCard from './StudentCard.jsx';

function StudentList({ students }) {

    // Conditional rendering using if
    if (students.length === 0) {
        return (
            <div>
                <h2>No Students Found</h2>
                <p>Please add students to see them here.</p>
            </div>
        );
    }

    return (
        <div>

            <h2>Student Details</h2>

            {/* Logical AND */}
            {students.length > 0 && (
                <p>Total Students: {students.length}</p>
            )}

            {students.map(student => (
                <StudentCard
                    key={student.id}
                    name={student.name}
                    department={student.department}
                    cgpa={student.cgpa}
                />
            ))}

        </div>
    );

}

export default StudentList;
```

### Concepts Used

- Conditional rendering using `if`.
- Empty-state rendering.
- Logical AND (`&&`).
- Rendering arrays using `map()`.
- Keys for list elements.
- Reusing the `StudentCard` component.

## 22. Dashboard.jsx

**Location:** `src/components/Dashboard.jsx`

```jsx
import StudentList from './StudentList.jsx';

function Dashboard({ role, students }) {

    // Element variable
    let heading;

    // Conditional rendering using if-else
    if (role === "admin") {
        heading = <h2>Admin Dashboard</h2>;
    } else if (role === "student") {
        heading = <h2>Student Dashboard</h2>;
    } else {
        return <h2>Access Denied</h2>;
    }

    return (
        <div>

            {heading}

            {/* Ternary operator */}
            <p>
                {role === "admin"
                    ? "You can manage student records."
                    : "You can view student records."
                }
            </p>

            <StudentList students={students} />

            {/* Logical NOT */}
            {!students.length && (
                <p>There are currently no student records.</p>
            )}

        </div>
    );

}

export default Dashboard;
```

### Concepts Used

- Element variables.
- `if-else` rendering.
- Ternary operator.
- Logical NOT (`!`).
- Props.
- Component composition.

**Implementation observation:** When the student list is empty, `StudentList` displays its empty-state message and `Dashboard` also displays the additional message. This is the behavior of the supplied implementation.

## 23. App.jsx

**Location:** `src/App.jsx`

This is where we maintain our application state.

```jsx
import { useState } from 'react';

import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import Loading from './components/Loading.jsx';
import ErrorMessage from './components/ErrorMessage.jsx';

function App() {

    // Login state
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // User role
    const [role, setRole] = useState("student");

    // Student data
    const [students, setStudents] = useState([
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
    ]);

    // Loading and error states
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Login handler
    function handleLogin() {
        setIsLoggedIn(true);
    }

    // Logout handler
    function handleLogout() {
        setIsLoggedIn(false);
    }

    // Change user role
    function handleRoleChange() {
        setRole(previousRole =>
            previousRole === "admin" ? "student" : "admin"
        );
    }

    // Clear student records
    function clearStudents() {
        setStudents([]);
    }

    // Restore student records
    function restoreStudents() {
        setStudents([
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
            }
        ]);
    }

    return (
        <div>

            <h1>Student Management System</h1>

            {/* Ternary rendering */}
            {!isLoggedIn ? (

                <Login onLogin={handleLogin} />

            ) : (

                <div>

                    <h2>Welcome to Student Management!</h2>

                    <button onClick={handleLogout}>
                        Logout
                    </button>

                    <button onClick={handleRoleChange}>
                        Switch Role
                    </button>

                    <button onClick={clearStudents}>
                        Clear Students
                    </button>

                    <button onClick={restoreStudents}>
                        Restore Students
                    </button>

                    <button onClick={() => {
                        setIsLoading(true);
                        setHasError(false);
                    }}>
                        Show Loading
                    </button>

                    <button onClick={() => {
                        setIsLoading(false);
                        setHasError(true);
                    }}>
                        Show Error
                    </button>

                    <button onClick={() => {
                        setIsLoading(false);
                        setHasError(false);
                    }}>
                        Show Dashboard
                    </button>

                    <hr />

                    {/* Nested conditional rendering */}
                    {isLoading ? (

                        <Loading />

                    ) : hasError ? (

                        <ErrorMessage
                            message="Unable to retrieve student records."
                        />

                    ) : (

                        <Dashboard
                            role={role}
                            students={students}
                        />

                    )}

                </div>

            )}

        </div>
    );

}

export default App;
```

### Concepts Used in App.jsx

| Concept | Implementation |
|---|---|
| `useState` | Login, role, students, loading, and error states |
| Callback props | `onLogin={handleLogin}` |
| Login/logout | State updates |
| Functional state updater | `setRole(previousRole => ...)` |
| Array state | `setStudents([])` and restoring records |
| Ternary operator | Login versus application UI |
| Nested ternary | Loading, error, or dashboard |
| Component rendering | Login, Loading, ErrorMessage, Dashboard |

## 24. Run the Application

From the project directory:

```bash
npm run dev
```

### Expected Application Flow

**1. Initial screen**

```text
Student Management System

Login Page

Please log in to access Student Management.

[Login]
```

**2. After login**

```text
Welcome to Student Management!

[Logout] [Switch Role] [Clear Students]
[Restore Students] [Show Loading]
[Show Error] [Show Dashboard]

Student Dashboard

You can view student records.

Student Details
Total Students: 3

Asher – 9.86
Aryan – 9.45
Rahul – 8.95
```

**3. Switch Role**

```text
Admin Dashboard

You can manage student records.
```

**4. Clear Students**

```text
No Students Found

Please add students to see them here.
```

The additional empty-state message from `Dashboard` also appears because the implementation contains a separate logical NOT condition.

**5. Show Loading**

```text
Loading Students...

Please wait while we retrieve the data.
```

**6. Show Error**

```text
Error!

Unable to retrieve student records.
```

The application uses simulated loading and error states. Later, when we connect it to Spring Boot, we will use actual API responses to control these states.

# Part 7 – Additional Important Theory

## 25. Truthy and Falsy Values

JavaScript conditions do not always require explicit `true` or `false`.

JavaScript evaluates values as either truthy or falsy.

### Truthy and Falsy Examples

| Value | Boolean conversion |
|---|---|
| `true` | Truthy |
| `"Hello"` | Truthy |
| `100` | Truthy |
| `[]` | Truthy |
| `{}` | Truthy |
| `false` | Falsy |
| `0` | Falsy |
| `""` | Falsy |
| `null` | Falsy |
| `undefined` | Falsy |
| `NaN` | Falsy |

For example:

```jsx
const name = "Asher";

return (
    <div>
        {name && <h2>{name}</h2>}
    </div>
);
```

Since `"Asher"` is truthy, the heading appears.

**Important JavaScript detail:** Empty arrays and empty objects are truthy, even though they contain no elements or properties.

## 26. Using Switch Statements

We can use a JavaScript `switch` statement to determine what JSX to return.

```jsx
function Dashboard({ role }) {

    switch (role) {

        case "admin":
            return <h2>Admin Dashboard</h2>;

        case "student":
            return <h2>Student Dashboard</h2>;

        case "teacher":
            return <h2>Teacher Dashboard</h2>;

        default:
            return <h2>Access Denied</h2>;

    }

}
```

This is particularly useful when we have several possible values for a condition.

## 27. Conditional Rendering vs Routing

These are related but different concepts.

**Conditional rendering** decides which UI a component displays.

**Routing** determines which page or view corresponds to a URL.

For example:

| URL | Page |
|---|---|
| `/login` | Login page |
| `/students` | Student list |
| `/admin` | Admin dashboard |

React Router is commonly used for routing. We will study it separately rather than treating it as a conditional rendering technique.

# Part 8 – Interview Preparation

Here are the questions you should be comfortable answering after completing this feature.

| Interview question | Main concept |
|---|---|
| What is conditional rendering? | Displaying UI based on conditions |
| How do you use if-else in React? | Conditional component returns |
| What is the ternary operator? | `condition ? A : B` |
| What is the purpose of `&&` in JSX? | Conditional rendering |
| What is the difference between `||` and `??`? | Fallback values |
| Why does `0` sometimes appear unexpectedly in JSX? | Logical AND returning zero |
| Can a React component return null? | Rendering nothing |
| What is role-based rendering? | UI based on user roles |
| What is the difference between hiding and unmounting? | CSS vs conditional rendering |
| Can we use switch statements in React? | JavaScript conditional logic |
| What is conditional rendering with state? | State-driven UI |
| Is hiding an admin button sufficient for security? | Backend authorization is still required |

# Part 9 – Feature Completion Checklist

**Feature 04 – React Conditional Rendering**

- [ ] `if` and `if-else` rendering
- [ ] Ternary operator
- [ ] Logical AND (`&&`)
- [ ] Logical OR (`||`)
- [ ] Nullish coalescing (`??`)
- [ ] Logical NOT (`!`)
- [ ] Conditional component rendering
- [ ] JSX element variables
- [ ] Returning `null`
- [ ] Hiding vs unmounting components
- [ ] Conditional rendering with `useState`
- [ ] Empty-state rendering
- [ ] Loading-state rendering
- [ ] Error-state rendering
- [ ] Role-based rendering
- [ ] Switch statement rendering
- [ ] Complete Student Management implementation
- [ ] Feature documentation and GitHub commit

**Progress at the time this guide was prepared:** 0/18. This is the feature checklist, not a claim that the implementation has already been completed or committed.

# Part 10 – Git Checkpoint

After implementing and testing everything:

```bash
npm run build

git status

git add .

git commit -m "[Asher Mustafa]: Implement React Conditional Rendering"

git push -u origin feature/04-react-conditional-rendering
```

Documentation location:

```text
docs/
└── 04-React-Conditional-Rendering/
    └── README.md
```

# What Comes After Feature 04?

Our React learning sequence now looks like this:

| Feature | Topic | Status |
|---|---|---|
| 01 | React Getting Started | Completed |
| 02 | React Components | Completed |
| 03 | React Props and State | Completed |
| 04 | React Conditional Rendering | Current |
| 05 | React Event Handling | Upcoming |
| 06 | React Hooks | Upcoming |
| 07 | React Forms | Upcoming |
| 08 | React API Integration | Upcoming |

The later feature ordering can be adjusted as we build out the full syllabus.

---

# Final Revision

The main idea behind conditional rendering is that **React applications adapt their interface based on conditions and application state.**

Remember these distinctions:

1. **`if-else`:** Useful when returning completely different layouts or handling complex conditions.
2. **Ternary (`? :`):** Useful when choosing between two expressions inside JSX.
3. **Logical AND (`&&`):** Useful when something should appear only when a condition is true. Be careful with `0`.
4. **Logical OR (`||`):** Useful for fallback values when a value is falsy.
5. **Nullish coalescing (`??`):** Useful when the fallback should apply only to `null` or `undefined`.
6. **Logical NOT (`!`):** Reverses a condition.
7. **Element variables:** Help organize complicated conditional JSX.
8. **Returning `null`:** Allows a component to render nothing.
9. **Conditional rendering vs CSS hiding:** Determines whether a component is unmounted or remains mounted but invisible.
10. **State-driven rendering:** Allows the UI to change when application state changes.
11. **Loading, error, and empty states:** Make applications respond properly to different data conditions.
12. **Role-based rendering:** Changes the UI according to a user's role, but does not replace backend authorization.

Conditional rendering is not just about showing or hiding a heading. It is how React applications adapt their entire interface to changing application state, user roles, data availability, and errors.