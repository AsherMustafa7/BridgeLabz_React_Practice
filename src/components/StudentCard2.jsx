function StudentCard2({ name, onDelete }) {

    return (
        <div>
            <h2>{name}</h2>
            <button onClick={onDelete}>
                Delete
            </button>
        </div>
    );

}

export default StudentCard2;