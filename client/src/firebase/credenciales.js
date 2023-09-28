// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACaP7rwvM_Zuw-O96Bxz4Me6RudVxane8",
  authDomain: "mitsumitchirunrun.firebaseapp.com",
  projectId: "mitsumitchirunrun",
  storageBucket: "mitsumitchirunrun.appspot.com",
  messagingSenderId: "959201491732",
  appId: "1:959201491732:web:33bd7ceb2a2aa22a32a001",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
