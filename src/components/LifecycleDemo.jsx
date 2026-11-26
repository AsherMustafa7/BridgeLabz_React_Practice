import {useEffect} from "react";
function LifecycleDemo() {
    useEffect(() => {

        console.log("Component mounted");

        return () => {
            console.log("Component unmounted");
        };
    }, []);
    
    return (
        <div>
            <h2>Lifecycle Demonstration</h2>
            <p>Open the browser console to observe the lifecycle.</p>
        </div>
    );
}
export default LifecycleDemo;