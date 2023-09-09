import { doc, setDoc, collection } from "firebase/firestore";
import { db } from "./credenciales";

const generateUniqueInvoiceNumber = () => {
  const timestamp = Date.now(); // Obtener la fecha actual en milisegundos
  const randomNumber = Math.floor(Math.random() * 10000); // Número aleatorio de 0 a 9999
  return `${timestamp}${randomNumber}`; // Combinar la marca de tiempo y el número aleatorio
};

const createBill = async (userId, invoiceData) => {
  try {
    // Generar un número de factura único (puedes implementar tu lógica aquí)
    const invoiceNumber = generateUniqueInvoiceNumber();

    // Crear una referencia al documento de factura en la colección "facturas"
    const invoiceRef = doc(collection(db, "facturas"), invoiceNumber);

    // Guardar la factura en Firestore
    await setDoc(invoiceRef, {
      invoiceNumber,
      ...invoiceData, // Otros detalles de la factura
    });

    // Actualizar el campo de factura en el documento de usuario
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, { facturaId: invoiceNumber }, { merge: true });

    return invoiceNumber; // Devolver el número de factura generado
  } catch (error) {
    console.error("Error al crear la factura:", error);
    throw error;
  }
};

export default createBill;
