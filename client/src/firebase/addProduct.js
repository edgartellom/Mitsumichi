import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "./credenciales";

const addProduct = async (uid, producto) => {
  try {
    const carritoDocRef = doc(db, "carritos", uid); // Referencia al documento del carrito

    // Consulta el documento actual del carrito
    const carritoDoc = await getDoc(carritoDocRef);

    if (carritoDoc.exists()) {
      // Si el documento del carrito existe, actualiza su contenido
      await updateDoc(carritoDocRef, {
        productos: arrayUnion(producto), // Agrega el producto al arreglo de productos
      });

      console.log("Producto agregado al carrito con éxito");
    } else {
      // Si el documento del carrito no existe, puedes manejarlo según tu lógica específica
      console.error("El carrito no existe para este usuario");
    }
  } catch (error) {
    console.error("Error al agregar producto al carrito:", error);
  }
};

export default addProduct;
