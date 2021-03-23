import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { firebase } from '../config/firebase';
import NavbarLogged from './shared/NavbarLogged';
import SidebarNav from './shared/SidebarNav';
import CreateItem from './CreateItem';
import UpdateItem from './UpdateItem';
import Item from './Item';
import './styles/dashboard.css';



const Dashboard = () => {
    const history = useHistory();
    const db = firebase.firestore();
    const [showCreator, setShowCreator] = useState(false);
    const [showEditor, setShowEditor] = useState(false);
    const [current, setCurrent] = useState({
        name: '',
        description: '',
        category: '',
        id: '',
    });
    const [items, setItems] = useState([]);

    // const setItemDone = (id) => {
    //     const item = items.find((item) => item.id === id);
    //     const changedItem = { ...item, done: item.done ? false : true };
    //     const fitleredItem = items.filter((item) => item.id !== id);
    //     setItems(item.done ? [changedItem, ...fitleredItem] : [...fitleredItem, changedItem])
    // }

    const setItemDone = async (id) => {
        const item = items.find((item) => item.id === id);

        firebase.firestore().collection('shopping-list').doc(id).update({ 
            done: item.done?false:true,
        });
    }

    useEffect(() => {
        db.collection('shopping-list').orderBy('done').onSnapshot(snaps => {
            const lists = [];

            snaps.docs.forEach(oneItem => {
                const data = oneItem.data();
                lists.push({ ...data, id: oneItem.id });
            });

            setItems(lists);

        });
    }, [db])


    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            history.push('/signin');
        }
    });

    const hidePopups = () => {
        setShowCreator(false);
        setShowEditor(false);
    }

    const setItemUpdate = (id) => {
        const itm = items.find(i => i.id === id);

        setCurrent({
            name: itm.name,
            id: itm.id,
            description: itm.description,
            category: itm.category,
        });

        setShowEditor(true)
    }
    const handleDeleteItem =(id)=>{
        const sure = window.confirm('Are you sure to delete?');

        if(sure===true){
            firebase.firestore().collection("shopping-list").doc(id).delete().then(() => {
                console.log("Document successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            })
        }
    }



    return (
        <div className="page dashboard">
            <NavbarLogged />
            <div className="page__screen">
            <SidebarNav />
            <main>
                {showCreator ? <CreateItem hidePopup={hidePopups} /> : null}
                {showEditor ? <UpdateItem hidePopup={hidePopups} {...current} /> : null}
                <header className="dashboard__actions">
                    <button className="btn orange" onClick={() => setShowCreator(true)} > + Add Item</button>
                    <select name="category">
                        <option value="" disabled selected>Category</option>
                        <option value="food">food</option>
                        <option value="drinks">drinks</option>
                        <option value="hygiene">hygiene</option>
                        <option value="clothes">clothes</option>
                        <option value="others">Others</option>
                    </select>
                    <select name="status">
                        <option value="status" disabled selected>Status</option>
                        <option value="all">all</option>
                        <option value="bought">bought</option>
                        <option value="unbought">unbought</option>
                    </select>
                </header>
                <section className="dashboard__list">
                    <ul>
                        {items.map(item => <Item data={item} setItemDone={setItemDone} onDelete={handleDeleteItem} setItemUpdate={setItemUpdate} />)}
                    </ul>
                </section>
            </main>
            </div>
        </div>
    )
}

export default Dashboard
