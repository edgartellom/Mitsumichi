import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/credenciales";

const updateUser = async (user) => {
  try {
    const collectionRef = collection(db, "users");
    const docRef = doc(collectionRef, user.id);
    await setDoc(docRef, user);
  } catch (error) {}
};

export default updateUser;
