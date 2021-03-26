import React, {useState, useEffect} from 'react';
import '../styles/sidebar.css';
import {firebase} from '../../config/firebase';




const SidebarNav = () => {
    const db = firebase.firestore();
    //state
    const [items] = useState(0);
    const [filteredItems, setFilteredItems] = useState(items);

    
    const [bought, setBought] = useState(0);
    const [unBought, setUnBought] = useState(0);

    useEffect( () =>{
        const userId=localStorage.getItem("userData");
        const obj = JSON.parse(userId);
        const uid=obj.uid;

        let size;
        db.collection('shopping-list').where("owner", "==", uid).onSnapshot(snap => {
            size=snap.size;
            console.log(size);
            setFilteredItems(size);

            setBought(0)
            setUnBought(0)
            snap.docs.forEach(oneItem => {

                const data = oneItem.data();
                 if(data.done === true){

                    setBought(prevBought => prevBought+1);
                 }
                 else if( data.done === false){
                    setUnBought(prevUnbought => prevUnbought+1);
                 }
            })

        });
        
    }, [db]) 

    const list = [
        { title: 'Total Items', value: filteredItems},
        { title: 'Total Categories', value: 5 },
        { title: 'Total Bought', value: bought },
        { title: 'Not yet bought', value: unBought },
    ];

    return (
        <nav className="sidebar">
            <ul className="sidebar__list">
                {list.map(listItem => (
                    <li key={listItem.title} className="sidebar__list-item">
                        <p>{listItem.title}</p>
                        <span>{listItem.value}</span>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default SidebarNav
