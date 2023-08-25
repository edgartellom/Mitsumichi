import React from "react";

const Card = ({ data }) => {
  const {
    brand: { name },
    imageUrl,
    motoModel,
  } = data;

  console.log(name);
  console.log(data);
  return (
    <div className="bg-gray-300 flex flex-col justify-center m-4">
      <div className="relative m-3 flex flex-wrap mx-auto justify-center">
        <div className="min-w-[340px]flex flex-col group">
          <div className="h-48 md:h-56 lg:h-[24rem] w-full bg-white border-2 border-white flex items-center justify-center text-white text-base mb-3 md:mb-5 overflow-hidden relative">
            <img
              src={imageUrl[0]}
              className="object-cover w-96 scale-100 group-hover:scale-110 transition-all duration-400"
              alt=""
            />

            <div className="absolute z-10 border-4 border-primary w-[95%] h-[95%] invisible group-hover:visible opacity-0 group-hover:opacity-100 group-hover:scale-90 transition-all duration-500"></div>
          </div>
          <a
            href="#"
            className=" block text-black text-center hover:text-primary transition-colors duration-150 text-lg md:text-xl mb-1"
          >
            <div className="font-bold">{name} </div>
            <span className=" text-lg">{motoModel.name}</span>
          </a>

          <p className="mb-4 font-light  text-sm md:text-sm text-center text-gray-400"></p>

          <div className="flex justify-center gap-x-3">
            <a
              href="#"
              className=" px-5 py-2 border border-primary text-primary hover:bg-primary  transition-all outline-none bg-black border-black text-white hover:text-black hover:bg-white font-bold"
            >
              Add
            </a>
            <a
              href="#"
              className="px-5 py-2 border border-primary text-primary hover:bg-primary transition-all outline-none bg-white border-black text-black hover:text-white hover:bg-black font-bold"
            >
              View
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
