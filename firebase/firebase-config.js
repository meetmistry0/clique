// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth } from 'firebase/auth/react-native';
import { getFirestore } from "firebase/firestore/lite";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBpZTNfZa3vtbqfxjr7lhN-ZXrfeFo3b6c",
    authDomain: "clique-4582d.firebaseapp.com",
    projectId: "clique-4582d",
    storageBucket: "clique-4582d.appspot.com",
    messagingSenderId: "178777082210",
    appId: "1:178777082210:web:2b3aef7b259c0f0b3a843b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = initializeAuth(app);
export const db = getFirestore(app);