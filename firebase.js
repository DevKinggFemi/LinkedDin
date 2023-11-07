// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import firebase from "firebase/compat/storage"

import "firebase/compat/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCMrsf0sCB43uuIbP-TRzJTfDs8jH2y0Y",
  authDomain: "job-dine.firebaseapp.com",
  projectId: "job-dine",
  storageBucket: "job-dine.appspot.com",
  messagingSenderId: "711333988347",
  appId: "1:711333988347:web:92dc27f31d03a3c728ad5e",
  measurementId: "G-WTFJ42Z7HV"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

  

