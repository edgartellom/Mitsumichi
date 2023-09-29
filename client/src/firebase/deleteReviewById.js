import { doc, deleteDoc, collection } from "firebase/firestore";
import { db } from "./credenciales";

const deleteReviewById = async ({userId, reviewId}) => {
  // Obtener la referencia al documento de usuario
  console.log(userId, reviewId);
  const userDocRef = doc(db, 'users', userId);

  try {
    // Obtener la referencia al documento de revisión dentro de la subcolección "reviews"
    const reviewDocRef = doc(collection(userDocRef, 'reviews'), reviewId);
    await deleteDoc(reviewDocRef);
    console.log('Review eliminada exitosamente');
  } catch (error) {
    console.error('Error al eliminar la review:', error);
  }
};

export default deleteReviewById;

