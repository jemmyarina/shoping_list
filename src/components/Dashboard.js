import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { firebase } from '../config/firebase';
import NavbarLogged from './shared/NavbarLogged';
import SidebarNav from './shared/SidebarNav';
import './styles/dashboard.css';

const Item = ({ item, setItemDone }) => {
    return (
        <li className={item.done && 'done'}>
            <input type="checkbox" checked={item.done && true} onChange={() => setItemDone(item.id)} />
            <p>{item.name}</p>
            <span className={`${item.category} category`}>{item.category}</span>
            <p>last updated {item.date}</p>
            <Link className="edit category" to={`/item/${item.id}`}>edit</Link>
            <button className="delete category">delete</button>
        </li>
    );
}

const Dashboard = () => {
    const history = useHistory();
    const db = firebase.firestore();
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

    return (
        <div className="page dashboard">
            <NavbarLogged />
            <div className="page__screen">
            <SidebarNav />
            <main>
                <header className="dashboard__actions">
                    <Link className="btn orange" to="/item/create"> + Add Item</Link>
                    <select name="category">
                        <option value="category0" disabled selected>Category</option>
                        <option value="category1">food</option>
                        <option value="category2">drinks</option>
                        <option value="category3">hygiene</option>
                        <option value="category4">clothes</option>
                        <option value="category5">Others</option>
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
                        {items.map(item => <Item item={item} setItemDone={setItemDone} />)}
                    </ul>
                </section>
            </main>
            </div>
        </div>
    )
}

export default Dashboard
