import { signOut } from "firebase/auth";
import { auth } from "../firebase/credenciales";

const logOut = async () => {
  try {
    await signOut(auth);
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

export default logOut;
