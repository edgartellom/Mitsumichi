import Wrapper from "../../helper/Wrapper";
import CartItem from "./CartItem";
import getCartProducts from "../../firebase/getCartProducts";
import { useContext, useEffect, useState } from "react";
import { userAuth } from "../../context/Auth-context";

const Cart = ({ setShowCart }) => {
  const { currentUser } = useContext(userAuth);
  const [products, setProducts] = useState(null);

  const gettingProducts = async () => {
    const data = await getCartProducts(currentUser.uid);
    return data;
  };

  useEffect(() => {
    gettingProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  const cartItems = (
    <ul className=" list-none m-0 p-0 max-h-80 overflow-auto">
      {products &&
        products.map((product) => {
          return (
            <CartItem
              key={product.id}
              name={product.brand?.name}
              price={product.precio}
              imagen={product.imageUrl}
            />
          );
        })}
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
        <div className=" flex justify-center gap-2">
          <button
            onClick={() => setShowCart(false)}
            className=" hover:bg-red-800  hover:border-red-800 hover:text-white font-inherit cursor-pointer bg-transparent border  border-orange-600 px-5 py-2 rounded-2xl"
          >
            Close
          </button>
          {products && (
            <button className=" bg-red-800 text-white hover:bg-transparent  hover:border-red-800 hover:text-black font-inherit cursor-pointer bg-transparent border  border-orange-600 px-5 py-2 rounded-2xl">
              Order
            </button>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default Cart;
