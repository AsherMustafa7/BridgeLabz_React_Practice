function StudentCard(props) {

    return (
        <div>
            <h2>{props.name}</h2>
            <p>Department: {props.department}</p>
            <p>CGPA: {props.cgpa}</p>
            <hr />
        </div>
    );

}

export default StudentCard;