// import { useContext, useEffect, useState } from "react";

import CartIcon from "./CartIcon";
// import CartContext from "../../store/cart-context";
// import classes from "./HeaderCartButton.module.css";

const CartButton = (props) => {
  // const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  // const cartCtx = useContext(CartContext);

  // const { items } = cartCtx;

  // const numberOfCartItems = items.reduce((curNumber, item) => {
  //   return curNumber + item.amount;
  // }, 0);

  // const btnClasses = `${classes.button} ${
  //   btnIsHighlighted ? classes.bump : ""
  // }`;

  // useEffect(() => {
  //   if (items.length === 0) {
  //     return;
  //   }
  //   setBtnIsHighlighted(true);

  //   const timer = setTimeout(() => {
  //     setBtnIsHighlighted(false);
  //   }, 300);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [items]);

  return (
    <button className=" cursor-pointer border-none bg-[#000000] hover:bg-[#000000da] text-white py-2 px-4  max-sm:px-1.5 max-sm:py-1 flex justify-around items-center rounded-lg font-bold">
      <span className=" max-sm:w-7 w-8  mr-2">
        <CartIcon />
      </span>
      <span className=" max-sm:hidden max-lg:hidden">Your Cart</span>
      <span className=" bg-[#b94517]  max-sm:px-2 p-1/4 px-4 rounded ml-1 font-bold hover:bg-[#92320c]">
        {/* {numberOfCartItems} */}1
      </span>
    </button>
  );
};

export default CartButton;
