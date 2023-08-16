// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwsIfFTRIRm-dC1uk0Y1kiYX_HbOqBb7w",
  authDomain: "evernote-clone-f65e2.firebaseapp.com",
  projectId: "evernote-clone-f65e2",
  storageBucket: "evernote-clone-f65e2.appspot.com",
  messagingSenderId: "254576453041",
  appId: "1:254576453041:web:0cbd0ae932cd30d7708990"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);