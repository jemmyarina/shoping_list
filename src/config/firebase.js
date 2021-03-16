import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyD0corf0KEo8K2SGktZITzUsGfVj49RUAQ",
    authDomain: "shopping-list-f36ae.firebaseapp.com",
    projectId: "shopping-list-f36ae",
    storageBucket: "shopping-list-f36ae.appspot.com",
    messagingSenderId: "881149169511",
    appId: "1:881149169511:web:793b91d5465c6bb1b2e9c2",
    measurementId: "G-GQBWM2FQVL"
});

const auth = firebase.auth();
const db = firebase.firestore();

export { firebase, auth, db };