import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./credenciales";

// Función para obtener todas las facturas de un usuario
const getInvoicesByUser = async (userId) => {
  try {
    // Crear una referencia a la subcolección "facturas" del usuario
    const userInvoicesRef = collection(db, "users", userId, "facturas");

    // Crear una consulta para obtener todas las facturas del usuario
    const q = query(userInvoicesRef);

    // Ejecutar la consulta
    const querySnapshot = await getDocs(q);

    // Iterar a través de los resultados y almacenar las facturas en un arreglo
    const invoices = [];
    querySnapshot.forEach((doc) => {
      invoices.push({ id: doc.id, ...doc.data() });
    });

    return invoices; // Devolver el arreglo de facturas
  } catch (error) {
    console.error("Error al obtener las facturas:", error);
    throw error;
  }
};

export default getInvoicesByUser;
