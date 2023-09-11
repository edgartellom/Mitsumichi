import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/credenciales";
import getUser from "../firebase/getUser";
export const userAuth = createContext();

const UserContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (userFirebase) => {
      if (userFirebase) {
        setCurrentUser(userFirebase);
        const isRegistered = await getUser(userFirebase.uid);
        setRole(isRegistered.role);
        isRegistered && setIsRegistered(true);
      }
      setLoading(false);
    });
  }, []);

  return (
    <userAuth.Provider
      value={{ currentUser, isRegistered, loading, setLoading, role }}
    >
      {children}
    </userAuth.Provider>
  );
};

export default UserContext;
