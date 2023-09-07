import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "../firebase/credenciales";

const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithRedirect(auth, provider);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export default loginWithGoogle;
