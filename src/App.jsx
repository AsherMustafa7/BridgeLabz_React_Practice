
// function App() {

//     return (
//         <div>
//             <h1>Hello, React!</h1>

//             <p>
//                 Welcome to my ReactJS Development Practice.
//             </p>

//             <h2>Learning React with Vite</h2>
//         </div>
//     );

// }

// export default App;

import Header from './components/Header.jsx';
import LifecycleDemo from './components/LifecycleDemo.jsx';
function App()
{
    const studentName = "Rahul";
    const course="ReactJS Development Practice";
    const year = 3;
    //  Just know this wont be rendering on the screen when you press the button it will still be 0 
    // beacause the component is not re-rendering when the counter variable is updated. 
    // To make it re-render, you would need to use state (useState hook) instead of a regular variable.
    var counter = 0;
    function handleClick(){
        counter++;
    }

    const element = <h1>Hello, React!</h1>;
    return (
        <div>
            {/* see we can just directly reference the element */}
            {element}
            <Header />
            <h1>Student Information</h1>

            <p>Name: {studentName}</p>

            <p>Course: {course}</p>

            <p>Year: {year}</p>
            <p>Counter: {counter}</p>

            <p>
                Welcome to {course}, {studentName}!
            </p>
            <button onClick={handleClick}>Click Me</button>
            {/* now this is the next one 5th i guess */}
            <LifecycleDemo />
        </div>
    );
}

export default App;