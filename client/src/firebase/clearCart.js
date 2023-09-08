import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./credenciales";

const clearCart = async (uid) => {
  try {
    const carritoDocRef = doc(db, "carritos", uid); // Referencia al documento del carrito
    // Consulta el documento actual del carrito
    const carritoDoc = await getDoc(carritoDocRef);
    // Si el documento del carrito existe, establece el campo 'productos' como un arreglo vacío
    if (carritoDoc.exists()) {
      await setDoc(carritoDocRef, { productos: [] }, { merge: true });
    }
  } catch (error) {
    console.error("Error al vaciar el carrito:", error);
  }
};

export default clearCart;
