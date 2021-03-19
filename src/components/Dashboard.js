import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { firebase } from '../config/firebase';
import NavbarLogged from './shared/NavbarLogged';
import SidebarNav from './shared/SidebarNav';
import CreateItem from './CreateItem';
import UpdateItem from './UpdateItem';
import './styles/dashboard.css';

const Item = ({ item, setItemDone, setItemUpdate }) => {
    return (
        <li className={item.done && 'done'}>
            <input type="checkbox" checked={item.done && true} onChange={() => setItemDone(item.id)} />
            <p>{item.name}</p>
            <span className={`${item.category} category`}>{item.category}</span>
            <p>last updated {item.date}</p>
            <button className="edit category" disabled={item.done? true : false} onClick={() => setItemUpdate(item.id)}>edit</button>
            <button className="delete category">delete</button>
        </li>
    );
}

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
    const [items, setItems] = useState([
        // { id: 1, done: false, name: 'name of item1', category: 'food', date: '12th March 2021' },
        // { id: 2, done: false, name: 'name of item2', category: 'hygiene', date: '12th March 2021' },
        // { id: 3, done: true, name: 'name of item3', category: 'clothes', date: '12th March 2021' },
        // { id: 4, done: true, name: 'name of item4', category: 'fruits', date: '12th March 2021' },
        // { id: 5, done: true, name: 'name of item4', category: 'others', date: '12th March 2021' },
    ]);

    const setItemDone = (id) => {
        const item = items.find((item) => item.id === id);
        const changedItem = { ...item, done: item.done ? false : true };
        const fitleredItem = items.filter((item) => item.id !== id);
        setItems(item.done ? [changedItem, ...fitleredItem] : [...fitleredItem, changedItem])
    }

    useEffect(() => {
        db.collection('shopping-list').orderBy('done').get().then(list => {

            const lists = [];

            list.docs.forEach(oneItem => {
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
                        {items.map(item => <Item item={item} setItemDone={setItemDone} setItemUpdate={setItemUpdate} />)}
                    </ul>
                </section>
            </main>
            </div>
        </div>
    )
}

export default Dashboard
