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