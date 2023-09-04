import { doc, getDoc } from "firebase/firestore";
import { db } from "./credenciales";

const getCartProducts = async (uid) => {
  try {
    const carritoDocRef = doc(db, "carritos", uid);

    const carritoDoc = await getDoc(carritoDocRef);

    if (carritoDoc.exists()) {
      // El carrito existe, obtén los datos del carrito
      const carritoData = carritoDoc.data();
      const productos = carritoData.productos; // Esto es un arreglo de productos

      // Ahora puedes trabajar con el arreglo de productos como desees
      console.log("Productos en el carrito:", productos);

      return productos; // Devuelve el arreglo de productos
    } else {
      // El carrito no existe para este usuario
      console.log("El carrito no existe para este usuario");
      return []; // Devuelve un arreglo vacío o maneja el caso según tu lógica
    }
  } catch (error) {
    console.error("Error al obtener productos del carrito:", error);
    return []; // Maneja el error según tus necesidades
  }
};

export default getCartProducts;
