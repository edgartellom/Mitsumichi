import { ref, uploadBytes } from "firebase/storage";
import { storage } from "./credenciales";

const setUserProfilePhoto = async (uid, photo) => {
  try {
    const imageRef = ref(storage, `images/${uid}/profilePhoto`);
    const resUpload = await uploadBytes(imageRef, photo);
    return resUpload;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default setUserProfilePhoto;
