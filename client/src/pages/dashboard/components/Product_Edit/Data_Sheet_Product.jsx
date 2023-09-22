import React from "react";
import Select from "react-select";

import { BsXCircle, BsCheckCircle } from "react-icons/bs";

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
          <input
            type="text"
            value={formData?.fichaTecnica?.motor}
            disabled={true}
            className={`border rounded px-3 py-2 w-full`}
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
          <input
            type="text"
            value={formData?.fichaTecnica?.velocidades}
            disabled={true}
            className={`border rounded px-3 py-2 w-full`}
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
            value={formData?.fichaTecnica?.pasajeros}
            disabled={true}
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
            value={formData?.fichaTecnica?.cilindrada}
            disabled={true}
            className={`border rounded px-3 py-2 w-full `}
          />
        </div>
      </div>
    </div>
  );
};

export default Data_Sheet_Product;
