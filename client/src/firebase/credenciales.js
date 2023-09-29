// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD53xikEJduqhM17l4pYdH0CGhWt6ArF6o",
  authDomain: "mitsu-31d63.firebaseapp.com",
  projectId: "mitsu-31d63",
  storageBucket: "mitsu-31d63.appspot.com",
  messagingSenderId: "424757301659",
  appId: "1:424757301659:web:1da1431a075978710b513e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
