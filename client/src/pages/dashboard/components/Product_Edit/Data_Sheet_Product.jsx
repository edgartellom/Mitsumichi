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

const Data_Sheet_Product = ({ formData }) => {
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
            className={`border rounded `}
          />
        </div>
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
            className={`border rounded`}
          />
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
            className={`border rounded px-3 py-2 w-full`}
          />
        </div>
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
            className={`border rounded px-3 py-2 w-full `}
          />
        </div>
      </div>
    </div>
  );
};

export default Data_Sheet_Product;
