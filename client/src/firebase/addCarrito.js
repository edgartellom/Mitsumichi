import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./credenciales";

const addCarrito = async (uid) => {
  const carritoDocRef = doc(db, "carritos", uid); // Referencia al documento del carrito

  try {
    // Verifica si el carrito ya existe para el usuario
    const carritoDoc = await getDoc(carritoDocRef);

    if (!carritoDoc.exists()) {
      // Si el carrito no existe, créalo
      await setDoc(carritoDocRef, { productos: [] });
      console.log("Carrito creado con éxito");
    } else {
      // Si el carrito ya existe, no hagas nada
      console.log("El carrito ya existe para este usuario");
    }
  } catch (error) {
    console.error("Error al verificar/crear el carrito:", error);
  }
};

export default addCarrito;
