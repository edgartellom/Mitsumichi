import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import addProduct from "../../firebase/addProduct";
import { userAuth } from "../../context/Auth-context";
import Button from "../UI/Button";

const Card = ({ data }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(userAuth);
  const {
    brand: { name: brandName },
    tipo: { name: tipoName },
    imageUrl,
    motoModel,
    id,
    precio,
  } = data;

  const addProducto = () => {
    addProduct(currentUser.uid, {
      brand: brandName,
      tipo: tipoName,
      imageUrl: imageUrl[0],
      motoModel,
      id,
      precio,
      cantidad: 1,
    });
  };

  return (
    <article className=" bg-[#0006] max-w-[300px]  p-2 m-10 rounded-2xl">
      <section className="relative p-2 ">
        <section className=" group">
          <figure className=" rounded-xl h-[20rem]  bg-white flex items-center overflow-hidden">
            <img
              src={imageUrl[0]}
              className="scale-100  group-hover:scale-110 transition-all duration-700"
              alt="imagen de moto"
              width={300}
              height={300}
            />
            <div className=" max-md:hidden absolute rounded-xl border-4 border-orange-600 w-[95%] h-[68%]  opacity-0 group-hover:opacity-100 group-hover:scale-90 transition-all duration-700"></div>
          </figure>
          <section className=" m-6">
            <a
              href="#"
              className="block text-black text-center hover:text-primary transition-colors duration-150 text-lg md:text-xl mb-1"
            >
              <h1 className="font-bold">
                {brandName} {motoModel}
              </h1>{" "}
              <span className=" font-semibold text-lg"> Tipo {tipoName}</span>
            </a>
            <p className=" md:text-sm text-center text-red-800 font-bold">
              USD {precio}$
            </p>
          </section>
          <section className="flex justify-center max-md:flex-col gap-3">
            <Button
              onClick={addProducto}
              text="Add"
              className=" text-white hover:text-black hover:bg-white text-xl shadow-none "
            />

            <Button
              onClick={() => navigate(`/detail/${id}`)}
              text="View"
              className=" bg-white  hover:text-white hover:bg-black text-xl shadow-none "
            />
          </section>
        </section>
      </section>
    </article>
  );
};

export default Card;
