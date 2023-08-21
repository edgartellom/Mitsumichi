import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/credenciales";

const registerNewUser = async (user) => {
  try {
    const docRef = doc(db, "users", user.id);
    await setDoc(docRef, user);
  } catch (error) {
    console.log(error);
  }
};

export default registerNewUser;
