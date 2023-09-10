import React from "react";
import { useNavigate } from "react-router-dom";

const CustomButton = ({ icon, text, route, showIcon, showText, isActive }) => {
  const navigate = useNavigate();

  // Redirige a la ruta especificada cuando se hace clic en el botón
  const redirectToRoute = () => {
    navigate(route);
  };

  return (
    <button
      className={`flex flex-row items-center ${
        isActive
          ? "bg-[#C63D05] hover:bg-[#f35f25]"
          : "bg-white hover:bg-[#f5b197] hover:text-slate-100"
      } duration-200  ${
        showIcon
          ? "duration-300 pl-2 w-[220px] h-[45px]"
          : " pl-0 w-[50px] h-[45px] justify-center"
      } rounded-md   mb-3`}
      onClick={redirectToRoute}
    >
      {showIcon && (
        <div
          className={`bg-transparent ${
            isActive ? "text-[#ffffff]" : "text-[#C63D05]"
          } cursor-pointer mr-2`}
        >
          {icon}
        </div>
      )}
      {showText && (
        <h1
          className={`delay-700 ${
            isActive ? "text-[#ffffff]" : "text-[#252525]"
          } font-bold text-[24px] `}
        >
          {text}
        </h1>
      )}
      {!showIcon && (
        <div
          className={`bg-transparent ${
            isActive ? "text-[#ffffff]" : "text-[#C63D05]"
          }  cursor-pointer`}
        >
          {icon}
        </div>
      )}
    </button>
  );
};

export default CustomButton;
