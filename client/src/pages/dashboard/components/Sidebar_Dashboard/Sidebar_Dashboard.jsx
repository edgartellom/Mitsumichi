import React, { useState, useEffect } from "react";

import {
  IoGrid,
  IoPersonSharp,
  IoPricetag,
  IoDocumentText,
  IoBagHandleSharp,
  IoThumbsUpSharp,
} from "react-icons/io5";
import { TiThMenu } from "react-icons/ti";

import CustomButton from "../Buttons/CustomButton";

import logo from "../../../../assets/Logo_Mitsumichi_Cat_White.png";
import logoCerrado from "../../../../assets/Logo_Mitsumichi_White.png";
import insta from "../../../../assets/footer_img/insta.gif";
import face from "../../../../assets/footer_img/face.gif";
import mail from "../../../../assets/footer_img/mail.gif";

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

const Sidebar_Dashboard = () => {
  const [openMenu, setOpenMenu] = useState(true);
  const [showItems, setShowItems] = useState(true);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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

  // Aqui uso useEffect para verificar cual es el ancho de la ventana inicialmente y asi ajustar la vista móvil o de escritorio
  useEffect(() => {
    const handleWindowResize = () => {
      setIsMobile(window.innerWidth <= 768);
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
      setShouldAnimate(false); // Deshabilitar la animación inicial en móvil
    } else {
      setOpenMenu(true); // En escritorio, el menú está abierto inicialmente
      setShowItems(true); // En escritorio, los elementos están visibles inicialmente
      setShouldAnimate(true); // Habilitar la animación inicial en escritorio
    }
  }, [isMobile]);

  return isMobile ? (
    <div
      className={`flex flex-col bg-[#252525] h-screen pt-8 ${
        openMenu ? "p-5 w-[320px]" : " pl-0 w-[0px]"
      } duration-300 relative border-r-4 border-[#C63D05]`}
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
        className={`absolute duration-300 bottom-0  top-[250px]  ${
          openMenu ? " pb-10 left-12 " : " left-3 pb-[290px]"
        } flex flex-col items-center`}
      >
        {showItems && (
          <div className="flex flex-col items-center">
            <CustomButton
              icon={<IoGrid size={40} />}
              text="DASHBOARD"
              route="/dashboard"
              showIcon={openMenu}
              showText={showItems}
            />

            <CustomButton
              icon={<IoBagHandleSharp size={40} />}
              text="PRODUCTS"
              route="/products-admin"
              showIcon={openMenu}
              showText={showItems}
            />

            <CustomButton
              icon={<IoDocumentText size={40} />}
              text="ORDERS"
              route="/orders-admin"
              showIcon={openMenu}
              showText={showItems}
            />

            <CustomButton
              icon={<IoPersonSharp size={40} />}
              text="USERS"
              route="/users-admin"
              showIcon={openMenu}
              showText={showItems}
            />

            <CustomButton
              icon={<IoThumbsUpSharp size={40} />}
              text="REVIEWS"
              route="/reviews-admin"
              showIcon={openMenu}
              showText={showItems}
            />

            <CustomButton
              icon={<IoPricetag size={40} />}
              text="OFFERS"
              route="/offers-admin"
              showIcon={openMenu}
              showText={showItems}
            />
          </div>
        )}
      </div>
    </div>
  ) : (
    <div
      className={`flex flex-col bg-[#252525] h-screen p-5 pt-8 ${
        openMenu ? "w-[320px]" : "w-[75px]"
      } duration-300 relative border-r-4 border-[#C63D05]`}
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
            icon={<IoGrid size={40} />}
            text="DASHBOARD"
            route="/dashboard"
            showIcon={openMenu}
            showText={showItems}
          />

          <CustomButton
            icon={<IoBagHandleSharp size={40} />}
            text="PRODUCTS"
            route="/products-admin"
            showIcon={openMenu}
            showText={showItems}
          />

          <CustomButton
            icon={<IoDocumentText size={40} />}
            text="ORDERS"
            route="/orders-admin"
            showIcon={openMenu}
            showText={showItems}
          />

          <CustomButton
            icon={<IoPersonSharp size={40} />}
            text="USERS"
            route="/users-admin"
            showIcon={openMenu}
            showText={showItems}
          />

          <CustomButton
            icon={<IoThumbsUpSharp size={40} />}
            text="REVIEWS"
            route="/reviews-admin"
            showIcon={openMenu}
            showText={showItems}
          />

          <CustomButton
            icon={<IoPricetag size={40} />}
            text="OFFERS"
            route="/offers-admin"
            showIcon={openMenu}
            showText={showItems}
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
