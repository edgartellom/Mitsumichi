import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/credenciales";

const loginWithEmailAndPassword = async (email, password) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    console.log(user);
  } catch (error) {
    console.log(error.message);
  }
};

export default loginWithEmailAndPassword;
