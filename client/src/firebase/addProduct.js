import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "./credenciales";

const addProduct = async (uid, producto) => {
  try {
    const carritoDocRef = doc(db, "carritos", uid); // Referencia al documento del carrito
    // Consulta el documento actual del carrito
    const carritoDoc = await getDoc(carritoDocRef);
    // Si el documento del carrito existe, actualiza su contenido
    carritoDoc.exists() &&
      (await updateDoc(carritoDocRef, {
        productos: arrayUnion(producto), // Agrega el producto al arreglo de productos
      }));
  } catch (error) {
    console.error("Error al agregar producto al carrito:", error);
  }
};

export default addProduct;
