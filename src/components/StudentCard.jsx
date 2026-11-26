export function StudentCard({ name, department, cgpa }) {

    return (
        <div>
            <h3>{name}</h3>

            <p>Department: {department}</p>

            <p>CGPA: {cgpa}</p>

            <hr />
        </div>
    );

}