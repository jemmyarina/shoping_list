import React from 'react';
import firebase from '../config/firebase';

const DeleteItem = () => {
const handleDeleteItem =(id)=>{
    db.collection("shopping-list").doc("id").delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}
    return (
        <div>
            
        </div>
    )
}

export default DeleteItem
