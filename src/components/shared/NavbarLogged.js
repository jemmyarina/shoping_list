import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/navbarLogged.css';

const NavbarLogged = () => {
    return (
        <div className="navbar-logged">
        <div className="navbar-logged__inner">
            <div className="navbar-logged__logo">Shopping<span>List</span></div>
            <div className="navbar-logged__links">
                <ul>
                    <li><Link to="/category/create" className={`btn-dark`}>Add category</Link></li>
                    <li className="profile"><img src="https://randomuser.me/api/portraits/thumb/men/75.jpg" alt="profile"/></li>
                </ul>
            </div>
        </div>
        </div>
    )
}

export default NavbarLogged
