import Wrapper from "../../helper/Wrapper";
import Button from "../../components/UI/Button";
import Logo from "../../assets/Logo_Mitsumichi_Cat.png";
import google from "../../assets/search.png";
import loginWithGoogle from "../../firebase/loginWithGoogle";
import { useContext, useState } from "react";
import registerUser from "../../firebase/registerUser";
import loginWithEmailAndPassword from "../../firebase/loginWithEmailPassword";
import { useForm } from "react-hook-form";
import { userAuth } from "../../context/Auth-context";

const Login = ({ setShowLogin }) => {
  const { setLoading } = useContext(userAuth);
  const [isLoggingIn, setIsloggingIn] = useState(false);
  const [loginErro, setLoginError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const googleHandler = async (e) => {
    await loginWithGoogle();
    setLoading(false);
  };

  const sumbitHandler = async ({ email, password }) => {
    if (isLoggingIn) {
      await registerUser(email, password);
    } else {
      const response = await loginWithEmailAndPassword(email, password);
      window.location.reload();
      setLoading(true);
      if (!response) {
        setLoginError("Parece que aun no estas registrado");
        return;
      }
      setLoading(true);
    }
  };

  return (
    <Wrapper>
      <form
        onSubmit={handleSubmit(sumbitHandler)}
        className="  animate-slide-down bg-white flex flex-col justify-center items-center pb-7 pt-2 w-[500px]   gap-6 rounded-lg max-sm:h-screen "
      >
        <button
          type="button"
          onClick={() => setShowLogin(false)}
          className=" self-end mr-5 font-bold text-xl "
        >
          X
        </button>
        <img src={Logo} width={220} alt="" />
        <section className="flex flex-col">
          <label htmlFor="">Email:</label>
          <input
            id="email"
            {...register("email", {
              required: {
                value: true,
                message: "El campo es obligatorio",
              },
              pattern: {
                value: /^[\w\.-]+@[\w\.-]+\.\w+$/,
                message: "Ingresa un email valido",
              },
            })}
            type="text"
            className={`p-1.5 w-72  rounded border-solid border-2 ${
              errors.email ? `bg-red-200` : ""
            } border-zinc-600`}
            placeholder="Enter your email"
          />
          <p className=" text-red-500 font-medium">{errors.email?.message}</p>
        </section>
        <section className="flex flex-col">
          <label htmlFor="">Password:</label>
          <input
            id="password"
            {...register("password", {
              required: {
                value: true,
                message: "El campo es obligatorio",
              },
              minLength: {
                value: 8,
                message: "Ingresa al menos 8 caracteres",
              },
            })}
            type="password"
            className={`p-1.5 w-72  rounded border-solid border-2 ${
              errors.password ? `bg-red-200` : ""
            } border-zinc-600`}
            placeholder="********"
          />
          <p className=" text-red-500 font-medium">
            {errors.password?.message}
          </p>
        </section>
        <section className="flex flex-col gap-3">
          <Button
            type="submit"
            text={!isLoggingIn ? "Ingresar" : "Registrarse"}
            className=" rounded-full text-white py-1 font-normal shadow-sm mx-0 "
          />
          <Button
            text="Continuar con google"
            image={google}
            onClick={googleHandler}
            className=" mx-auto rounded-full bg-white text-[#000]  py-1 font-normal shadow "
          />
        </section>
        <p className=" text-red-500 font-medium">{loginErro}</p>
        {!isLoggingIn ? (
          <h4 className=" font-semibold text-gray-500">
            No tienes una cuenta?{" "}
            <span
              onClick={() => setIsloggingIn(!isLoggingIn)}
              className=" text-black font-bold cursor-pointer"
            >
              Sign Up
            </span>
          </h4>
        ) : (
          <h4 className=" font-semibold text-gray-500">
            Ya tienes cuenta?{" "}
            <span
              onClick={() => setIsloggingIn(!isLoggingIn)}
              className=" text-black font-bold cursor-pointer"
            >
              Sign In
            </span>
          </h4>
        )}
      </form>
    </Wrapper>
  );
};

export default Login;
