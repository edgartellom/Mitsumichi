import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import {
  IoGrid,
  IoPersonSharp,
  IoPricetag,
  IoDocumentText,
  IoBagHandleSharp,
  IoThumbsUpSharp,
} from "react-icons/io5";
import { TiThMenu } from "react-icons/ti";

import logo from "../../../../assets/Logo_Mitsumichi_Cat_White.png";
import logoCerrado from "../../../../assets/Logo_Mitsumichi_White.png";
import insta from "../../../../assets/footer_img/insta.gif";
import face from "../../../../assets/footer_img/face.gif";
import mail from "../../../../assets/footer_img/mail.gif";

import { CustomButton } from "../IU_Componentes";

import "./styles.css";

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
  orders: "8",
  reviews: "23",
};

const Sidebar_Dashboard = () => {
  const location = useLocation(); // Obtiene la ruta actual

  const [openMenu, setOpenMenu] = useState(true);
  const [showItems, setShowItems] = useState(true);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [zoomedIn, setZoomedIn] = useState(false);

  const [activeRoute, setActiveRoute] = useState(""); // Estado para la ruta activa

  const buttonsItems = [
    { text: "DASHBOARD", route: "/dashboard", icon: <IoGrid size={40} /> },
    {
      text: "PRODUCTS",
      route: "/dashboard/products-admin",
      icon: <IoBagHandleSharp size={40} />,
    },
    {
      text: "ORDERS",
      route: "/dashboard/orders-admin",
      icon: <IoDocumentText size={40} />,
    },
    {
      text: "USERS",
      route: "/dashboard/users-admin",
      icon: <IoPersonSharp size={40} />,
    },
    {
      text: "REVIEWS",
      route: "/dashboard/reviews-admin",
      icon: <IoThumbsUpSharp size={40} />,
    },
    {
      text: "OFFERS",
      route: "/dashboard/offers-admin",
      icon: <IoPricetag size={40} />,
    },
  ];

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
    if (!openMenu) {
      setTimeout(() => {
        setShowItems(true);
      }, 250);
    } else {
      setShowItems(false);
    }
  };

  function isZoomedIn() {
    const zoomLevel = window.devicePixelRatio || 1;
    return zoomLevel > 1;
  }

  // Aqui uso useEffect para verificar cual es el ancho de la ventana inicialmente y asi ajustar la vista móvil o de escritorio
  useEffect(() => {
    const handleWindowResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setZoomedIn(isZoomedIn()); // Agrega un estado para detectar el zoom
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  // Estado inicial dependiendo en donde se encuentre, si es un móvil o pc, para ajustar la vista móvil o de escritorio
  useEffect(() => {
    if (isMobile) {
      setOpenMenu(false); // En móvil, el menú está cerrado inicialmente
      setShowItems(false); // En móvil, los elementos están ocultos inicialmente
    } else {
      setOpenMenu(true); // En escritorio, el menú está abierto inicialmente
      setShowItems(true); // En escritorio, los elementos están visibles inicialmente
    }
  }, [isMobile]);

  useEffect(() => {
    // Escucha cambios en la ruta y actualiza el estado
    setActiveRoute(location.pathname);
  }, [location.pathname]);

  return isMobile ? (
    <div
      className={`flex flex-col bg-[#252525] h-screen pt-8  ${
        openMenu ? "p-5 w-[320px]" : " pl-0 w-[0px]"
      } duration-300 absolute top-0 left-0 z-10 border-r-4 border-[#C63D05]`}
    >
      <button
        type="button"
        className={`bg-transparent rounded-md absolute  ${
          openMenu ? "top-4 right-4" : "top-4 -right-14"
        }  cursor-pointer duration-200 hover:bg-[#ffffff27] hover:text-slate-100`}
      >
        <TiThMenu
          size={40}
          className="bg-transparent text-[#C63D05]"
          onClick={toggleMenu}
        />
      </button>

      {showItems && (
        <div className="bg-transparent rounded-md absolute w-[60px] top-4 left-4">
          <img src={logoCerrado} alt="" />
        </div>
      )}

      {showItems && (
        <div
          className={`flex flex-col items-center duration-300 mt-12 ${
            openMenu ? "block" : "hidden"
          }`}
        >
          <div className="flex border-2  border-[#C63D05] rounded-lg w-[100px] h-[100px] overflow-hidden">
            <img src={user.avatar} alt="" />
          </div>
          <h1 className="mt-2 text-[#C63D05] text-[20px] font-bold">
            {user.role.label}
          </h1>
        </div>
      )}

      <div
        className={`absolute duration-300 bottom-0 top-[250px] ${
          openMenu ? " pb-10 left-12 " : " left-3 pb-[290px]"
        } flex flex-col items-center overflow-y-auto scrollbar-thin`}
      >
        {showItems && (
          <div className="flex flex-col items-center overflow-auto">
            <CustomButton
              icon={buttonsItems[0].icon}
              text={buttonsItems[0].text}
              route={buttonsItems[0].route}
              showIcon={openMenu}
              showText={showItems}
              isActive={activeRoute === buttonsItems[0].route}
            />

            <CustomButton
              icon={<IoBagHandleSharp size={40} />}
              text={buttonsItems[1].text}
              route={buttonsItems[1].route}
              showIcon={openMenu}
              showText={showItems}
              isActive={activeRoute === buttonsItems[1].route}
            />

            <CustomButton
              icon={<IoDocumentText size={40} />}
              text={buttonsItems[2].text}
              route={buttonsItems[2].route}
              showIcon={openMenu}
              showText={showItems}
              isActive={activeRoute === buttonsItems[2].route}
            />

            <CustomButton
              icon={<IoPersonSharp size={40} />}
              text={buttonsItems[3].text}
              route={buttonsItems[3].route}
              showIcon={openMenu}
              showText={showItems}
              isActive={activeRoute === buttonsItems[3].route}
            />

            <CustomButton
              icon={<IoThumbsUpSharp size={40} />}
              text={buttonsItems[4].text}
              route={buttonsItems[4].route}
              showIcon={openMenu}
              showText={showItems}
              isActive={activeRoute === buttonsItems[4].route}
            />

            <CustomButton
              icon={<IoPricetag size={40} />}
              text={buttonsItems[5].text}
              route={buttonsItems[5].route}
              showIcon={openMenu}
              showText={showItems}
              isActive={activeRoute === buttonsItems[5].route}
            />
          </div>
        )}
      </div>
    </div>
  ) : (
    <div
      className={`flex flex-col bg-[#252525] h-screen p-5 pt-8 ${
        openMenu ? "w-[320px]" : "w-[75px]"
      } duration-300 border-r-4 border-[#C63D05] ${
        isZoomedIn() ? "relative overflow-auto scrollbar-thin" : "relative"
      }`}
    >
      <button
        type="button"
        className="bg-[#252525] rounded-md absolute top-4 right-4 cursor-pointer duration-200 hover:bg-[#ffffff27] hover:text-slate-100 "
      >
        <TiThMenu
          size={40}
          className="bg-transparent text-[#C63D05]"
          onClick={toggleMenu}
        />
      </button>

      {showItems && (
        <div
          className={`flex flex-col items-center duration-300 pt-12 ${
            openMenu ? "block" : "hidden"
          }`}
        >
          <div className="flex border-2 border-[#C63D05] rounded-full w-[150px] h-[150px] overflow-hidden">
            <img src={user.avatar} alt="" />
          </div>
          <h2 className="text-white font-bold pt-3">{user.name}</h2>
          <h2 className="text-[#C63D05] font-bold pt-1">{user.role.label}</h2>
        </div>
      )}

      <div
        className={`absolute duration-300 bottom-0  top-[330px]  ${
          openMenu ? " pb-10 left-12 " : " left-3 pb-[290px]"
        } flex flex-col items-center`}
      >
        <div className="flex flex-col items-center">
          <CustomButton
            icon={buttonsItems[0].icon}
            text={buttonsItems[0].text}
            route={buttonsItems[0].route}
            showIcon={openMenu}
            showText={showItems}
            isActive={activeRoute === buttonsItems[0].route}
          />

          <CustomButton
            icon={<IoBagHandleSharp size={40} />}
            text={buttonsItems[1].text}
            route={buttonsItems[1].route}
            showIcon={openMenu}
            showText={showItems}
            isActive={activeRoute === buttonsItems[1].route}
          />

          <CustomButton
            icon={<IoDocumentText size={40} />}
            text={buttonsItems[2].text}
            route={buttonsItems[2].route}
            showIcon={openMenu}
            showText={showItems}
            isActive={activeRoute === buttonsItems[2].route}
          />

          <CustomButton
            icon={<IoPersonSharp size={40} />}
            text={buttonsItems[3].text}
            route={buttonsItems[3].route}
            showIcon={openMenu}
            showText={showItems}
            isActive={activeRoute === buttonsItems[3].route}
          />

          <CustomButton
            icon={<IoThumbsUpSharp size={40} />}
            text={buttonsItems[4].text}
            route={buttonsItems[4].route}
            showIcon={openMenu}
            showText={showItems}
            isActive={activeRoute === buttonsItems[4].route}
          />

          <CustomButton
            icon={<IoPricetag size={40} />}
            text={buttonsItems[5].text}
            route={buttonsItems[5].route}
            showIcon={openMenu}
            showText={showItems}
            isActive={activeRoute === buttonsItems[5].route}
          />
        </div>

        {showItems && (
          <section className="flex flex-col items-center ">
            <div className="w-[150px] mt-6">
              <img src={logo} alt="" />
            </div>
            <article className=" flex justify-center">
              <div>
                <ul className="mt-4 flex space-x-4">
                  <li>
                    <a
                      href="https://es-la.facebook.com/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={face}
                        className="w-8 h-8 rounded-lg"
                        alt="facebook_icon"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={insta}
                        className="w-8 h-8 rounded-lg"
                        alt="insta_icon"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:mitsumichipf@gmail.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={mail}
                        className="w-8 h-8 rounded-lg"
                        alt="mail_icon"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </article>
            <h2 className="text-white font-bold">© 2023 MITSUMISHI S.A.</h2>
          </section>
        )}
      </div>
    </div>
  );
};

export default Sidebar_Dashboard;
