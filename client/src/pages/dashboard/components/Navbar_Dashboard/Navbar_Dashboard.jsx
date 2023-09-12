import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import login from "../../../../assets/login.png";
import { userAuth } from "../../../../context/Auth-context";

import Profile_Popup from "../Profile_Dropdown/Profile_Dropdown";
import { Title_Label } from "../IU_Componentes";
import Profile_Dropdown from "../Profile_Dropdown/Profile_Dropdown";

// const user = {
//   displayName: "Hengers Emmanuel Rosario Morales",
//   photoURL: "https://avatars.githubusercontent.com/u/106262730?v=4",
//   role: {
//     value: "superAdmin",
//     label: "S. Administrador",
//   },
//   email: "hengersrosario@example.com",
//   phone: "+10987654321",
//   status: "enabled",
//   orders: "8",
//   reviews: "23",
// };

const Navbar_Dashboard = () => {
  const location = useLocation();

  const { currentUser, user, photoURL } = useContext(userAuth);

  const [userRole, setUserRole] = useState("");
  const [pageTitle, setPageTitle] = useState("");
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!isProfileDropdownOpen);
  };

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
  useEffect(() => {
    // Uso este useEffect para actualizar userRole cuando role cambie
    switch (user?.role) {
      case "supAdmin":
        setUserRole("S. Administrador");
        break;
      case "admin":
        setUserRole("Administrador");
        break;
      case "user":
        setUserRole("Usuario");
        break;
      default:
        break;
    }
  }, [user?.role]);

  // Esto asegura que el título solo se establecerá cuando la ruta cambie y el título actual sea diferente.
  useEffect(() => {
    switch (location.pathname) {
      case "/dashboard":
        setPageTitle("DASHBOARD");
        break;
      case "/dashboard/products-admin":
        if (screenWidth <= 650) {
          setPageTitle("PRODUCTS");
        } else setPageTitle("PRODUCTS ADMIN");
        break;
      case "/dashboard/orders-admin":
        if (screenWidth <= 650) {
          setPageTitle("ORDERS");
        } else setPageTitle("ORDERS ADMIN");
        break;
      case "/dashboard/users-admin":
        if (screenWidth <= 650) {
          setPageTitle("USERS");
        } else setPageTitle("USERS ADMIN");
        break;
      case "/dashboard/reviews-admin":
        if (screenWidth <= 650) {
          setPageTitle("REVIEWS");
        } else setPageTitle("REVIEWS ADMIN");
        break;
      case "/dashboard/offers-admin":
        if (screenWidth <= 650) {
          setPageTitle("OFFERS");
        } else setPageTitle("OFFERS ADMIN");
        break;
      default:
        break;
    }
  }, [location.pathname, pageTitle, screenWidth]);

  const photo = photoURL.length > 0 ? photoURL : login;

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
            <div
              onClick={toggleProfileDropdown}
              className={`flex border-4 ${
                role === "admin" ? "border-[#C63D05]/95" : "border-slate-500/80"
              } rounded-full w-[60px] h-[60px] shadow-sm duration-150 ${
                !isProfileDropdownOpen
                  ? "hover:shadow-md hover:border-2"
                  : "shadow-sm border-2"
              } shadow-[#202020] overflow-hidden`}
            >
              <button type="button">
                {currentUser ? <img src={photo} alt="" /> : null}
              </button>

              {isProfileDropdownOpen && (
                <Profile_Dropdown
                  user={currentUser}
                  role={user.role}
                  isOpen={isProfileDropdownOpen}
                  onClose={toggleProfileDropdown}
                  topMargin="top-[60px]"
                />
              )}
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
        className={`flex flex-row-reverse h-full items-center mr-5 duration-200`}
      >
        <div
          onClick={toggleProfileDropdown}
          className={`flex border-4 ${
            role === "admin" ? "border-[#C63D05]/95" : "border-slate-500/80"
          } rounded-full w-[60px] h-[60px] shadow-sm duration-150 ${
            !isProfileDropdownOpen
              ? "hover:shadow-md hover:border-2"
              : "shadow-sm border-2"
          } shadow-[#202020] overflow-hidden`}
        >
          <button type="button">
            {currentUser ? <img src={photo} alt="" /> : null}
          </button>
          {isProfileDropdownOpen && (
            <Profile_Dropdown
              user={currentUser}
              photoURL={photo}
              role={user.role}
              isOpen={isProfileDropdownOpen}
              onClose={toggleProfileDropdown}
              topMargin="top-[60px]"
            />
          )}
        </div>
        {screenWidth > 1050 && !isProfileDropdownOpen && (
          <div className="flex flex-col items-end mr-2 duration-200 ">
            {currentUser ? (
              <>
                <h1 className="mt-1 text-[#ffffff] text-[14px] ">
                  {currentUser.displayName}
                </h1>
                <p
                  className={`text-[14px] font-bold ${
                    role === "admin" ? "text-[#C63D05]" : "text-slate-400"
                  }`}
                >
                  {userRole}
                </p>
              </>
            ) : null}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar_Dashboard;
