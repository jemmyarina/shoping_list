import React from 'react';
import moment from 'moment';
import Popup from './shared/Popup';
import { firebase } from '../config/firebase';

const UpdateItem = ({ hidePopup, itemId, name, description, category }) => {
    const db = firebase.firestore();
    const initItem = {
        brand: name || "",
        category: category || 'others',
        description: description || '',
    } 
    const [item, setItem] = React.useState(initItem);

    const handleUpdateItem = async e => {
        e.preventDefault();

        await db.collection('shopping-list').doc(itemId).set({ 
            name: item.brand,
            category: item.category,
            description: item.description,
            date: moment(Date.now()).format('Do MMMM YYYY'),
         });

        console.log(`Document with ${itemId} id: successful updated!`);

        setItem(initItem);

        hidePopup();
    }

    return (
        <Popup hidePopup={hidePopup}>
            <form onSubmit={handleUpdateItem} className="form">
                <h2>Update an Item</h2>
                <p>Save updated item info to your shopping list</p>
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

                <button className="btn-dark">Update Item</button>
            </form>
        </Popup>
    )
}

export default UpdateItem
