import React, { useState } from "react";
import Select from "react-select";
import { BsXCircle, BsCheckCircle } from "react-icons/bs";

const optionsTipo = [
  // Opciones de tipo de moto
  { value: "scooter", label: "Scooter" },
  { value: "naked", label: "Naked" },
  { value: "enduro", label: "Enduro" },
  { value: "street", label: "Street" },
  { value: "cub", label: "CUB" },
];

const optionsCombustible = [
  // Opciones de combustible
  { value: "nafta", label: "Nafta" },
  { value: "electrico", label: "Eléctrico" },
];

const Basic_Info = ({
  formData,
  setFormData,
  isBrandValid,
  isModelValid,
  isTipoValid,
  isYearValid,
  isCombustibleValid,
}) => {
  const handleMarcaChange = (event) => {
    const marca = event.target.value;
    console.log(marca);
    setFormData((prevData) => ({
      ...prevData,
      marca: marca,
    }));
  };

  const handleModeloChange = (event) => {
    const modelo = event.target.value;
    console.log(modelo);
    setFormData((prevData) => ({
      ...prevData,
      modelo: modelo,
    }));
  };

  const handleTipoSelection = (selectedOptions) => {
    const tipo = selectedOptions.value;
    console.log(tipo);

    setFormData((prevData) => ({
      ...prevData,
      tipo: tipo,
    }));
  };

  const handleYearChange = (event) => {
    const year = event.target.value;
    console.log(year);
    setFormData((prevData) => ({
      ...prevData,
      year: Number(year),
    }));
  };

  const handleCombustibleSelection = (selectedOptions) => {
    const combustible = selectedOptions.value;
    console.log(combustible);
    setFormData((prevData) => ({
      ...prevData,
      combustible: combustible,
    }));
  };

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
            placeholder="Ingrese la marca"
            value={formData.marca}
            onChange={(e) => handleMarcaChange(e)}
            className={`border rounded px-3 py-2 w-full ${
              isBrandValid === true ? "border-green-500" : ""
            }`}
          />
          {isBrandValid === false && (
            <BsXCircle className="text-red-500 absolute top-1/2 transform -translate-y-1/2 -right-5" />
          )}
          {isBrandValid === true && (
            <BsCheckCircle className="text-green-500 absolute top-1/2 transform -translate-y-1/2 -right-5" />
          )}
        </div>
        {isBrandValid === false && (
          <p className="text-xs italic text-red-500">
            Debe tener entre 3 y 15 caracteres (sin contar espacios)
          </p>
        )}
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
            placeholder="Ingrese el modelo"
            value={formData.modelo}
            onChange={(e) => handleModeloChange(e)}
            className={`border rounded px-3 py-2 w-full ${
              isModelValid === true ? "border-green-500" : ""
            }`}
          />
          {isModelValid === false && (
            <BsXCircle className="text-red-500 absolute top-1/2 transform -translate-y-1/2 -right-5" />
          )}
          {isModelValid === true && (
            <BsCheckCircle className="text-green-500 absolute top-1/2 transform -translate-y-1/2 -right-5" />
          )}
        </div>
        {isModelValid === false && (
          <p className="text-xs italic text-red-500">
            Debe tener entre 5 y 50 caracteres y solo se permiten letras,
            números, "-", y "/".
          </p>
        )}
      </div>

      <div className="input-wrapper flex flex-col">
        <label
          htmlFor="tipo"
          className="pl-2 text-lg font-semibold text-[#c63d05] uppercase"
        >
          Tipo
        </label>
        <div className="relative">
          <Select
            options={optionsTipo}
            value={optionsTipo.find((option) => option.value === formData.tipo)}
            placeholder="Selecciona un Modelo de Moto"
            className={`border rounded w-full ${
              isTipoValid === true ? "border-green-500" : ""
            }`}
            onChange={handleTipoSelection}
          />
          {isTipoValid === false && (
            <BsXCircle className="text-red-500 absolute top-1/2 transform -translate-y-1/2 -right-5" />
          )}
          {isTipoValid === true && (
            <BsCheckCircle className="text-green-500 absolute top-1/2 transform -translate-y-1/2 -right-5" />
          )}
        </div>
        {isTipoValid === false && (
          <p className="text-xs italic text-red-500">
            Selecciona una opción válida
          </p>
        )}
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
            placeholder="Ingrese un año"
            onChange={(e) => handleYearChange(e)}
            className={`border rounded px-3 py-2 w-full ${
              isYearValid === true ? "border-green-500" : ""
            }`}
          />
          {isYearValid === false && (
            <BsXCircle className="text-red-500 absolute top-1/2 transform -translate-y-1/2 -right-5" />
          )}
          {isYearValid === true && (
            <BsCheckCircle className="text-green-500 absolute top-1/2 transform -translate-y-1/2 -right-5" />
          )}
        </div>
        {isYearValid === false && (
          <p className="text-xs italic text-red-500">
            El año debe estar entre 2010 y el año actual
          </p>
        )}
      </div>

      <div className="input-wrapper flex flex-col">
        <label
          htmlFor="tipo"
          className="pl-2 text-lg font-semibold text-[#c63d05] uppercase"
        >
          Combustible
        </label>
        <div className="relative">
          <Select
            options={optionsCombustible}
            value={optionsCombustible.find(
              (option) => option.value === formData.combustible
            )}
            placeholder="Selecciona el tipo de combustible"
            className={`border rounded ${
              isCombustibleValid === true ? "border-green-500" : ""
            }`}
            onChange={handleCombustibleSelection}
          />

          {isCombustibleValid === false && (
            <BsXCircle className="text-red-500 absolute top-1/2 transform -translate-y-1/2 -right-5" />
          )}
          {isCombustibleValid === true && (
            <BsCheckCircle className="text-green-500 absolute top-1/2 transform -translate-y-1/2 -right-5" />
          )}
        </div>
        {isCombustibleValid === false && (
          <p className="text-xs italic text-red-500">
            Selecciona una opción válida
          </p>
        )}
      </div>
    </div>
  );
};

