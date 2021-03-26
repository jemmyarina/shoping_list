import React from 'react'

const Item = ({ data, setItemDone, setItemUpdate, onDelete }) => {
    return (
        <li className={data.done && 'done'}>
            <input type="checkbox" checked={data.done && true} onChange={() => setItemDone(data.id)} />
            <p>{data.name}</p>
            <span className={`${data.category} category`}>{data.category}</span>
            <p className="date"><span>last updated</span> {data.date}</p>
            <i class="fa fa-pencil-square-o edit" disabled={data.done? true : false} onClick={() => setItemUpdate(data.id)}></i>
            <i class="fa fa-trash delete" onClick={() => onDelete(data.id)}></i>
        </li>
    );
}
export default Item;
