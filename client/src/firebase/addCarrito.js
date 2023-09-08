import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./credenciales";

const addCarrito = async (uid) => {
  const carritoDocRef = doc(db, "carritos", uid); // Referencia al documento del carrito
  try {
    // Verifica si el carrito ya existe para el usuario
    const carritoDoc = await getDoc(carritoDocRef);
    !carritoDoc.exists() && (await setDoc(carritoDocRef, { productos: [] }));
  } catch (error) {
    console.error("Error al verificar/crear el carrito:", error);
  }
};

export default addCarrito;
