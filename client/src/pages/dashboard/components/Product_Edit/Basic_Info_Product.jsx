import React, { useState } from "react";
import Select from "react-select";
import { BsXCircle, BsCheckCircle } from "react-icons/bs";

const Basic_Info_Product = ({ formData }) => {
  return (
    <div className="flex flex-col m-auto min-w-[100%] max-w-full min-h-[100%] max-h-[100%] gap-4 py-5 px-10 border-2 rounded-b-lg">
      <div className="input-wrapper flex flex-col">
        <label
          htmlFor="marca"
          className="pl-2 text-lg font-semibold text-[#c63d05] uppercase"
        >
          Marca
        </label>
        <div className="relative">
          <input
            type="text"
            value={formData.marca}
            disabled={true}
            className={`border rounded px-3 py-2 w-full `}
          />
        </div>
      </div>

      <div className="input-wrapper flex flex-col">
        <label
          htmlFor="modelo"
          className="pl-2 text-lg font-semibold text-[#c63d05] uppercase"
        >
          Modelo
        </label>
        <div className="relative">
          <input
            type="text"
            value={formData.modelo}
            disabled={true}
            className={`border rounded px-3 py-2 w-full `}
          />
        </div>
      </div>

      <div className="input-wrapper flex flex-col">
        <label
          htmlFor="tipo"
          className="pl-2 text-lg font-semibold text-[#c63d05] uppercase"
        >
          Tipo
        </label>
        <div className="relative">
          <input
            type="text"
            value={formData.tipo}
            disabled={true}
            className={`border rounded px-3 py-2 w-full `}
          />
          {/* <Select
            options={formData.tipo}
            value={formData.tipo}
            placeholder="Selecciona un Modelo de Moto"
            className={`border rounded w-full`}
          /> */}
        </div>
      </div>

      <div className="input-wrapper flex flex-col">
        <label
          htmlFor="year"
          className="pl-2 text-lg font-semibold text-[#c63d05] uppercase"
        >
          Año
        </label>
        <div className="relative">
          <input
            type="number"
            value={formData.year}
            disabled={true}
            className={`border rounded px-3 py-2 w-full `}
          />
        </div>
      </div>

      <div className="input-wrapper flex flex-col">
        <label
          htmlFor="tipo"
          className="pl-2 text-lg font-semibold text-[#c63d05] uppercase"
        >
          Combustible
        </label>
        <div className="relative">
          <input
            type="text"
            value={formData.combustible}
            disabled={true}
            className={`border rounded px-3 py-2 w-full `}
          />
        </div>
      </div>
    </div>
  );
};

export default Basic_Info_Product;
