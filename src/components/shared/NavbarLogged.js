import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { firebase } from '../../config/firebase';
import '../styles/navbarLogged.css';

const NavbarLogged = () => {
    const [showLogout, setShowLogout] = useState(false);
    const userData = JSON.parse(localStorage.getItem('userData'));
    const uName=userData.displayName;

    const logoutFunction = () => firebase.auth().signOut();

    return (
        <div className="navbar-logged">
        <div className="navbar-logged__inner">
            <div className="navbar-logged__logo">Shopping<span>List</span></div>
            <div className="navbar-logged__links">
                <ul className="">
                    <li>{uName}</li>
                    <li className="profile" onClick={() => setShowLogout(!showLogout)}><img src={userData.photoURL} alt="profile"/></li>
                </ul>
                {showLogout ? <ul className="navbar-logged__profile-drop">
                    <li><Link onClick={logoutFunction} to="/signin">Logout</Link></li>
                </ul> : ""}
            </div>
        </div>
        </div>
    )
}

export default NavbarLogged
