import React, { useContext, useEffect, useCallback, useState } from "react";
import login from "./../../assets/login.png";
import logo from "./../../assets/Logo_Mitsumichi.png";
import SideBar from "../SideBar/SideBar";
import SignIn from "../../pages/SignIn/SignIn";
import { userAuth } from "../../context/Auth-context";
import logOut from "../../firebase/logOut";
import { Link, useNavigate } from "react-router-dom";
import SignUp from "../../pages/SignUp/SignUp";
import CartButton from "../../pages/Cart/CartButton/CartButton";
import Cart from "../../pages/Cart/Cart";
import addCarrito from "../../firebase/addCarrito";
import Wrapper from "../../helper/Wrapper";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Profile_Dropdown } from "../../pages/dashboard/components";

const Navbar = () => {
  const { currentUser, role, isRegistered, loading } = useContext(userAuth);

  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const navigate = useNavigate();

  const toggleProfileDropdown = useCallback(() => {
    setProfileDropdownOpen((prevIsOpen) => !prevIsOpen);
  }, []);

  // const logOutHandler = () => {
  //   logOut();
  //   navigate("/");
  // };

  useEffect(() => {
    currentUser && addCarrito(currentUser.uid);
  }, [currentUser]);

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
    return !currentUser && <SignIn setShowLogin={setShowLogin} />;
  }

  if (currentUser && !isRegistered) {
    return <SignUp setShowLogin={setShowLogin} />;
  }

  //console.log(role);

  return (
    <nav className="  flex justify-between py-1 items-center font-bold uppercase flex-wrap max-md:flex-row-reverse">
      <section className="flex items-center text-zinc-900  font-bold">
        <figure
          onClick={() => navigate("/")}
          className=" px-5 cursor-pointer  max-md:px-10 "
        >
          <img src={logo} alt="login" width="66" height="66" />
        </figure>
        <ul className=" flex   flex-wrap max-md:hidden ">
          <Link
            className=" hover:bg-orange-600 p-1 px-4 rounded transition-all duration-300 "
            to="/home"
          >
            Motocicletas
          </Link>
          <Link
            to="/about"
            className=" hover:bg-orange-600 p-1 px-4 rounded transition-all duration-300 "
          >
            About us
          </Link>
          <Link
            to="/service and support"
            className=" hover:bg-orange-600 p-1 px-4 rounded transition-all duration-300 "
          >
            servicio y soporte
          </Link>
        </ul>
      </section>
      <section className="mr-12 flex flex-row-reverse max-lg:flex-col">
        {!currentUser ? (
          <section
            onClick={() => setShowLogin(true)}
            className="flex gap-2 justify-center items-center m-2 max-md:hidden cursor-pointer max-sm:hidden"
          >
            <img src={login} alt="login" width="15" height="16" />
            <span>Iniciar Sesion</span>
          </section>
        ) : (
          <section
            // onClick={logOutHandler}
            className="flex gap-2 justify-center items-center ml-2 -mr-8 max-lg:hidden cursor-pointer max-sm:hidden"
          >
            <div
              onClick={toggleProfileDropdown}
              className="flex border-4  border-[#C63D05] rounded-full w-[50px] h-[50px] shadow-sm duration-300 hover:shadow-sm hover:border-2 shadow-[#202020] hover:text-gray-900 hover:bg-[#ff6600] overflow-hidden"
            >
              <button type="button">
                {currentUser ? <img src={currentUser.photoURL} alt="" /> : null}
              </button>
              {isProfileDropdownOpen && (
                <Profile_Dropdown
                  user={currentUser}
                  role={role}
                  isOpen={isProfileDropdownOpen}
                  onClose={toggleProfileDropdown}
                  topMargin="top-[60px]"
                />
              )}
            </div>
            {/* <img src={login} alt="login" width="15" height="16" />*/}
            {/* <span>Salir</span> */}
          </section>
        )}
        <CartButton setShowCart={setShowCart} />
        {showCart && <Cart setShowCart={setShowCart} />}
      </section>
      <SideBar routesArray={routes} />
    </nav>
  );
};

export default Navbar;
