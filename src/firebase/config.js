import { initializeApp } from 'firebase/app';
import { getFirestore, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCXLTUGZjTxhpE-Jy7qxQGj56jkjh6YTks",
    authDomain: "thedojosite-7a6d2.firebaseapp.com",
    projectId: "thedojosite-7a6d2",
    storageBucket: "thedojosite-7a6d2.appspot.com",
    messagingSenderId: "602266913827",
    appId: "1:602266913827:web:21913c59ae7f44fc54b596"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const projectFirestore = getFirestore(app);
const projectAuth = getAuth(app);
const projectStorage = getStorage(app);

// Timestamp
const timestamp = Timestamp;

export { projectFirestore, projectAuth, timestamp, projectStorage };