import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import Shop from './assets/images/shop.jpg';
import {firebase} from '../config/firebase';
import Navbar from './shared/Navbar';
import './styles/signin.css';


const SignUp = () => {
    const auth = firebase.auth();
    const history = useHistory();
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    auth.onAuthStateChanged((user) => {
        if (user) {
            localStorage.setItem('userData', JSON.stringify(user));
            history.push('/dashboard');
        }
    });

    const handleSignup = async e => {
        e.preventDefault();
        
        const result = await auth.createUserWithEmailAndPassword(user.email, user.password);

        if(result.user) {
            await result.user.updateProfile({
                displayName: user.name,
                photoURL: 'https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png',
            })
            localStorage.setItem('userData', JSON.stringify(result.user));
            // location.href = "/dashboard";
            history.push('/dashboard');
        } else {
            console.log("An error occurred!");
        }
    }

    return (
        <div className="signin-page">
            <Navbar links={[{ name:'Home', path: '/signin', type: 'light' }, { name:'Signin', path: '/signin', type: 'dark' }]}/>
            <div className="card">
                <div className="card__left"><img src={Shop} alt="shop"/><h3>App to help you recording shoping items  of your daily shopings in a supermarket</h3></div>
                <div className="card__right">
                    <form className="form" onSubmit={handleSignup}>
                        <h2>Welcome!</h2>
                        <p>Sign up to create your account</p>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input type="password" id="confirm-password" name="confirm-password" value={user.confirmPassword} onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })} />

                        <button className="btn-dark">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp
