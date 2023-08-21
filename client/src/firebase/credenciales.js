// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGdCAorLsA6W7VBE1G2UmE0U8dFh8DWU8",
  authDomain: "mitsumichi-3e8d1.firebaseapp.com",
  projectId: "mitsumichi-3e8d1",
  storageBucket: "mitsumichi-3e8d1.appspot.com",
  messagingSenderId: "91337879596",
  appId: "1:91337879596:web:c1875868c54d9586fee189",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
