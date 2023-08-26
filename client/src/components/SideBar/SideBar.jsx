import React, { useContext, useState } from "react";
import { userAuth } from "../../context/Auth-context";
import Wrapper from "../../helper/Wrapper";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import logOut from "../../firebase/logOut";
import SignIn from "../../pages/SignIn/SignIn";
import { useNavigate } from "react-router-dom";
import SignUp from "../../pages/SignUp/SignUp";
const SideBar = ({ routesArray }) => {
  const [open, setOpen] = useState(false);
  const { loading, currentUser, isRegistered } = useContext(userAuth);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
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

  const onClickHandler = (route) => {
    if (route === "INICIAR SESION") {
      setShowLogin(true);
      return;
    }
    if (route === "SALIR") {
      logOut();
      navigate("/");
      window.location.reload();
    } else {
      navigate(`/${route}`.toLowerCase());
    }
    setOpen(false);
  };

  return (
    <div className=" py-3   hidden max-md:block z-10">
      <button className="ml-5" onClick={() => setOpen(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      <div
        className={`${
          !open && "hidden"
        } bg-gray-600/50 min-h-screen w-full fixed top-0 left-0 right-0 backdrop-blur-sm`}
        onClick={() => setOpen(false)}
      ></div>

      <div
        className={`${
          open ? "w-80" : "w-0"
        } bg-gray-600 min-h-screen fixed top-0 left-0 transition-all duration-200`}
      >
        <div className={`${!open && "hidden"} pt-3`}>
          <button
            className="ml-4 text-white mb-14"
            onClick={() => setOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {routesArray?.map((route) => (
            <div
              onClick={() => onClickHandler(route)}
              key={route}
              className="text-center text-white text-xl hover:bg-orange-400 cursor-pointer py-3 mb-2"
            >
              {route}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
