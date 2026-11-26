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