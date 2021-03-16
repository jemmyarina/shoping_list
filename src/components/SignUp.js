import React from 'react';
import { Link } from 'react-router-dom';
import Shop from './assets/images/shop.jpg';
import Navbar from './shared/Navbar';
import './styles/signin.css';


const SignUp = () => {
    return (
        <div className="signin-page">
            <Navbar links={[{ name:'Home', path: '/signin', type: 'light' }, { name:'Signin', path: '/signin', type: 'dark' }]}/>
            <div className="card">
                <div className="card__left"><img src={Shop} alt="shop"/><h3>App to help you recording shoping items  of your daily shopings in a supermarket</h3></div>
                <div className="card__right">
                    <form>
                        <h2>Welcome!</h2>
                        <p>sign up to create your account</p>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" />
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" />
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" />
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input type="password" id="confirm-password" name="confirm-password" />

                        <button className="btn-dark">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp
