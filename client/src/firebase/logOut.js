import { signOut } from "firebase/auth";
import { auth } from "../firebase/credenciales";

const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
};

export default logOut;
