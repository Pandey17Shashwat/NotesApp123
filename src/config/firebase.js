// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "",
  authDomain: "notesapp-504e0.firebaseapp.com",
  projectId: "notesapp-504e0",
  storageBucket: "notesapp-504e0.appspot.com",
  messagingSenderId: "28275425093",
  appId: "",
  measurementId: "G-P490SYW7VG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage=getStorage(app);
