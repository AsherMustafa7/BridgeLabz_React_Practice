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