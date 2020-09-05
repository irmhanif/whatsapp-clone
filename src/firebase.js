import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyDtt-wxcSlj29OfAQQkqqPRHVNhajpl9VQ",
    authDomain: "whats-app-cloneapp.firebaseapp.com",
    databaseURL: "https://whats-app-cloneapp.firebaseio.com",
    projectId: "whats-app-cloneapp",
    storageBucket: "whats-app-cloneapp.appspot.com",
    messagingSenderId: "695485577543",
    appId: "1:695485577543:web:353c7f5a654cf1d6a13462",
    measurementId: "G-M5JPE0K2Q4"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db =firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;