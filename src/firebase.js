// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASCec9rR4Cd5kgH44pI9yZWF7ml7K68wg",
  authDomain: "to-do-app-955f5.firebaseapp.com",
  projectId: "to-do-app-955f5",
  storageBucket: "to-do-app-955f5.appspot.com",
  messagingSenderId: "291278191634",
  appId: "1:291278191634:web:317583dbbf326656f02ccb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
