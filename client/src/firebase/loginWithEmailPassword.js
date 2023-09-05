import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/credenciales";

const loginWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.reload();
  } catch (error) {
    console.log("Registrate primero");
  }
};

export default loginWithEmailAndPassword;
