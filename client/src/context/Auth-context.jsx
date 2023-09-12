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
        const user = await getUser(userFirebase.uid);
        if (user) {
          setRole(user.role);
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
      value={{ currentUser, isRegistered, loading, setLoading, role }}
    >
      {children}
    </userAuth.Provider>
  );
};

export default UserContext;
