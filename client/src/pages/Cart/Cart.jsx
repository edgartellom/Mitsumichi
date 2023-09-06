import Wrapper from "../../helper/Wrapper";
import CartItem from "./CartItem";
import getCartProducts from "../../firebase/getCartProducts";
import { useContext, useEffect, useState } from "react";
import { userAuth } from "../../context/Auth-context";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/credenciales";
import Button from "../../components/UI/Button";

const Cart = ({ setShowCart }) => {
  const { currentUser } = useContext(userAuth);
  const [products, setProducts] = useState([]);

  const gettingProducts = async () =>
    !currentUser ? [] : await getCartProducts(currentUser.uid);

  useEffect(() => {
    gettingProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  useEffect(() => {
    // Configura el oyente de Firebase Firestore cuando el carrito se abre
    if (!currentUser) return;
    const cartDocRef = doc(db, "carritos", currentUser.uid);
    const unsubscribe = onSnapshot(cartDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const updatedData = docSnapshot.data();
        const updatedProducts = updatedData.productos || [];

        // Filtra los productos visibles eliminando aquellos con cantidad cero
        const updatedVisibleProducts = updatedProducts.filter(
          (product) => product.cantidad > 0
        );

        setProducts(updatedVisibleProducts);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const cartItems = (
    <ul className="  max-h-80 overflow-auto">
      {products.map((product) => {
        return (
          <CartItem
            key={product.id}
            id={product.id}
            name={product.brand?.name}
            price={product.precio}
            imagen={product.imageUrl}
            amount={product.cantidad}
          />
        );
      })}
    </ul>
  );

  const totalAmount = products.reduce((curNumber, item) => {
    return curNumber + Number(item.precio) * item.cantidad;
  }, 0);

  return (
    <Wrapper>
      {products?.length ? (
        <div className="bg-gray-300 p-4 rounded-lg animate-slide-down">
          {cartItems}
          <div className="flex max-md:gap-5 justify-center font-bold gap-40 text-1.5rem my-4">
            <span className="font-bold text-2xl">Total Amount:</span>
            <span className="font-bold text-2xl">{totalAmount}$</span>
          </div>
          <div className="flex max-md:flex-col justify-center gap-4 pb-3">
            <Button
              onClick={() => {
                setShowCart(false);
              }}
              text={"Close"}
              className=" text-white rounded-2xl shadow-none hover:scale-105"
            />

            {products.length > 0 && (
              <Button
                className=" bg-white rounded-2xl transform hover:scale-105 shadow-none border-solid border-2 border-black "
                text="Order"
              />
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white p-4 rounded-lg animate-slide-down">
          <div className="flex justify-between items-center font-bold text-1.5rem my-4">
            <span className="font-bold text-2xl">Carrito vacio</span>
          </div>
          <div className="flex justify-center gap-2">
            <Button
              onClick={() => {
                setShowCart(false);
              }}
              text={"Close"}
              className=" text-white rounded-2xl shadow-none hover:scale-105"
            />
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default Cart;
