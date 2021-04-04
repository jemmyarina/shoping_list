import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { firebase } from '../config/firebase';
import Shop from './assets/images/shop.jpg';
import Navbar from './shared/Navbar';
import './styles/signin.css';

const SignIn = () => {
    const history = useHistory();
    const auth = firebase.auth()
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
    });

    auth.onAuthStateChanged((user) => {
        if (user) {
            localStorage.setItem('userData', JSON.stringify(user));
            history.push('/dashboard');
        }
    });

    const handleSignin = async e => {
        e.preventDefault();
        
        const result = await auth.signInWithEmailAndPassword(loginInfo.email, loginInfo.password);

        localStorage.setItem('userData', JSON.stringify(result.user))
    }

    return (
        <div className="signin-page">
            <Navbar links={[{ name:'Home', path: '/signin', type: 'light' }, { name:'Signup', path: '/signup', type: 'dark' }]}/>
            <div className="card">
                <div className="card__left"><img src={Shop} alt="shop"/><h3>App to help you recording shopping items  of your daily shoppings in a supermarket</h3></div>
                <div className="card__right">
                    <form className="form" onSubmit={handleSignin}>
                        <h2>Welcome!</h2>
                        <p>Sign in into your account</p>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={loginInfo.email} onChange={(e) => setLoginInfo({ ...loginInfo, email: e.target.value })} />
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={loginInfo.password} onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })}  />

                        <button className="btn-dark">Sign In</button>
                    </form>
                    <footer>Don't have an account? <Link to="/signup"><span>Sign Up</span></Link></footer>
                </div>
            </div>
        </div>
    )
}

export default SignIn
