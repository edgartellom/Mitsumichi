import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./credenciales";

const decrease = async (uid, productoID) => {
  try {
    const carritoDocRef = doc(db, "carritos", uid); // Referencia al documento del carrito

    // Obtén el documento del carrito
    const carritoDoc = await getDoc(carritoDocRef);

    if (carritoDoc.exists()) {
      // El carrito existe, obtén los datos del carrito
      const carritoData = carritoDoc.data();
      const productos = carritoData.productos;

      // Encuentra el índice del producto en el arreglo
      const index = productos.findIndex(
        (producto) => producto.id === productoID
      );

      if (index !== -1) {
        // El producto existe en el carrito, disminuye su cantidad
        if (productos[index].cantidad > 0) {
          productos[index].cantidad -= 1;

          // Actualiza el documento del carrito con los productos actualizados
          await updateDoc(carritoDocRef, {
            productos: productos,
          });

          console.log("Cantidad del producto disminuida con éxito");
        } else {
          console.log("La cantidad ya es 0, no se puede disminuir más.");
        }
      } else {
        // El producto no existe en el carrito
        console.log("El producto no existe en el carrito");
      }
    } else {
      // El carrito no existe para este usuario
      console.log("El carrito no existe para este usuario");
    }
  } catch (error) {
    console.error("Error al disminuir la cantidad del producto:", error);
    // Puedes lanzar una excepción aquí si deseas que la función que llama a "decrease" maneje el error.
  }
};

export default decrease;
