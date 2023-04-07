import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAChmao7a0AhQ0cI5v_3B-3c2IdU8A5tKw",
  authDomain: "gauripuja-186c5.firebaseapp.com",
  projectId: "gauripuja-186c5",
  storageBucket: "gauripuja-186c5.appspot.com",
  messagingSenderId: "786843779010",
  appId: "1:786843779010:web:6f2aa9d45c26f70422a05b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const initFirebase=()=>{
  return app
}

export const auth = getAuth(app)