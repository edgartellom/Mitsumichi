import React from "react";
import login from "./../../assets/login.png"
import logo from "./../../assets/Logo_Mitsumichi.png"

const Navbar = () => {
  return (
    <div className="flex flex-row justify-between ml-12">
      <div className="flex items-center text-zinc-900 font-bold">
        <img src={logo} alt="login" width="66" height="66" />
        <ul className=" flex gap-10 px-10 flex-wrap max-md:hidden ">
          <li>Motocicletas</li>
          <li>About us</li>
          <li>servicio y soporte</li>
        </ul>
      </div>
      <div className="mr-12">
        <div className="flex flex-col justify-center items-center m-2">
          <img src={login} alt="login" width="15" height="16" />
          <span>Iniciar Sesion</span>
        </div>
      </div>
    </div>
  )
}

export default Navbar