import CartIcon from "./CartIcon";

const CartButton = ({ setShowCart, products }) => {
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
        {products?.length || 0}
      </span>
    </button>
  );
};

export default CartButton;
