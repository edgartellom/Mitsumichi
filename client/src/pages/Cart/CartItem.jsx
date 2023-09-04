const CartItem = ({ name, price, imagen }) => {
  return (
    <li className=" flex  border-b-2  gap-10 items-center  border-orange-600 p-5  m-5 mt-0">
      <div className="">
        <img src={imagen} alt="foto de una moto" width={150} />
      </div>
      <div>
        <h2 className=" mb-2 text-black font-semibold text-xl">{name}</h2>
        <div className=" w-40 flex gap-2  items-center">
          <span className=" font-bold text-[#8a2b06]">{price}</span>
          <span className=" font-bold border border-solid border-gray-300 py-1 px-3 rounded-lg text-[#363636]">
            x {/* {props.amount} */}1
          </span>
        </div>
      </div>
      <div className=" self-center">
        <button
          className=" hover:bg-[#8a2b06] hover:text-white font-inherit font-bold text-1.25rem text-orange-600 border border-solid border-orange-600 w-12 text-center rounded-md bg-transparent cursor-pointer ml-4 my-1" /* onClick={props.onRemove} */
        >
          −
        </button>
        <button
          className=" hover:bg-[#8a2b06] hover:text-white  font-inherit font-bold text-1.25rem text-orange-600 border border-solid border-orange-600 w-12 text-center rounded-md bg-transparent cursor-pointer ml-4 my-1" /* onClick={props.onAdd} */
        >
          +
        </button>
      </div>
    </li>
  );
};

export default CartItem;
