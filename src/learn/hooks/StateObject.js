import React, { useState } from 'react'

const StateObject = () => {
    // const [state, setState]=useState({count:10, unit:"kg"});
    // const count = state.count; 
    // const unit = state.unit;

    const [count, setState]=useState(10);
    // const [unit, setUnit]=useState('kg');
   

    function decrement(){
        setState(prevState => {
            return{...prevState, count: prevState.count - 1} //first spread previous state
        })
        // setUnit('-1kg');
    }
    function increment(){
        setState(prevState => {
            return{...prevState, count: prevState.count + 1}
        })
        // setUnit('+1kg');
    }
    return (
        <>
        <button onClick={increment}>ADD 1</button>
        <span>{count}</span>
        {/* <span>{unit}</span> */}
        <button onClick={decrement}>REDUCE 1</button>
    </> 
    )
}

export default StateObject
