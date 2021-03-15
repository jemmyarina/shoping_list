import React from 'react'
import Navbar from './shared/Navbar';
import Shop from './assets/images/shop.jpg';
import './styles/signin.css';

const SignIn = () => {
    return (
        <div>
            <Navbar links={[{ name:'Home', path: '/signin', type: 'light' }, { name:'Signup', path: '/signup', type: 'dark' }]}/>
            <div className="card">
                <div className="card__left"><img src={Shop} alt="shop"/></div>
                <div className="card__right">
                    <form>
                        <h2>Signin</h2>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" />
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" />

                        <button className="btn-dark">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn
