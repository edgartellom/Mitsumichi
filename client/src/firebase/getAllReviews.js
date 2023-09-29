import { collectionGroup, getDocs, query } from "firebase/firestore";
import { db } from "./credenciales";

const getAllReviews = async () => {
  try {
    const q = query(
      collectionGroup(db, "reviews")
    );
    const querySnapshot = await getDocs(q);
    const reviews = [];
    querySnapshot.forEach((doc) => {
      reviews.push({ id: doc.id, ...doc.data() });
    });

    return reviews;
  } catch (error) {
    console.error("Error al obtener todas las facturas:", error);
    throw error;
  }
};

export default getAllReviews;