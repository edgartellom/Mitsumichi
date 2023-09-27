import { doc, getDoc } from "firebase/firestore";
import { db } from "./credenciales";

const getProductsInCart = async (uid) => {
  try {
    // Obtén una referencia al documento del carrito del usuario
    const carritoDocRef = doc(db, "carritos", uid);

    // Consulta el documento del carrito
    const carritoDoc = await getDoc(carritoDocRef);

    if (carritoDoc.exists()) {
      // Si el documento del carrito existe, obtén la lista de productos
      const productosEnCarrito = carritoDoc.data().productos;
      return productosEnCarrito || [];
    } else {
      // Si el documento del carrito no existe o está vacío, devuelve un array vacío
      return [];
    }
  } catch (error) {
    console.error("Error al obtener productos del carrito:", error);
    return [];
  }
};

export default getProductsInCart;
