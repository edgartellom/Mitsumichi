import React from "react";
import Select from "react-select";

import { BsXCircle, BsCheckCircle } from "react-icons/bs";

const optionsMotor = [
  { value: "2 tiempos", label: "2 Tiempos" },
  { value: "4 tiempos", label: "4 Tiempos" },
];

const optionsVelocidades = [
  // Opciones de velocidades
  { value: "N/A", label: "N/A" },
  { value: "4", label: "4 Velocidades" },
  { value: "5", label: "5 Velocidades" },
  { value: "6", label: "6 Velocidades" },
];

const Data_Sheet = ({
  formData,
  setFormData,
  isMotorValid,
  isCilindradaValid,
  isPasajerosValid,
  isVelocidadesValid,
}) => {
  const handleMotorSelection = (selectedOptions) => {
    const motor = selectedOptions.value;
    console.log(motor);

    setFormData((prevData) => ({
      ...prevData,
      fichaTecnica: {
        ...prevData.fichaTecnica,
        motor: motor,
      },
    }));
  };

  const handleVelocidadesSelection = (selectedOptions) => {
    const velocidades = selectedOptions.value;
    console.log(velocidades);

    setFormData((prevData) => ({
      ...prevData,
      fichaTecnica: {
        ...prevData.fichaTecnica,
        velocidades: velocidades,
      },
    }));
  };

  const handleCilindradaChange = (event) => {
    const cilidranda = event.currentTarget.value;
    console.log(cilidranda);

    setFormData((prevData) => ({
      ...prevData,
      fichaTecnica: {
        ...prevData.fichaTecnica,
        cilindrada: cilidranda,
      },
    }));
  };

  const handlePasajerosChange = (event) => {
    const pasajeros = event.currentTarget.value;
    console.log(pasajeros);

    setFormData((prevData) => ({
      ...prevData,
      fichaTecnica: {
        ...prevData.fichaTecnica,
        pasajeros: pasajeros,
      },
    }));
  };

  return (
    <div className="flex flex-col m-auto min-w-[100%] max-w-full min-h-[100%] max-h-[100%] gap-4 py-5 px-10  border-2 rounded-b-lg">
      <div className="input-wrapper flex flex-col">
        <label
          htmlFor="motor"
          className="pl-2 text-lg font-semibold text-[#c63d05] uppercase"
        >
          Motor
        </label>
        <div className="relative">
          <Select
            options={optionsMotor}
            value={optionsMotor.find(
              (option) => option.value === formData.fichaTecnica.motor
            )}
            placeholder="Selecciona el motor"
            className={`border rounded ${
              isMotorValid === true ? "border-green-500" : ""
            }`}
            onChange={handleMotorSelection}
          />

          {isMotorValid === false && (
            <BsXCircle className="text-red-500 absolute top-1/2 transform -translate-y-1/2 -right-5" />
          )}
          {isMotorValid === true && (
            <BsCheckCircle className="text-green-500 absolute top-1/2 transform -translate-y-1/2 -right-5" />
          )}
        </div>
        {isMotorValid === false && (
          <p className="text-xs italic text-red-500">
            Selecciona una opción válida
          </p>
        )}
      </div>

      <div className="input-wrapper flex flex-col">
        <label
          htmlFor="velocidades"
          className="pl-2 text-lg font-semibold text-[#c63d05] uppercase"
        >
          Velocidades de la Moto
        </label>
        <div className="relative">
          <Select
            options={optionsVelocidades}
            value={optionsVelocidades.find(
              (option) => option.value === formData.fichaTecnica.velocidades
            )}
            placeholder="Selecciona las velocides"
            onChange={handleVelocidadesSelection}
            className={`border rounded ${
              isVelocidadesValid === true ? "border-green-500" : ""
            }`}
          />
          {isVelocidadesValid === false && (
            <BsXCircle className="text-red-500 absolute top-1/2 transform -translate-y-1/2 -right-5" />
          )}
          {isVelocidadesValid === true && (
            <BsCheckCircle className="text-green-500 absolute top-1/2 transform -translate-y-1/2 -right-5" />
          )}
        </div>
      </div>

      <div className="input-wrapper flex flex-col">
        <label
          htmlFor="pasajeros"
          className="pl-2 text-lg font-semibold text-[#c63d05] uppercase"
        >
          Pasajeros
        </label>
        <div className="relative">
          <input
            type="number"
            value={formData.fichaTecnica.pasajeros}
            placeholder="Ingrese el número de pasajeros"
            onChange={(e) => handlePasajerosChange(e)}
            className={`border rounded px-3 py-2 w-full ${
              isPasajerosValid === true ? "border-green-500" : ""
            }`}
          />
          {isPasajerosValid === false && (
            <BsXCircle className="text-red-500 absolute top-1/2 transform -translate-y-1/2 -right-5" />
          )}
          {isPasajerosValid === true && (
            <BsCheckCircle className="text-green-500 absolute top-1/2 transform -translate-y-1/2 -right-5" />
          )}
        </div>
        {isPasajerosValid === false && (
          <p className="text-xs italic text-red-500">
            El número de pasajeros debe ser un número válido
          </p>
        )}
      </div>

      <div className="input-wrapper flex flex-col">
        <label
          htmlFor="cilindrada"
          className="pl-2 text-lg font-semibold text-[#c63d05] uppercase"
        >
          Cilindrada
        </label>
        <div className="relative">
          <input
            type="number"
            value={formData.fichaTecnica.cilindrada}
            placeholder="Ingrese el valor la cilindrada"
            onChange={(e) => handleCilindradaChange(e)}
            className={`border rounded px-3 py-2 w-full ${
              isCilindradaValid === true ? "border-green-500" : ""
            }`}
          />
          {isCilindradaValid === false && (
            <BsXCircle className="text-red-500 absolute top-1/2 transform -translate-y-1/2 -right-5" />
          )}
          {isCilindradaValid === true && (
            <BsCheckCircle className="text-green-500 absolute top-1/2 transform -translate-y-1/2 -right-5" />
          )}
        </div>
        {isCilindradaValid === false && (
          <p className="text-xs italic text-red-500">
            El número de cilindrada debe ser un número válido
          </p>
        )}
      </div>
    </div>
  );
};

export default Data_Sheet;
