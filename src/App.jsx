import StudentCounter from './components/StudentCounter.jsx';
import StudentList from './components/StudentList.jsx';
import StudentList2 from './components/StudentList2.jsx';
import StudentList3 from './components/StudentList3.jsx';
import { useState } from 'react';
function App() {

     const [students, setStudents] = useState([
        { id: 1, name: "Asher", cgpa: 9.86 },
        { id: 2, name: "Aryan", cgpa: 9.45 }
    ]);
    return (
        <div>
            <h1>Student Management System</h1>
            <StudentList />
            <StudentList2 />
            <StudentList3 students={students} />
            <StudentCounter />
        </div>
    );

}

export default App;