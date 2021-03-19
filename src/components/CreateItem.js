import React from 'react';
import moment from 'moment';
import Popup from './shared/Popup';
import { firebase } from '../config/firebase';

const CreateItem = ({ hidePopup }) => {
    const db = firebase.firestore();
    const initItem = {
        brand: '',
        category: 'others',
        description: '',
        done: false,
    } 
    const [item, setItem] = React.useState(initItem);

    const handleCreateItem = async e => {
        e.preventDefault();

        const docRef = await db.collection('shopping-list').add({ 
            name: item.brand,
            category: item.category,
            description: item.description,
            done: item.done,
            date: moment(Date.now()).format('Do MMMM YYYY'),
         });

        console.log(`Document with ${docRef.id} id: successful created!`);

        setItem(initItem);

        hidePopup();
    }

    return (
        <Popup hidePopup={hidePopup}>
            <form onSubmit={handleCreateItem} className="form">
                <h2>Create new Item</h2>
                <p>Save new item to your shopping list</p>
                <label htmlFor="brand">Brand</label>
                <input type="text" id="brand" name="brand" value={item.brand} onChange={(e) => setItem({ ...item, brand: e.target.value })} />
                <label htmlFor="description">Description</label>
                <input type="text" id="description" name="description" value={item.description} onChange={(e) => setItem({ ...item, description: e.target.value })} />
                <label htmlFor="category">Category</label>
                <select name="category" id="category" onChange={e=>setItem({...item, category: e.target.value})}>
                    <option value="others" selected>Others</option>
                    <option value="food">Food</option>
                    <option value="fruits">Fruits</option>
                    <option value="clothes">Clothes</option>
                    <option value="hygiene">Hygiene</option>
                    <option value="drinks">Drinks</option>
                </select>

                <button className="btn-dark">Add new Item</button>
            </form>
        </Popup>
    )
}

export default CreateItem
