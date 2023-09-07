import { useNavigate, useRouteError } from "react-router-dom";
import logo from "../../assets/Logo_Mitsumichi_Cat_White.png";
import Button from "../../components/UI/Button";

const Error404 = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  const currentRoute = error.data?.slice(error.data?.indexOf("L") + 1) || "";

  return (
    <section className=" flex justify-center items-center  bg-gradient-to-bl from-[#2e2e2e] via-[#292929] h-screen  to-[#202020] ">
      <section className="flex flex-col items-center">
        <picture className=" flex flex-wrap justify-center items-center">
          <img src={logo} alt="logo" width={200} />
          <h1 className=" text-9xl font-bold text-orange-700">404</h1>
        </picture>
        <section className=" flex flex-col items-center justify-center gap-5">
          <h1 className=" text-5xl text-gray-300 font-bold max-sm:text-3xl text-center">
            Ups! En {currentRoute} No encontraras una buena motocicleta
          </h1>
          <Button
            text="IR A INICIO"
            className=" bg-orange-700 shadow-none text-gray-300 self-center"
            onClick={() => navigate("/")}
          />
        </section>
      </section>
    </section>
  );
};

export default Error404;
