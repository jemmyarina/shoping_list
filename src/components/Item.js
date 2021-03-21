import React from 'react'

const Item = ({ data, setItemDone, setItemUpdate, onDelete }) => {
    return (
        <li className={data.done && 'done'}>
            <input type="checkbox" checked={data.done && true} onChange={() => setItemDone(data.id)} />
            <p>{data.name}</p>
            <span className={`${data.category} category`}>{data.category}</span>
            <p>last updated {data.date}</p>
            <button className="edit category" disabled={data.done? true : false} onClick={() => setItemUpdate(data.id)}>edit</button>
            <button onClick={() => onDelete(data.id)} className="delete category">delete</button>
        </li>
    );
}
export default Item;
