import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/credenciales";

const getUser = async (uid) => {
  try {
    const docRef = doc(db, "users", uid);
    const document = await getDoc(docRef);
    return document.data();
  } catch (error) {
    console.log(error);
  }
};

export default getUser;
