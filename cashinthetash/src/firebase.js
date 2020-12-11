import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
var firebaseConfig = {
    apiKey: "AIzaSyAzWY5M_aBzS5AbZVSBBp8aKSSlquHsvs4",
    authDomain: "cashinthetash-91fca.firebaseapp.com",
    projectId: "cashinthetash-91fca",
    storageBucket: "cashinthetash-91fca.appspot.com",
    messagingSenderId: "769864583952",
    appId: "1:769864583952:web:6f3ef5317fcedefe7db395",
    measurementId: "G-G34VB856ML"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();