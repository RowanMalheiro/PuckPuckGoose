import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
/*import { initializeApp } from "firebase/app";

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpHTWExoDuAjMHKhtdb-kIm6yV3vfPfnE",
  authDomain: "puckpuckgoose.firebaseapp.com",
  projectId: "puckpuckgoose",
  storageBucket: "puckalytics-1cec2.appspot.com",
  messagingSenderId: "663353394197",
  appId: "1:663353394197:web:00f58da0f271632751fa1c",
  measurementId: "G-CF8WFHDC0F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);