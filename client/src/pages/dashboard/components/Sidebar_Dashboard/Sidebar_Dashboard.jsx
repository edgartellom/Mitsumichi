import React, { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { IoGrid, IoPersonSharp } from "react-icons/io5";

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
  const [showText, setShowText] = useState(true);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
    if (!openMenu) {
      // Establece un retardo de 500 ms (0.5 segundos) antes de mostrar el texto
      setTimeout(() => {
        setShowText(true);
      }, 200);
    } else {
      setShowText(false); // Oculta el texto inmediatamente al cerrar el menú
    }
  };
  return (
    <div
      className={`bg-[#252525] h-screen p-5 pt-8 ${
        openMenu ? "w-[350px]" : "w-[75px]"
      } duration-300 relative border-r-4 border-[#C63D05]`}
    >
      <button className="bg-[#252525] rounded-md absolute top-4 right-4 cursor-pointer duration-200 hover:bg-[#ffffff27] hover:text-slate-100 ">
        <TiThMenu
          size={40}
          className="bg-transparent text-[#C63D05]"
          onClick={toggleMenu}
        />
      </button>

      {showText && (
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

      <div className={`flex flex-col items-center duration-300 pt-12`}>
        <div className="flex flex-col">
          <button className="flex flex-row items-center bg-[#C63D05] w-[230px] h-[50px]  rounded-md duration-200 hover:bg-[#af4318] hover:text-slate-100 mb-5">
            <IoGrid
              size={50}
              className="bg-transparent text-white cursor-pointer mr-2"
            />
            <h1 className="text-white font-bold text-[24px] ">DASHBOARD</h1>
          </button>

          <button className="flex flex-row items-center bg-[#C63D05] w-[230px] h-[50px] rounded-md duration-200 hover:bg-[#af4318] hover:text-slate-100 mb-5">
            <IoGrid
              size={50}
              className="bg-transparent text-white cursor-pointer mr-2"
            />
            <h1 className="text-white font-bold text-[24px] ">PRODUCTS</h1>
          </button>

          <button className="flex flex-row items-center bg-[#C63D05] w-[230px] h-[50px] rounded-md duration-200 hover:bg-[#af4318] hover:text-slate-100 mb-5">
            <IoGrid
              size={50}
              className="bg-transparent text-white cursor-pointer mr-2"
            />
            <h1 className="text-white font-bold text-[24px] ">ORDERS</h1>
          </button>

          <button className="flex flex-row items-center bg-[#C63D05] w-[230px] h-[50px] rounded-md duration-200 hover:bg-[#af4318] hover:text-slate-100 mb-5">
            <IoPersonSharp
              size={50}
              className="bg-transparent text-white cursor-pointer mr-2"
            />
            <h1 className="text-white font-bold text-[24px] ">USERS</h1>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar_Dashboard;
