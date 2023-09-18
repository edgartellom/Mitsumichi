import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "./credenciales";

const addProduct = async (uid, producto) => {
  try {
    const carritoDocRef = doc(db, "carritos", uid);
    // Consulta el documento actual del carrito
    const carritoDoc = await getDoc(carritoDocRef);
    // Si el documento del carrito existe, actualiza su contenido

    if (Array.isArray(producto)) {
      console.log("Es un array");
      const extingProducts = carritoDoc.data().productos;
      if (extingProducts.length > 0) {
        const combinedProducts = [...extingProducts, ...producto];
        const conteo = [];

        for (const producto of combinedProducts) {
          const existe = conteo.find((p) => p.id === producto.id);

          if (existe) {
            existe.cantidad += producto.cantidad;
          } else {
            conteo.push(producto);
          }
        }
        conteo &&
          (await updateDoc(carritoDocRef, {
            productos: conteo,
          }));
      } else {
        carritoDoc.exists() &&
          producto &&
          (await updateDoc(carritoDocRef, {
            productos: arrayUnion(producto),
          }));
      }
    } else {
      carritoDoc.exists() &&
        producto &&
        (await updateDoc(carritoDocRef, {
          productos: arrayUnion(producto),
        }));
    }
  } catch (error) {
    console.error("Error al agregar producto al carrito:", error);
  }
};

export default addProduct;
