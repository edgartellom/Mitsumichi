import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

import { Title_Label } from "../IU_Componentes";

const user = {
  name: "Hengers Emmanuel Rosario Morales",
  avatar: "https://avatars.githubusercontent.com/u/106262730?v=4",
  role: {
    value: "superAdmin",
    label: "S. Administrador",
  },
  email: "hengersrosario@example.com",
  phone: "+10987654321",
  status: "enabled",
};

const Navbar_Dashboard = () => {
  const location = useLocation();

  const [pageTitle, setPageTitle] = useState("");

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Leo el tamaño de la pantalla. Esto es necesario para detectar el tamaño de la pantalla en la que se encuentra la página actual y asi adaptar en contenido.
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // console.log(screenWidth);

  // Esto asegura que el título solo se establecerá cuando la ruta cambie y el título actual sea diferente.
  useEffect(() => {
    switch (location.pathname) {
      case "/dashboard":
        setPageTitle("DASHBOARD");
        break;
      case "/dashboard/products-admin":
        setPageTitle("PRODUCTS ADMIN");
        break;
      case "/dashboard/orders-admin":
        setPageTitle("ORDERS ADMIN");
        break;
      case "/dashboard/users-admin":
        setPageTitle("USERS ADMIN");
        break;
      case "/dashboard/reviews-admin":
        setPageTitle("REVIEWS ADMIN");
        break;
      case "/dashboard/offers-admin":
        setPageTitle("OFFERS ADMIN");
        break;
      default:
        break;
    }
  }, [location.pathname, pageTitle]);

  return screenWidth <= 768 ? (
    <nav className="bg-[#252525] h-[75px] w-full border-b-4 border-[#C63D05] duration-200 ">
      {screenWidth > 650 ? (
        <div className="flex flex-row items-center justify-between duration-200">
          <div className={`flex items-center ml-16 `}>
            <Title_Label pageTitle={pageTitle} />
          </div>

          <div
            className={`flex flex-row-reverse h-full items-center pt-1 mr-5 duration-200`}
          >
            <div className="flex border-2 border-[#C63D05] rounded-full w-[60px] h-[60px] overflow-hidden">
              <button type="button">
                <img src={user.avatar} alt="" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`flex items-center justify-center pt-0.5 ml-5 duration-200 ${
            screenWidth < 360
              ? "scale-[0.75]"
              : screenWidth < 320
              ? "scale-[0.7]"
              : ""
          }`}
        >
          <Title_Label pageTitle={pageTitle} />
        </div>
      )}
    </nav>
  ) : (
    <nav
      className={` flex flex-row justify-between bg-[#252525] h-[75px] w-full border-b-4 border-[#C63D05]`}
    >
      <div
        className={`flex items-center duration-200 ${
          screenWidth < 768 ? "ml-10" : "ml-5"
        }`}
      >
        <Title_Label pageTitle={pageTitle} />
      </div>

      <div
        className={`flex flex-row-reverse h-full items-center mr-5 duration-300`}
      >
        <div className="flex border-2 border-[#C63D05] rounded-full w-[60px] h-[60px] overflow-hidden">
          <button type="button">
            <img src={user.avatar} alt="" />
          </button>
        </div>
        {screenWidth > 1050 && (
          <div className="flex flex-col items-end mr-2 duration-200 ">
            <h1 className="mt-1 text-[#ffffff] text-[14px] ">{user.name}</h1>
            <p className="text-[#C63D05] text-[14px] font-bold">
              {user.role.label}
            </p>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar_Dashboard;