export default Basic_Info;

//   const useLayoutEffect = () => {
//     const { marca, modelo, tipo, year, combustible } = formData;

//     // Validación de propiedad marca
//     const brandRegex = /^[A-Za-z\s]*[A-Za-z][A-Za-z\s]*(?!\s*$)/;
//     const validBrand =
//       brandRegex.test(marca) &&
//       marca.trim().length >= 3 &&
//       marca.trim().length <= 15;
//     setIsBrandValid(validBrand);

//     console.log("Marca", validBrand, marca);

//     // Validación de propiedad modelo
//     const modeloRegex = /^[A-Za-z0-9]+(\s[A-Za-z0-9]+)*$/;
//     const validCarModel =
//       modeloRegex.test(modelo) &&
//       modelo.trim().length >= 5 &&
//       modelo.trim().length <= 25;
//     setIsModelValid(validCarModel);

//     // Validación de propiedad tipo
//     const validTipo = ["scooter", "naked", "enduro", "street", "cub"].includes(
//       tipo
//     );
//     setIsTipoValid(validTipo);
//     console.log("Tipo", validTipo);

//     // Validación del rango de los años
//     const currentYear = new Date().getFullYear();
//     const minYear = 2010;
//     const validYear = year >= minYear && year <= currentYear;
//     setIsYearValid(validYear);

//     // Validación de propiedad combustible
//     const validCombustible = ["nafta", "gasolina", "electrico"].includes(
//       combustible
//     );
//     setIsCombustibleValid(validCombustible);
//     console.log("Combustible", validCombustible, combustible);

//     const isFormDataValid =
//       isBrandValid &&
//       isModelValid &&
//       isTipoValid &&
//       isYearValid &&
//       isCombustibleValid;
//   };
