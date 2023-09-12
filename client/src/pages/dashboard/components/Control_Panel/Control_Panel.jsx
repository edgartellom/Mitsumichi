import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { TiArrowBack } from "react-icons/ti";

import { Link } from "react-router-dom";

const Control_Panel = ({
  showBackButton,
  showSearchBar,
  showRoutes,
  showAdditionalButtons,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [locationName, setLocationName] = useState("");

  const handlerHistory = () => {
    window.history.back();
  };

  useEffect(() => {
    switch (location.pathname) {
      case "/dashboard":
        setLocationName("");
        break;
      case "/dashboard/products-admin":
        setLocationName("Products");
        break;
      case "/dashboard/orders-admin":
        setLocationName("Orders");
        break;
      case "/dashboard/users-admin":
        setLocationName("Users");
        break;
      case "/dashboard/reviews-admin":
        setLocationName("Reviews");
        break;
      case "/dashboard/offers-admin":
        setLocationName("Offers");
        break;
      default:
        // if (location.pathname.startsWith("/dashboard/products-admin")) {
        //   setLocationName("Products");
        //   if (location.pathname === "/dashboard/products-admin/add-new-moto") {
        //     setLocationName("Create Moto");
        //   }
        // }
        break;
    }
  }, [location.pathname, locationName]);

  const redirectToCreate = () => {
    navigate("/dashboard/products-admin/add-new-moto");
  };

  return (
    <div className="bg-[#ffffff] h-28 px-4 py-2  flex items-center justify-between">
      <div className="flex flex-col h-full justify-between ">
        <div className="flex items-center w-fit">
          <button
            className="bg-[#C63D05] text-white px-4 mb-8 rounded-lg shadow-sm duration-300 hover:shadow-sm shadow-[#202020] hover:text-gray-900 hover:bg-[#ff6600]"
            onClick={handlerHistory}
          >
            <TiArrowBack size={40} />
          </button>

          {location.pathname === "/dashboard/products-admin" && (
            <button
              onClick={redirectToCreate}
              className="absolute right-5 bg-slate-100 text-[#C63D05] font-bold px-4 mb-8 rounded-lg shadow-sm duration-300 hover:shadow-sm shadow-[#202020] hover:text-gray-900 hover:bg-[#ff6600]"
            >
              ADD
            </button>
          )}
        </div>

        <div className="text-[#252525] font-semibold">
          <Link to="/home">Mitsumichi</Link>

          <span className="mx-2">/</span>

          {location.pathname === "/dashboard" ? (
            <Link to="/dashboard" className="text-[#C63D05]">
              Dashboard
            </Link>
          ) : (
            <Link to="/dashboard">Dashboard</Link>
          )}

          {location.pathname !== "/dashboard" && (
            <span className="mx-2">/</span>
          )}
          <span className="text-[#C63D05]">{locationName}</span>
        </div>
      </div>
    </div>
  );
};

export default Control_Panel;
