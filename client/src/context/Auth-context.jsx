import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/credenciales";
import getUser from "../firebase/getUser";
export const userAuth = createContext();

const UserContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (userFirebase) => {
      if (userFirebase) {
        setCurrentUser(userFirebase);
        const isRegistered = await getUser(userFirebase.uid);
        isRegistered && setIsRegistered(true);
      }
    });
  }, []);

  return (
    <userAuth.Provider
      value={{ currentUser, isRegistered, loading, setLoading }}
    >
      {children}
    </userAuth.Provider>
  );
};

export default UserContext;
