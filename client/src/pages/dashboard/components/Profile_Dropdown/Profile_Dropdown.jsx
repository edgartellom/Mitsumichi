import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  IoCheckmarkCircleSharp,
  IoPersonSharp,
  IoGrid,
  IoEllipseSharp,
  IoHome,
} from "react-icons/io5";

import logOut from "../../../../firebase/logOut";
import { userAuth } from "../../../../context/Auth-context";

const Profile_Dropdown = ({ onClose, isOpen, topMargin }) => {
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();
  const { user, photoURL } = useContext(userAuth);

  const logOutHandler = () => {
    logOut();
    navigate("/");
  };

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

  return (
    <div className="flex absolute right-5 mt-1 z-50">
      <div
        className={`absolute right-0 ${topMargin} mt-3 flex w-[275px] flex-col gap-3 rounded-xl bg-[#252525fa] p-4 text-slate-100 shadow-lg`}
      >
        <div className="flex gap-3 items-center">
          <div
            className={`flex flex-col items-center justify-center rounded-lg h-16 w-24 border-2 ${
              user?.role === "admin" ? "border-[#C63D05]" : "border-slate-500"
            } overflow-hidden`}
          >
            <img src={photoURL} alt="" />
          </div>
          <div>
            <div className="flex gap-1 text-sm font-semibold">
              <span className="capitalize">{user?.data?.username}</span>
              <span
                className={`${
                  user?.role === "admin" ? "text-[#C64805]" : "text-blue-500"
                }`}
              >
                <IoCheckmarkCircleSharp size={20} />
              </span>
            </div>

            <div className="text-xs text-slate-400 lowercase">
              {user?.email}
            </div>
          </div>
        </div>

        <div
          className={`text-lg font-bold text-center ${
            user?.role === "admin" ? "text-[#c63c05]" : "text-slate-400"
          }`}
        >
          <span
            className={`capitalize ${
              user?.role === "admin" ? "text-[#c63c05]" : "text-slate-400"
            }`}
          >
            {userRole}
          </span>
        </div>

        <div className="border-t border-slate-500/30"></div>

        <div className="flex justify-around">
          <div className="flex flex-col items-center justify-center">
            <span className="text-3xl font-semibold">
              {user?.role === "admin" ? 15 : 2}
            </span>
            <span className="text-sm text-slate-400">Reviews</span>
          </div>

          <div className="flex flex-col items-center justify-center">
            <span className="text-3xl font-semibold">
              {user?.role === "admin" ? 23 : 8}
            </span>
            <span className="text-sm text-slate-400">Orders</span>
          </div>
        </div>

        <div className="border-t border-slate-500/30"></div>

        <div className="flex flex-col">
          <Link
            to="/profile"
            className="flex items-center gap-3 rounded-md py-2 px-3 hover:bg-[#c63c0554]"
          >
            <IoPersonSharp size={20} />
            <span>Profile</span>
          </Link>

          {user?.role === "admin" ? (
            location.pathname.includes("/dashboard") ? (
              <a
                href="/home"
                className="flex items-center gap-3 rounded-md py-2 px-3 hover:bg-[#c63c0554]"
              >
                <IoHome size={20} />
                <span>Home</span>
              </a>
            ) : (
              <a
                href="/dashboard"
                className="flex items-center gap-3 rounded-md py-2 px-3 hover:bg-[#c63c0554]"
              >
                <IoGrid size={20} />
                <span>Dashboard</span>
              </a>
            )
          ) : null}

          <a
            href="/service and support"
            className="flex items-center gap-3 rounded-md py-2 px-3 hover:bg-[#c63c0554]"
          >
            <IoEllipseSharp size={20} />
            <span>Help Center</span>
          </a>
        </div>

        <button
          onClick={logOutHandler}
          className="flex justify-center gap-3 rounded-md bg-red-600 py-2 px-3 font-semibold hover:bg-red-500 focus:ring-2 focus:ring-red-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"></path>
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Profile_Dropdown;
