import Wrapper from "../../helper/Wrapper";
import CartItem from "./CartItem";
const Cart = ({ setShowCart }) => {
  const cartItems = (
    <ul className=" list-none m-0 p-0 max-h-80 overflow-auto">
      {/*   {cartCtx.items.map((item) => ( */}
      <CartItem
      /*  key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)} */
      />
      {/*       ))} */}
      <CartItem />
    </ul>
  );
  return (
    <Wrapper>
      <div className=" bg-white p-4  rounded-lg  animate-slide-down">
        {cartItems}
        <div className=" flex justify-between items-center font-bold text-1.5rem my-4">
          <span className=" font-bold text-2xl">Total Amount</span>
          <span className=" font-bold text-2xl">
            {/* {totalAmount} */}$1212
          </span>
        </div>
        <div className=" text-right">
          <button
            onClick={() => setShowCart(false)}
            className=" hover:bg-red-800  hover:border-red-800 hover:text-white font-inherit cursor-pointer bg-transparent border  border-orange-600 px-5 py-2 rounded-2xl"
          >
            Close
          </button>
          {/*  {hasItems && <button className={classes.button}>Order</button>} */}
        </div>
      </div>
    </Wrapper>
  );
};

export default Cart;
