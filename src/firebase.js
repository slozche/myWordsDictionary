// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCcvRea0f7RGdVQDEquS5G2XfJ6L7V3yE",
  authDomain: "my-dicitionary-app.firebaseapp.com",
  projectId: "my-dicitionary-app",
  storageBucket: "my-dicitionary-app.appspot.com",
  messagingSenderId: "188840323865",
  appId: "1:188840323865:web:69a2cb05b13db9fa44b388",
  measurementId: "G-GJ7N0F9QPF"
};


// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()