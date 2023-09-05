import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import addProduct from "../../firebase/addProduct";
import { userAuth } from "../../context/Auth-context";
const Card = ({ data }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(userAuth);
  const {
    brand: { name },
    imageUrl,
    motoModel,
    id,
    precio,
    tipo,
  } = data;

  const handleDetail = () => {
    navigate(`/detail/${id}`);
  };

  const addProducto = () => {
    addProduct(currentUser.uid, {
      brand: { name },
      imageUrl: imageUrl[0],
      motoModel,
      id,
      precio,
      tipo,
      cantidad: 1,
    });
  };

  return (
    <div className=" bg-[#0006] flex flex-col  p-2 m-10 rounded-2xl">
      <section className="relative p-2  flex  justify-center">
        <div className=" min-w-[340px]flex flex-col group">
          <figure className=" rounded-xl h-[20rem]  bg-white flex items-center overflow-hidden">
            <img
              src={imageUrl[0]}
              className="scale-100 group-hover:scale-110 transition-all duration-700"
              alt=""
              width={500}
            />

            {/* <div className="absolute z-10 border-4  border-primary w-[95%] h-[95%] invisible group-hover:visible opacity-0 group-hover:opacity-100 group-hover:scale-90 transition-all duration-500"></div> */}
            <div className="absolute rounded-xl border-4 border-orange-600 w-[95%] h-[68%]  opacity-0 group-hover:opacity-100 group-hover:scale-90 transition-all duration-700"></div>
          </figure>
          <section className=" m-5">
            <a
              href="#"
              className="block text-black text-center hover:text-primary transition-colors duration-150 text-lg md:text-xl mb-1"
            >
              <h1 className="font-bold">
                {name} {motoModel}
              </h1>{" "}
              <span className=" font-semibold text-lg"> Tipo {tipo}</span>
            </a>
            <p className="mb-4 text-sm md:text-sm text-center text-red-800 font-bold">
              USD {precio}
            </p>
          </section>
          <section className="flex justify-center gap-x-3">
            <button
              onClick={addProducto}
              className=" px-5 py-2 rounded  border-primary text-primary hover:bg-primary  transition-all outline-none bg-black border-black text-white hover:text-black hover:bg-white font-bold"
            >
              Add
            </button>

            <button
              onClick={handleDetail}
              className="px-5  rounded border-primary text-primary hover:bg-primary transition-all outline-none bg-white border-black text-black hover:text-white hover:bg-black font-bold"
            >
              View
            </button>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Card;
