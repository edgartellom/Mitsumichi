import { useContext } from "react";
import Button from "../../components/UI/Button";
import { userAuth } from "../../context/Auth-context";
import { useForm } from "react-hook-form";
import existsUsername from "../../functions/existsUsername";
import updateUser from "../../functions/updateUser";
import registerNewUser from "../../functions/registerNewUser";
import Wrapper from "../../helper/Wrapper";
import { useNavigate } from "react-router-dom";
import logOut from "../../functions/logOut";

const SignUp = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(userAuth);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleFinish = async (data) => {
    if (data) {
      const exists = await existsUsername(data.username);
      if (exists) {
        console.log("Ya existe");
      } else {
        const tmp = { ...currentUser };
        tmp.processCompleted = true;
        await updateUser(tmp);
        await registerNewUser({
          data,
          id: currentUser.uid,
          email: currentUser.email,
        });
      }
    }
    reset();
    navigate("/home");
  };

  const signInHandler = () => {
    logOut();
    navigate("/home");
    window.location.reload();
  };

  return (
    <Wrapper>
      <form className=" bg-white flex flex-col justify-center  items-center pb-7 pt-2 w-[700px]   gap-6 rounded-lg max-sm:w-screen ">
        <h1 className=" text-center text-3xl font-bold">
          Hola {currentUser?.displayName}!, continuemos con tu registro
        </h1>

        <section className=" flex flex-col gap-5 max-h-[400px] w-[600px] items-center  overflow-auto">
          <div className="flex flex-col  flex-wrap ">
            <h2 className=" text-xl font-semibold">Nombre*</h2>
            <section className="flex flex-col mb-3">
              <input
                id="name"
                {...register("name", {
                  required: {
                    value: true,
                    message: "El campo es obligatorio",
                  },
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Ingresa un nombre valido",
                  },
                })}
                type="text"
                className="p-1.5 w-72  rounded border-solid border-2 border-zinc-600 max-sm:w-screen"
                placeholder="nombre"
              />
              <p className=" text-red-500 font-medium">
                {errors.name?.message}
              </p>
            </section>
            <section className="flex flex-col">
              <input
                id="apellido"
                {...register("apellido", {
                  required: {
                    value: true,
                    message: "El campo es obligatorio",
                  },
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Ingresa un apellido valido",
                  },
                })}
                type="text"
                className="p-1.5 w-72 rounded border-solid border-2 border-zinc-600  max-sm:w-screen"
                placeholder="apellido"
              />
              <p className=" text-red-500 font-medium">
                {errors.apellido?.message}
              </p>
            </section>
          </div>
          <section>
            <h2 className=" text-xl font-semibold">Username*</h2>
            <input
              id="username"
              {...register("username", {
                required: {
                  value: true,
                  message: "El campo es obligatorio",
                },
              })}
              type="username"
              className="p-1.5 w-72 rounded border-solid border-2 border-zinc-600  max-sm:w-screen"
              placeholder="username"
            />
            <p className=" text-red-500 font-medium">
              {errors.username?.message}
            </p>
          </section>
          <section>
            <h2 className=" text-xl font-semibold">Edad*</h2>
            <input
              id="edad"
              {...register("edad", {
                required: {
                  value: true,
                  message: "El campo es obligatorio",
                },
                pattern: {
                  value: /^(?:[1-9][0-9]?|1[01][0-9]|120)$/,
                  message: "Ingresa una edad valida",
                },
              })}
              type="number"
              min={1}
              className="p-1.5 w-72 rounded border-solid border-2 border-zinc-600  max-sm:w-screen"
              placeholder="edad"
            />
            <p className=" text-red-500 font-medium">{errors.edad?.message}</p>
          </section>
          <section>
            <h2 className=" text-xl font-semibold">Telefono*</h2>
            <input
              id="telefono"
              {...register("telefono", {
                required: {
                  value: true,
                  message: "El campo es obligatorio",
                },
                pattern: {
                  value: /^\+\d{1,3}\s?\d{4,}$/,
                  message: "Numero de telfono invalido",
                },
              })}
              type="text"
              className="p-1.5 w-72 rounded border-solid border-2 border-zinc-600  max-sm:w-screen"
              placeholder="+573245271273"
            />
            <p className=" text-red-500 font-medium">
              {errors.telefono?.message}
            </p>
          </section>
          <section>
            <h2 className=" text-xl font-semibold">Documento*</h2>
            <input
              id="documento"
              {...register("documento", {
                required: {
                  value: true,
                  message: "El campo es obligatorio",
                },
                pattern: {
                  value: /^[A-Za-z0-9\-]+$/i,
                  message: "Documento invalido",
                },
              })}
              type="text"
              className="p-1.5 w-72 rounded border-solid border-2 border-zinc-600  max-sm:w-screen"
              placeholder="numero de documento"
            />
            <p className=" text-red-500 font-medium">
              {errors.documento?.message}
            </p>
          </section>
          <section>
            <h2 className=" text-xl font-semibold">Direccion*</h2>
            <input
              id="direccion"
              {...register("direccion", {
                required: {
                  value: true,
                  message: "El campo es obligatorio",
                },
                pattern: {
                  value: /^[A-Za-z0-9\s\-\,\#\.]+$/,
                  message: "Direccion invalida",
                },
              })}
              type="text"
              className="p-1.5 w-72 rounded border-solid border-2 border-zinc-600  max-sm:w-screen"
              placeholder="direccion"
            />
            <p className=" text-red-500 font-medium">
              {errors.direccion?.message}
            </p>
          </section>
        </section>
        <Button text="Finalizar" onClick={handleSubmit(handleFinish)} />
        <h4 className=" font-semibold text-gray-500">
          Ya tienes cuenta?{" "}
          <span
            onClick={signInHandler}
            className=" text-black font-bold cursor-pointer"
          >
            Sign In
          </span>
        </h4>
      </form>
    </Wrapper>
  );
};

export default SignUp;
