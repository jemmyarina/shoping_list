import React, {useState} from 'react';

const UseState = () => {
    const [count, setCount] = useState(4);

    function decrementCount(){
        setCount(()=> count-1);
    }
    function incrementCount(){
        setCount(()=> count+1);
        // ()=> we started with that bcz we wanted the state to consider its previous value
    }
    return (
        <>
            <button onClick={decrementCount}>ADD 1</button>
            <span>{count}</span>
            <button onClick={incrementCount}>REDUCE 1</button>
        </> 
    )
}

export default UseState

