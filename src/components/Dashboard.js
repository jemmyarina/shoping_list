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

    //states
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState(items);
    // const [ filteredCat, setFilteredCat] = useState(items);
    const [catego, setCategory]=useState("category");
    const [status, setStatus]=useState("all");

    //filter by category
    const handleCategory = (e) =>{
        setCategory(e.target.value);
        let categoryToShow = [];
        if(e.target.value ==="food") categoryToShow = items.filter(itm => itm.category ==="food");
        else if(e.target.value ==="drinks") categoryToShow = items.filter(itm => itm.category ==="drinks");
        else if(e.target.value ==="hygiene") categoryToShow = items.filter(itm => itm.category ==="hygiene");
        else if(e.target.value ==="clothes") categoryToShow = items.filter(itm => itm.category ==="clothes");
        else if(e.target.value ==="others") categoryToShow = items.filter(itm => itm.category ==="others");
        else{
            categoryToShow= items;
        }
    
        setFilteredItems(categoryToShow)
    } 

    //filter by Status of ALL, BOUGHT or UNBOUGHT
    const handleStatus = (e) =>{
    setStatus(e.target.value);
            
        let itemsToShow = [];
        if (e.target.value === 'bought') {
            itemsToShow = items.filter(itm => itm.done === true);
        }
        else if(e.target.value === 'unbought'){
            itemsToShow = items.filter(itm => itm.done === false);
        }
        else{
            itemsToShow = items;
        }
        setFilteredItems(itemsToShow);
        
    }

    const setItemDone = async (id) => {
        const item = items.find((item) => item.id === id);

        firebase.firestore().collection('shopping-list').doc(id).update({ 
            done: item.done?false:true,
        });
    }

    useEffect(() => {
        const userId=localStorage.getItem("userData");
        const obj = JSON.parse(userId);
        const uid=obj.uid;

        db.collection('shopping-list').where("owner", "==", uid).onSnapshot(snaps => {
            const lists = [];

            snaps.docs.forEach(oneItem => {
                const data = oneItem.data();
                lists.push({ ...data, id: oneItem.id });
            });
             
                lists.sort((x, y) => x.done === y.done ? 0 : x.done ? 1 : -1);
                setItems(lists);
                setFilteredItems(lists)

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
            db.collection("shopping-list").doc(id).delete().then(() => {
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
                    <select onChange={handleCategory} name="category">
                        <option value="" disabled selected>{catego}</option>
                        <option value="food">food</option>
                        <option value="drinks">drinks</option>
                        <option value="hygiene">hygiene</option>
                        <option value="clothes">clothes</option>
                        <option value="others">Others</option>
                    </select>
                    <select onChange={handleStatus} name="status">
                        <option value="status" disabled selected>{status}</option>
                        <option value="all">all</option>
                        <option value="bought">bought</option>
                        <option value="unbought">unbought</option>
                    </select>
                </header>
                <section className="dashboard__list">
                    <ul>
                        {filteredItems.length > 0 ? (filteredItems.map(item => <Item data={item} setItemDone={setItemDone} onDelete={handleDeleteItem} setItemUpdate={setItemUpdate}/>)):<p>No item to shop yet!</p>}
                    </ul>
                </section>
            </main>
            </div>
        </div>
    )
}

export default Dashboard
