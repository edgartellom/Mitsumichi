import { doc, setDoc, collection } from "firebase/firestore";
import { db } from "./credenciales";

const generateUniqueReviewNumber = () => {
  const timestamp = Date.now(); // Obtener la fecha actual en milisegundos
  const randomNumber = Math.floor(Math.random() * 10000); // Número aleatorio de 0 a 9999
  return `${timestamp}${randomNumber}`; // Combinar la marca de tiempo y el número aleatorio
};

const createReview = async (userId, reviewInfo) => {
    console.log(userId, reviewInfo)
  try {
    // Generar un número de factura único (puedes implementar tu lógica aquí)
    const reviewNumber = generateUniqueReviewNumber();

    // Crear una referencia al documento de factura en la colección de facturas del usuario
    const userreviewRef = collection(db, "users", userId, "reviews");
    const reviewRef = doc(userreviewRef, reviewNumber);

    // Guardar la factura en Firestore
    await setDoc(reviewRef, {
      reviewNumber,
      ...reviewInfo, // Otros detalles de la factura
    });

    return reviewNumber; // Devolver el número de factura generado
  } catch (error) {
    console.error("Error al crear la reseña:", error);
    throw error;
  }
};

export default createReview;