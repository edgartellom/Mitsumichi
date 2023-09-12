import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "./credenciales";

const getProfilePhoto = async (profilePicture) => {
  try {
    const imageRef = ref(storage, profilePicture);
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default getProfilePhoto;
