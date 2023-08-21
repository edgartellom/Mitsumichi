import React from "react";
import motorcycle from "../../assets/kawasaki.png";
import SideBar from "../../components/SideBar/SideBar";
import Button from "../../components/UI/Button";
import logo from "../../assets/Logo_Mitsumichi.png";

const routes = ["MOTOCICLETAS", "ABOUT US", "SERVICIOS Y SOPORTE"];

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-bl from-gray-300 via-gray-100 to-orange-200 h-screen w-screen flex flex-col">
      <header>
        <nav className=" flex justify-between py-5 font-bold uppercase flex-wrap max-md:flex-row-reverse">
          <div className=" px-20  max-md:px-10 ">
            <img className=" " src={logo} alt="" width={100} />
          </div>
          <SideBar routesArray={routes} />
          <ul className=" flex gap-10 px-10 flex-wrap max-md:hidden ">
            <li>Motocicletas</li>
            <li>About us</li>
            <li>servicio y soporte</li>
          </ul>
        </nav>
      </header>
      <main className=" flex   flex-grow items-center max-lg:flex-col-reverse">
        <section className=" m-20 w-screen max-lg:m-0 max-md:flex-grow max-lg:flex-grow justify-center flex flex-col gap-9 max-lg:text-center">
          <h1 className=" max-sm:max-w-xs text-3xl max-w-sm font-bold max-lg:self-center max-lg:max-w-xl ">
            Recorre las carreteras con las mejores{" "}
            <span className="bg-black text-white px-2 rounded">
              motocicletas
            </span>{" "}
            de la industria
          </h1>
          <p className=" text-1xl max-w-2xl max-sm:max-w-xs max-sm:self-center ">
            Enciende tu espíritu aventurero con nuestras motos que combinan
            rendimiento y <b>diseño excepcionales</b>. Ya sea que busques
            dominar la ciudad o conquistar caminos sinuosos, encontrarás tu
            compañera perfecta en nuestra selección.
          </p>
          <Button
            text="Comprar"
            className=" hover:scale-110 hover:bg-[#161616] duration-300"
          />
        </section>
        <picture className="  overflow-hidden">
          <img
            className=" animate-[wiggle_2s_ease-in-out_infinite] max-lg:w-40 max-sm:hidden"
            src={motorcycle}
            alt="a motorcycle"
          />
        </picture>
      </main>
    </div>
  );
};

export default LandingPage;
