import { collection, getDocs } from "firebase/firestore";
import { db } from "./credenciales";

/* Funcion para traer todos los usuarios de la base de datos */
const getAllUsers = async () => {
  const users = [];
  const usersRef = collection(db, "users");
  const querySnapshot = await getDocs(usersRef);

  querySnapshot.forEach((doc) => {
    users.push(doc.data());
  });

  return users;
};

export default getAllUsers;
