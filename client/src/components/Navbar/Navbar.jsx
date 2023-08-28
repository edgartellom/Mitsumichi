import React, { useContext, useState } from "react";
import login from "./../../assets/login.png";
import logo from "./../../assets/Logo_Mitsumichi.png";
import SideBar from "../SideBar/SideBar";
import SignIn from "../../pages/SignIn/SignIn";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Wrapper from "../../helper/Wrapper";
import { userAuth } from "../../context/Auth-context";
import logOut from "../../firebase/logOut";
import { useNavigate } from "react-router-dom";
import SignUp from "../../pages/SignUp/SignUp";

const Navbar = () => {
  const { loading, currentUser, isRegistered } = useContext(userAuth);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
  const logOutHandler = () => {
    logOut();
    navigate("/");
    window.location.reload();
  };

  const routes = [
    `${!currentUser ? "INICIAR SESION" : "SALIR"}`,
    "MOTOCICLETAS",
    "ABOUT US",
    "SERVICIOS Y SOPORTE",
  ];

  if (loading) {
    return (
      <Wrapper>
        <LoadingSpinner />
      </Wrapper>
    );
  }

  if (showLogin) {
    return !currentUser ? <SignIn /> : !isRegistered && <SignUp />;
  }

  return (
    <nav className="   flex justify-between py-1 items-center font-bold uppercase flex-wrap max-md:flex-row-reverse">
      <section className="flex items-center text-zinc-900  font-bold">
        <div className=" px-5  max-md:px-10 ">
          <img src={logo} alt="login" width="66" height="66" />
        </div>
        <ul className=" flex gap-5 px-10 flex-wrap max-md:hidden ">
          <li>Motocicletas</li>
          <li>About us</li>
          <li>servicio y soporte</li>
        </ul>
      </section>
      <section className="mr-12">
        {!currentUser ? (
          <div
            onClick={() => setShowLogin(true)}
            className="flex gap-2 justify-center items-center m-2 max-md:hidden cursor-pointer max-sm:hidden"
          >
            <img src={login} alt="login" width="15" height="16" />
            <span>Iniciar Sesion</span>
          </div>
        ) : (
          <div
            onClick={logOutHandler}
            className="flex gap-2 justify-center items-center m-2 max-md:hidden cursor-pointer max-sm:hidden"
          >
            <img src={login} alt="login" width="15" height="16" />
            <span>Salir</span>
          </div>
        )}
      </section>
      <SideBar routesArray={routes} />
    </nav>
  );
};

export default Navbar;
