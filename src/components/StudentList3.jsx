import StudentCard3 from "./StudentCard3";
function StudentList3({ students }) {

    return (
        <div>
            {students.map(student => (
                <StudentCard3
                    key={student.id}
                    name={student.name}
                    cgpa={student.cgpa}
                />
            ))}
        </div>
    );

}
export default StudentList3;