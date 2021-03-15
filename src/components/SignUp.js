import React from 'react';
import Navbar from './shared/Navbar';

const SignUp = () => {
    return (
        <div>
            <Navbar links={[{ name:'Home', path: '/signin', type: 'light' }, { name:'Signin', path: '/signin', type: 'dark' }]}/>
            SignUp
        </div>
    )
}

export default SignUp
