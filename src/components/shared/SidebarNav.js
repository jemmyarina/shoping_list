import React from 'react';
import '../styles/sidebar.css';

const SidebarNav = () => {
    const list = [
        { title: 'Total Items', value: 25 },
        { title: 'Total Categories', value: 25 },
        { title: 'Total Bought', value: 25 },
        { title: 'Total UnBought', value: 25 },
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
