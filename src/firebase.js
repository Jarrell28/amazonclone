import firebase from "firebase";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCNd8440txi5gMC4fT36r1rHANJi6G1Y-E",
    authDomain: "clone-9f029.firebaseapp.com",
    projectId: "clone-9f029",
    storageBucket: "clone-9f029.appspot.com",
    messagingSenderId: "654283551061",
    appId: "1:654283551061:web:4e79c5436f7554c4027fdc",
    measurementId: "G-G07S3EHHQN"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };