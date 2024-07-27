// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import{getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "socialmedia-app-dd165.firebaseapp.com",
  projectId: "socialmedia-app-dd165",
  storageBucket: "socialmedia-app-dd165.appspot.com",
  messagingSenderId: "32739437429",
  appId: "1:32739437429:web:0bfeea28a751f25271413c"
};

// Initialize Firebase
const app =!getApp().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
export {app,db,storage}