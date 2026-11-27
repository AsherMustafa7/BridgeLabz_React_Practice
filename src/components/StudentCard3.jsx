function StudentCard3(props) {
    
// could have also done this 
// const { name, cgpa } = props;
// or would have done function StudentCard3({ name, cgpa })

    return (
        <div>
            <h2>{props.name}</h2>
            <p>CGPA: {props.cgpa}</p>
            <hr />
        </div>
    );
}
export default StudentCard3;