import { collectionGroup, getDocs, where, query } from "firebase/firestore";
import { db } from "./credenciales";

// Función para obtener todas las facturas de todos los usuarios
const getAllInvoices = async () => {
  try {
    // Crear una consulta que busca en todas las subcolecciones "facturas" de todos los usuarios
    const q = query(
      collectionGroup(db, "facturas")
      // Puedes agregar condiciones de filtrado si es necesario
      // Por ejemplo, where("campo", "==", valor)
    );

    // Ejecutar la consulta
    const querySnapshot = await getDocs(q);

    // Iterar a través de los resultados y almacenar las facturas en un arreglo
    const invoices = [];
    querySnapshot.forEach((doc) => {
      invoices.push({ id: doc.id, ...doc.data() });
    });

    return invoices; // Devolver el arreglo de todas las facturas
  } catch (error) {
    console.error("Error al obtener todas las facturas:", error);
    throw error;
  }
};

export default getAllInvoices;
