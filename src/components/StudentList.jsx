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