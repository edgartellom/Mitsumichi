import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/credenciales";
import getUser from "./getUser";

const loginWithEmailAndPassword = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    const user = await getUser(response.user?.uid);

    if (!user) {
      window.location.reload();
    } else {
      if (user.role === "admin") {
        window.location.href = "/dashboard/*";
      } else {
        window.location.href = "/home";
      }
    }
  } catch (error) {
    console.log("Regístrate primero");
  }
};

export default loginWithEmailAndPassword;
