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