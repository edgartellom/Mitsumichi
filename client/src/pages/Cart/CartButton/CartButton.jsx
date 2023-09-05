import CartIcon from "./CartIcon";
import React, { useContext, useEffect, useState } from "react";
import { userAuth } from "../../../context/Auth-context";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/credenciales";

const CartButton = ({ setShowCart }) => {
  const { currentUser } = useContext(userAuth);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    // Configura un oyente de Firebase Firestore para el carrito del usuario actual
    if (currentUser) {
      const cartDocRef = doc(db, "carritos", currentUser.uid);
      const unsubscribe = onSnapshot(cartDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const cartData = docSnapshot.data();
          const cartProducts = cartData.productos || [];
          const itemCount = cartProducts.reduce(
            (total, product) => total + product.cantidad,
            0
          );
          setCartItemCount(itemCount);
        } else {
          setCartItemCount(0);
        }
      });

      // Limpia el oyente cuando el componente se desmonta
      return () => {
        unsubscribe();
      };
    }
  }, [currentUser]);

  return (
    <button
      onClick={() => setShowCart(true)}
      className=" cursor-pointer border-none bg-[#000000] hover:bg-[#000000da] text-white py-2 px-4  max-sm:px-1.5 max-sm:py-1 flex justify-around items-center rounded-lg font-bold"
    >
      <span className=" max-sm:w-7 w-8  mr-2">
        <CartIcon />
      </span>
      <span className=" max-sm:hidden max-lg:hidden">Your Cart</span>
      <span className=" bg-[#b94517]  max-sm:px-2 p-1/4 px-4 rounded ml-1 font-bold hover:bg-[#92320c]">
        {cartItemCount}
      </span>
    </button>
  );
};

export default CartButton;
