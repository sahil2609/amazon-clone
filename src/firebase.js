// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// import firebase from 'firebase/app';
import 'firebase/firestore';
import firebase from '@firebase/app';
require('firebase/auth');
const firebaseConfig = {
    apiKey: "AIzaSyD7Yd-_KIdaeU2nChLL67ZYyKP_rbNSwL4",
    authDomain: "challenge-83a2a.firebaseapp.com",
    projectId: "challenge-83a2a",
    storageBucket: "challenge-83a2a.appspot.com",
    messagingSenderId: "52454925491",
    appId: "1:52454925491:web:58789f615a95980df37cc6",
    measurementId: "G-9L00XR563Q"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db =firebaseApp.firestore();
  const auth = firebase.auth();


  export {db, auth};