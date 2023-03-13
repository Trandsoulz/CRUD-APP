// npm install firebase

// Then, initialize Firebase and begin using the SDKs for the products you'd like to use.
// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyA7fX3mJx7K3MImlHh3N6Trjy6sLtb_osg",

  authDomain: "crud-app-ac4a7.firebaseapp.com",

  projectId: "crud-app-ac4a7",

  storageBucket: "crud-app-ac4a7.appspot.com",

  messagingSenderId: "391192624991",

  appId: "1:391192624991:web:97cda09b4594335a5980ea",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
