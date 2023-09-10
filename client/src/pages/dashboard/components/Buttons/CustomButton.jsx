import React from "react";
import { useNavigate } from "react-router-dom";

const CustomButton = ({ icon, text, route, showIcon, showText }) => {
  const navigate = useNavigate();

  // Redirige a la ruta especificada cuando se hace clic en el botón
  const redirectToRoute = () => {
    navigate(route);
  };

  return (
    <button
      className={`flex flex-row items-center bg-white duration-200  ${
        showIcon
          ? "duration-300 pl-2 w-[220px] h-[45px]"
          : " pl-0 w-[50px] h-[45px] justify-center"
      } rounded-md  hover:bg-[#ffffBB] hover:text-slate-100 mb-3`}
      onClick={redirectToRoute}
    >
      {showIcon && (
        <div className=" bg-transparent text-[#C63D05] cursor-pointer mr-2">
          {icon}
        </div>
      )}
      {showText && (
        <h1 className=" delay-700 text-[#252525] font-bold text-[24px] ">
          {text}
        </h1>
      )}
      {!showIcon && (
        <div className="bg-transparent text-[#C63D05] cursor-pointer">
          {icon}
        </div>
      )}
    </button>
  );
};

export default CustomButton;
