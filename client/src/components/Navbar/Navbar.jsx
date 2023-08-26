import React from "react";
import login from "./../../assets/login.png";
import logo from "./../../assets/Logo_Mitsumichi.png";
import { SideBar } from "..";

const Navbar = () => {
  return (
    <nav className="bg-[#ECB365] flex justify-between py-1 items-center font-bold uppercase flex-wrap max-md:flex-row-reverse">
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
        <div className="flex gap-2 justify-center items-center m-2 max-md:hidden  max-sm:hidden">
          <img src={login} alt="login" width="15" height="16" />
          <span>Iniciar Sesion</span>
        </div>
      </section>
      <SideBar />
    </nav>
  );
};

export default Navbar;
