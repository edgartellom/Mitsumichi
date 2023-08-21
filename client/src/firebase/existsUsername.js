import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/credenciales";

/* Controlador para saber si un username ya existe utilizando firebase */

const existsUsername = async (username) => {
  const users = [];
  const docsRef = collection(db, "users");
  const q = query(docsRef, where("username", "==", username));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    users.push(doc.data());
  });

  return users.length > 0 ? users[0].uid : null;
};

export default existsUsername;
