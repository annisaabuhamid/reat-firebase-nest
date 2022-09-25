// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHQzd4Axc9FQIGud4Gh32Gn7Up-q6AjvA",
  authDomain: "react-project-annisa.firebaseapp.com",
  projectId: "react-project-annisa",
  storageBucket: "react-project-annisa.appspot.com",
  messagingSenderId: "1014826922641",
  appId: "1:1014826922641:web:e1c696c374158e67bc8530",
  measurementId: "G-P5ZJBFHKE1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);


export const firestore = getFirestore(app);
