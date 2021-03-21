import React, { useState } from 'react';
import firebase from 'firebase';

const db=firebase.firestore();


const Playground = () => {
    const [items, setItem]=useState({name: ''});

    const arr = ["Item 1", "Item 2", "Item 3"];

    return (
        <div>
            <p>THis is the Playground</p>
            <h3>List of items</h3>
            <ul>
                {arr.map(itm => <li>{itm}</li>)}
            </ul>
        </div>
    )
}

export default Playground
