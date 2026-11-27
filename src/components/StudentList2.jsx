import StudentCard2 from "./StudentCard2";
function StudentList2() {

    function handleDelete() {
        console.log("Student deleted");
    }

    return (
        <StudentCard2
            name="Asher"
            onDelete={handleDelete}
        />
    );

}

export default StudentList2;