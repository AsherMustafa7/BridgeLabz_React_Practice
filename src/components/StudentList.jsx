import StudentCard from './StudentCard.jsx';

function StudentList() {

    return (
        <div>
            <h1>Student Details</h1>

            <StudentCard
                name="Asher"
                department="Computer Science"
                cgpa={9.86}
            />

            <StudentCard
                name="Aryan"
                department="Information Technology"
                cgpa={9.45}
            />

            <StudentCard
                name="Rahul"
                department="Computer Science"
                cgpa={8.95}
            />

        </div>
    );

}

export default StudentList;