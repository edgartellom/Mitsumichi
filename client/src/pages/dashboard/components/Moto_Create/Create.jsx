import React, { useState, useLayoutEffect } from "react";
import { BsXCircle, BsCheckCircle } from "react-icons/bs";

import Select from "react-select";
import Swal from "sweetalert2";
import axios from "axios";

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
  { value: "gasolina", label: "Gasolina" },
  { value: "electrico", label: "Eléctrico" },
];

const optionsMotor = [
  { value: "2 tiempos", label: "2 Tiempos" },
  { value: "4 tiempos", label: "4 Tiempos" },
];

const optionsColor = [
  { value: "yellow", label: "Amarillo" },
  { value: "white", label: "Blanco" },
  { value: "black", label: "Negro" },
  { value: "gray", label: "Gris" },
  { value: "red", label: "Rojo" },
  { value: "pink", label: "Rosa" },
  { value: "blue", label: "Azul" },
  { value: "green", label: "Verde" },
  { value: "orange", label: "Naranja" },
  { value: "brown", label: "Marrón" },
  { value: "silver", label: "Plata" },
  { value: "gold", label: "Oro" },
  { value: "purple", label: "Morado" },
  { value: "beige", label: "Beige" },
];

const Create = () => {
  const [selectedColors, setSelectedColors] = useState([]);
  console.log("Colores:", selectedColors);
  const [formData, setFormData] = useState({
    marca: "",
    modelo: "",
    tipo: "",
    year: 0,
    precio: 0,
    imageUrl: [],
    combustible: "",
    colorDisponible: [],
    fichaTecnica: {
      motor: "",
      pasajeros: "",
      cilindrada: "",
      velocidades: "",
    },
  });

  const [isButtonActive, setIsButtonActive] = useState(false); // Variable para activar el boton de añadir si el formulario es valido

  // Variables de validación
  const [isBrandValid, setIsBrandValid] = useState(true);
  const [isModelValid, setIsModelValid] = useState(true);
  const [isYearValid, setIsYearValid] = useState(true);
  const [isTipoValid, setIsTipoValid] = useState(true);
  const [isPrecioValid, setIsPrecioValid] = useState(true);
  const [isColorValid, setIsColorValid] = useState(true);
  const [isCombustibleValid, setIsCombustibleValid] = useState(true);
  const [isImageUrlValid, setIsImageUrlValid] = useState(true);

  //Ficha Tecnica
  const [isMotorValid, setIsMotorValid] = useState(true);
  const [isPasajerosValid, setIsPasajerosValid] = useState(true);
  const [isCilindradaValid, setIsCilindradaValid] = useState(true);
  const [isVelocidadesValid, setIsVelocidadesValid] = useState(true);

  useLayoutEffect(() => {
    const {
      marca,
      modelo,
      tipo,
      year,
      precio,
      imageUrl,
      combustible,
      colorDisponible,
      fichaTecnica,
    } = formData;

    // Validación de propiedad marca
    const brandRegex = /^[A-Za-z\s]*[A-Za-z][A-Za-z\s]*(?!\s*$)/;
    const validBrand =
      brandRegex.test(marca) &&
      marca.trim().length >= 3 &&
      marca.trim().length <= 15;
    setIsBrandValid(validBrand);

    console.log("Marca", validBrand, marca);

    // Validación de propiedad modelo
    const modeloRegex = /^[A-Za-z0-9]+(\s[A-Za-z0-9]+)*$/;
    const validCarModel =
      modeloRegex.test(modelo) &&
      modelo.trim().length >= 5 &&
      modelo.trim().length <= 25;
    setIsModelValid(validCarModel);

    // Validación de propiedad tipo
    const validTipo = ["scooter", "naked", "enduro", "street", "cub"].includes(
      tipo
    );
    setIsTipoValid(validTipo);
    console.log("Tipo", validTipo);

    // Validación del rango de los años
    const currentYear = new Date().getFullYear();
    const minYear = 2010;
    const validYear = year >= minYear && year <= currentYear;
    setIsYearValid(validYear);

    // Validación de propiedad precio
    const precioRegex = /^\d[0-9]+$/;
    const validPrecio = precioRegex.test(precio) && parseInt(precio) >= 500;
    setIsPrecioValid(validPrecio);
    console.log("Precio:", validPrecio, precio);

    // Validación de propiedad combustible
    const validCombustible = ["nafta", "gasolina", "electrico"].includes(
      combustible
    );
    setIsCombustibleValid(validCombustible);
    console.log("Combustible", validCombustible, combustible);

    // Validación de propiedad color
    const validColorDisponible = colorDisponible.length > 0;
    setIsColorValid(validColorDisponible);
    console.log("Colors:", validColorDisponible, colorDisponible);
    /*--------------------------------------------------------------------------------------------*/
    // Validación de propiedad fichaTecnica:

    // Motor
    const validMotor = ["2 tiempos", "4 tiempos"].includes(fichaTecnica.motor);
    setIsMotorValid(validMotor);
    console.log("Motor: ", validMotor, fichaTecnica.motor);
    // Pasajeros
    const validPasajeros = fichaTecnica.pasajeros.length !== "";
    setIsPasajerosValid(validPasajeros);
    console.log("Pasajeros: ", validPasajeros, fichaTecnica.pasajeros);

    // Validación de propiedad imageUrl
    const imageUrlRegex =
      /(http|https|ftp|ftps):\/\/[a-zA-Z0-9-.]+\.[a-zA-Z]{2,3}(\/\S+)?\.(png|jpg|jpeg|gif)$/;
    const validImageUrl =
      (typeof imageUrl === "string" && imageUrl !== "") ||
      (Array.isArray(imageUrl) &&
        imageUrl.length > 0 &&
        imageUrl.every((url) => imageUrlRegex.test(url)));
    setIsImageUrlValid(validImageUrl);

    // Validaciónes de formulario completo
    const isFormDataValid =
      isBrandValid &&
      isModelValid &&
      isTipoValid &&
      isCombustibleValid &&
      isImageUrlValid &&
      isPrecioValid &&
      isYearValid &&
      isColorValid &&
      isMotorValid &&
      isPasajerosValid &&
      fichaTecnica.cilindrada !== "" &&
      fichaTecnica.velocidades !== "";

    setIsButtonActive(isFormDataValid);
  }, [
    formData,
    isBrandValid,
    isModelValid,
    isCombustibleValid,
    isImageUrlValid,
    isPrecioValid,
    isTipoValid,
    isYearValid,
    isColorValid,
    isMotorValid,
    isPasajerosValid,
  ]);

  const sortedColorOptions = optionsColor
    .slice()
    .sort((a, b) => a.label.localeCompare(b.label));

  const customStyles = {
    multiValue: (provided, state) => ({
      ...provided,
      backgroundColor: state.data.value, // Usa el valor como color de fondo
      border: "1px ridge gray", // Borde redondeado
    }),
    multiValueLabel: (provided, state) => ({
      ...provided,
      color: state.data.value === "black" ? "white" : "black", // Cambia el color del texto para que sea visible
      fontWeight: "bold",
    }),
    multiValueRemove: (provided, state) => ({
      ...provided,
      color: state.data.value === "black" ? "white" : "black", // Cambia el color del icono para que sea visible

      ":hover": {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        color: state.data.value === "white" ? "black" : "white",
      },
    }),
  };

  const handleTipoSelection = (selectedOptions) => {
    const tipo = selectedOptions.value;
    console.log(tipo);
    setFormData({
      ...formData,
      tipo: tipo,
    });
  };

  const handleCombustibleSelection = (selectedOptions) => {
    const combustible = selectedOptions.value;
    console.log(combustible);
    setFormData({
      ...formData,
      combustible: combustible,
    });
  };

  const handleColorSelection = (selectedOptions) => {
    const selectedColors = selectedOptions.map((option) => option.value);
    // console.log(selectedColors);

    setSelectedColors(selectedColors);

    setFormData((prevData) => ({
      ...prevData,
      colorDisponible: selectedColors,
    }));
  };

  const handleMotorSelection = (selectedOptions) => {
    const motor = selectedOptions.value;

    console.log(motor);
    setFormData({
      ...formData,
      fichaTecnica: {
        ...formData.fichaTecnica,
        motor: motor,
      },
    });
  };

  const handleSubmiMoto = async (e) => {
    e.preventDefault();
    console.log(e.target);

    const jsonData = JSON.stringify(formData);
    console.log(jsonData);

    Swal.fire({
      title: "¿Deseas añadir esta nueva moto?",
      text: "Al confirmar, se añadirá la nueva moto.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "AÑADIR",
      cancelButtonText: "CANCELAR",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(
            "http://localhost:3001/motos",
            jsonData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          Swal.fire({
            title: "Creación exitosa",
            text: "La moto se ha creado correctamente.",
            icon: "success",
          });

          console.log("Nueva moto:", response.data);

          // "https://pf-elixir-cars-back-production.up.railway.app/cars"
          // Limpio los campos después de confirmar

          setFormData({
            marca: "",
            modelo: "",
            presentacion: "",
            precio: 0,
            estado: "",
            year: 0,
            imageUrl: [""],
            kilometraje: "",
            combustible: "",
            fichaTecnica: {
              Motor: "",
              Pasajeros: "",
              Carroceria: "",
              Transmision: "",
              Traccion: "",
              Llantas: "",
              Potencia: "",
              Puertas: "",
              Baul: "",
              airbag: "",
            },
          });
          // console.log("Nuevo auto:", formData);
        } catch (error) {
          Swal.fire({
            title: "Error al publicar la moto",
            text: "Se ah producido un error al enviar los datos de la moto.",
            icon: "error",
          });
          console.error(error);
        }
      }
    });
  };

  return (
    <div className="m-auto flex flex-col min-w-[30%] max-w-[500px] gap-4 py-5 px-10 border-2 rounded-lg">
      <h1 className="bold text-2xl text-center">ADD NEW MOTO</h1>
      <form
        onSubmit={handleSubmiMoto}
        className="flex flex-col gap-2 min-w-full"
      >
        <div className="input-wrapper flex flex-col">
          <label htmlFor="marca">Marca</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Ingrese la marca"
              //value={formData.marca}
              onChange={(e) => {
                const inputValue = e.target.value;
                setFormData((prevData) => ({
                  ...prevData,
                  marca: inputValue,
                }));
              }}
              className={`border rounded px-3 py-2 w-full ${
                isBrandValid === false ? "border-red-500" : ""
              } ${isBrandValid === true ? "border-green-500" : ""}`}
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
              Debe tener entre 5 y 15 caracteres (sin contar espacios)
            </p>
          )}
        </div>

        <div className="input-wrapper flex flex-col">
          <label htmlFor="modelo">Modelo</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Ingrese el modelo"
              //value={formData.modelo}
              onChange={(e) => {
                const inputValue = e.target.value;
                setFormData((prevData) => ({
                  ...prevData,
                  modelo: inputValue,
                }));
              }}
              className={`border rounded px-3 py-2 w-full ${
                isModelValid === false ? "border-red-500" : ""
              } ${isModelValid === true ? "border-green-500" : ""}`}
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
              Debe tener entre 5 y 15 caracteres (sin contar espacios)
            </p>
          )}
        </div>

        <div className="input-wrapper flex flex-col">
          <label htmlFor="tipo">Tipo</label>
          <div className="relative">
            <Select
              options={optionsTipo}
              placeholder="Selecciona un Modelo de Moto"
              className={`border rounded w-full ${
                isTipoValid === false ? "border-red-500" : ""
              } ${isTipoValid === true ? "border-green-500" : ""}`}
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
          <label htmlFor="year">Año</label>
          <div className="relative">
            <input
              type="number"
              //value={formData.year}
              placeholder="Ingrese un año"
              onChange={(e) => {
                const inputValue = e.target.value;
                setFormData((prevData) => ({
                  ...prevData,
                  year: inputValue,
                }));
              }}
              className={`border rounded px-3 py-2 w-full ${
                isYearValid === false ? "border-red-500" : ""
              } ${isYearValid === true ? "border-green-500" : ""}`}
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
          <label htmlFor="precio">Precio</label>
          <div className="relative">
            <input
              type="number"
              //value={formData.precio}
              placeholder="Ingrese un monto"
              onChange={(e) => {
                const inputValue = e.target.value;
                setFormData((prevData) => ({
                  ...prevData,
                  precio: inputValue,
                }));
              }}
              className={`border rounded px-3 py-2 w-full ${
                isPrecioValid === false ? "border-red-500" : ""
              } ${isPrecioValid === true ? "border-green-500" : ""}`}
            />
            {isPrecioValid === false && (
              <BsXCircle className="text-red-500 absolute top-1/2 transform -translate-y-1/2 -right-5" />
            )}
            {isPrecioValid === true && (
              <BsCheckCircle className="text-green-500 absolute top-1/2 transform -translate-y-1/2 -right-5" />
            )}
          </div>
          {isPrecioValid === false && (
            <p className="text-xs italic text-red-500">
              El precio debe ser un monto válido (mayor 500)
            </p>
          )}
        </div>

        <div className="input-wrapper flex flex-col">
          <label htmlFor="tipo">Combustible</label>
          <div className="relative">
            <Select
              options={optionsCombustible}
              placeholder="Selecciona el tipo de combustible"
              className={`border rounded ${
                isCombustibleValid === false ? "border-red-500" : ""
              } ${isCombustibleValid === true ? "border-green-500" : ""}`}
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

        <div className="input-wrapper flex flex-col">
          <label htmlFor="colorDisposible">Color de la Moto</label>
          <div className="relative">
            <Select
              options={sortedColorOptions}
              placeholder="Selecciona o agrega un color"
              className={`border rounded ${
                isColorValid === false ? "border-red-500" : ""
              } ${isColorValid === true ? "border-green-500" : ""}`}
              styles={customStyles}
              isMulti
              creatable
              formatCreateLabel={(inputValue) =>
                `Agregar color "${inputValue}"`
              }
              onChange={handleColorSelection}
            />
            {isColorValid === false && (
              <BsXCircle className="text-red-500 absolute top-1/2 transform -translate-y-1/2 -right-5" />
            )}
            {isColorValid === true && (
              <BsCheckCircle className="text-green-500 absolute top-1/2 transform -translate-y-1/2 -right-5" />
            )}
          </div>
          {isColorValid === false && (
            <p className="text-xs italic text-red-500">
              Selecciona al menos un color
            </p>
          )}
        </div>

        {/* Barra divisoria */}
        <div className="w-full h-0.5 border rounded-lg bg-gray-400 my-4">
          <h1 className="bold text-2xl "></h1>
        </div>

        <div className="input-wrapper flex flex-col">
          <div className="input-wrapper flex flex-col">
            <label htmlFor="motor">Motor</label>
            <div className="relative">
              <Select
                options={optionsMotor}
                placeholder="Selecciona el motor"
                className={`border rounded ${
                  isMotorValid === false ? "border-red-500" : ""
                } ${isMotorValid === true ? "border-green-500" : ""}`}
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
        </div>
        <div className="input-wrapper flex flex-col">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
