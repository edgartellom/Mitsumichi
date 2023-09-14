import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/credenciales";
import getUser from "../firebase/getUser";
import getProfilePhoto from "../firebase/getProfilePhoto";

export const userAuth = createContext();

const UserContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [photoURL, setPhotoURL] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, async (userFirebase) => {
      if (userFirebase) {
        setCurrentUser(userFirebase);
        const user = await getUser(userFirebase.uid);
        if (user) {
          setUser(user);
          const photo = await getProfilePhoto(user?.photoURL);
          setPhotoURL(photo);
          setIsRegistered(true);
        } else {
          // Handle the case when the user data is not available
          setIsRegistered(false);
        }
      }
      setLoading(false);
    });
  }, []);

  return (
    <userAuth.Provider
      value={{
        currentUser,
        isRegistered,
        loading,
        setLoading,
        user,
        photoURL,
        setPhotoURL,
        products,
        setProducts,
      }}
    >
      {children}
    </userAuth.Provider>
  );
};

export default UserContext;
