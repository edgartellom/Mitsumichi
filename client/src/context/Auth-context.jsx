import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/credenciales";
import getUser from "../firebase/getUser";
import getProfilePhoto from "../firebase/getProfilePhoto";
import getAllUsers from "../firebase/getAllUsers";
import getInvoicesByUser from "../firebase/getInvoicesByUser";
import getAllInvoices from "../firebase/getAllInvoices";
import addProduct from "../firebase/addProduct";
export const userAuth = createContext();

const UserContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [photoURL, setPhotoURL] = useState("");
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [invoices, setInvoices] = useState({});
  const [allInvoices, setAllInvoices] = useState([]);
  const [productsLocalStorage, setProductsLocalStorage] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, async (userFirebase) => {
      if (userFirebase) {
        setCurrentUser(userFirebase);
        const user = await getUser(userFirebase?.uid);
        if (user) {
          setUser(user);
          const photo = await getProfilePhoto(user?.photoURL);
          setPhotoURL(photo);
          setIsRegistered(true);
          // JSON.parse(window.localStorage.getItem("products"))?.forEach(
          // async (product) => {
          await addProduct(
            userFirebase?.uid,
            JSON.parse(window.localStorage.getItem("products"))
          );
          //   }
          // );
          localStorage.removeItem("products");
          setProductsLocalStorage([]);
        } else {
          // Handle the case when the user data is not available
          setIsRegistered(false);
        }
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setProductsLocalStorage(JSON.parse(localStorage.getItem("products")));
    (async () => {
      const response = await getAllUsers();
      setUsers(response);
      response.forEach(async (user) => {
        const res = await getInvoicesByUser(user.id);
        setInvoices((prev) => ({ ...prev, [user.id]: res }));
        const allInvoices = await getAllInvoices();
        setAllInvoices(allInvoices);
      });
    })();
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
        users,
        invoices,
        allInvoices,
        productsLocalStorage,
        setProductsLocalStorage,
      }}
    >
      {children}
    </userAuth.Provider>
  );
};

export default UserContext;
