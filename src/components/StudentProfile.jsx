function StudentProfile({ name }) {

    return (
        <h2>{name || "Unknown Student"}</h2>
    );
}
export default StudentProfile;