// Import the functions you need from the SDKs you need
import * as firebase from "firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAyGwYuLcz8qqUe4D563wbX8LSTRA4B-Dc",
    authDomain: "clique-auth.firebaseapp.com",
    projectId: "clique-auth",
    storageBucket: "clique-auth.appspot.com",
    messagingSenderId: "416803446593",
    appId: "1:416803446593:web:f185e6ec76f570d5034bc0"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);


let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()

export { auth };