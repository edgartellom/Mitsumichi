import { auth } from "../firebase/credenciales";
import { createUserWithEmailAndPassword } from "firebase/auth";
const registerUser = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
  }
};

export default registerUser;
