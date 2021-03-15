import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = ({ links }) => {
    return (
        <div className="navbar">
            <div className="navbar__logo">Shopping<span>List</span></div>
            <div className="navbar__links">
                {links.map((link) => <Link key={link.name} to={link.path} className={`btn-${link.type}`}>{link.name}</Link>)}
            </div>
        </div>
    )
}

export default Navbar
