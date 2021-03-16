import React from 'react';
import { Link } from 'react-router-dom';
import NavbarLogged from './shared/NavbarLogged';
import './styles/dashboard.css';

const Item = ({ item }) => {
    // const [] = useState
    return (
        <li className={item.done && 'done'}>
            <input type="checkbox" checked={item.done && true} />
            <p>{item.name}</p>
            <span className={`${item.category} category`}>{item.category}</span>
            <p>last updated {item.date}</p>
            <Link className="edit category" to={`/item/${item.id}`}>edit</Link>
            <button className="delete category">delete</button>
        </li>
    );
}

const Dashboard = () => {

    const items = [
        { id: 1, done: false, name: 'name of item1', category: 'food', date: '12th March 2021' },
        { id: 2, done: false, name: 'name of item2', category: 'hygiene', date: '12th March 2021' },
        { id: 3, done: true, name: 'name of item3', category: 'clothes', date: '12th March 2021' },
        { id: 4, done: true, name: 'name of item4', category: 'fruits', date: '12th March 2021' },
    ];

    return (
        <div className="page dashboard">
            <NavbarLogged />
            <main>
                <header className="dashboard__actions">
                    <Link className="btn orange" to="/item/create"> + Add Item</Link>
                    <select name="category">
                        <option value="category0" disabled selected>Category</option>
                        <option value="category1">Category 1</option>
                        <option value="category2">Category 2</option>
                        <option value="category3">Category 3</option>
                        <option value="category4">Others</option>
                    </select>
                    <select name="category">
                        <option value="all" selected>All</option>
                        <option value="bought">Bought</option>
                        <option value="unbought">UnBought</option>
                    </select>
                </header>
                <section className="dashboard__list">
                    <ul>
                        {items.map(item => <Item item={item} />)}
                    </ul>
                </section>
            </main>
        </div>
    )
}

export default Dashboard
