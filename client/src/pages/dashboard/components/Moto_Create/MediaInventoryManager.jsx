import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Carousel } from "react-responsive-carousel";

import { BsXCircle, BsCheckCircle } from "react-icons/bs";

const optionsColor = [
  // Opciones de color
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

const MediaInventoryManager = ({
  formData,
  setFormData,
  handleImageChange,
  isColorValid,
  isPrecioValid,
  selectedImages,
  imagePreviews,
  isButtonActive,
  handleSubmiMoto,
}) => {
  const [isTall, setIsTall] = useState(false);
  console.log(isTall);

  useEffect(() => {
    // Calcula la altura del contenedor cuando el componente se monta
    const contenedor = document.getElementById("miContenedor");
    if (contenedor) {
      setIsTall(contenedor.offsetHeight > 0);
    }
  }, []);

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

  const handleColorSelection = (selectedOptions) => {
    const selectedColors = selectedOptions.map((option) => option.value);
    console.log(selectedColors);
    //setSelectedColors(selectedColors);
    setFormData((prevData) => ({
      ...prevData,
      colorDisponible: selectedColors,
    }));
  };

  const handlePrecioChange = (event) => {
    const precio = event.target.value;
    console.log(precio);
    setFormData((prevData) => ({
      ...prevData,
      precio: Number(precio),
    }));
  };

  return (
    <div className="flex flex-col m-auto min-w-[100%] max-w-full min-h-[100%] max-h-[100%] gap-5 py-5 px-10 border-2 rounded-b-lg">
      <div className="flex flex-row">
        <div
          id="miContenedor"
          className="flex flex-col items-center w-[40%] border rounded p-2"
        >
          <label
            htmlFor="imageUrl"
            className="text-lg font-semibold text-[#c63d05] uppercase"
          >
            {selectedImages.length === 0
              ? "Por favor selecciona una imagen"
              : selectedImages.length > 1
              ? "Imagenes seleccionadas"
              : "Imagen seleccionada"}
          </label>

          {selectedImages.length > 0 && (
            <div
              className={`flex flex-col image-preview m-4 ${
                isTall ? "w-[60%]" : "w-[100%]"
              }`}
            >
              {selectedImages.length === 1 ? (
                <img src={imagePreviews[0]} alt="Vista previa" className="" />
              ) : (
                <Carousel className="flex flex-col">
                  {imagePreviews.map((preview, index) => (
                    <div key={index}>
                      <img src={preview} alt={`Vista previa ${index + 1}`} />
                    </div>
                  ))}
                </Carousel>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between w-[50%] mx-auto gap-4 py-5">
          <div className="flex flex-row items-center justify-left my-4">
            <div className="flex items-center gap-2 mr-2">
              <input
                type="file"
                accept=".jpg, .jpeg, .png, .gif"
                onChange={handleImageChange}
                className="hidden"
                id="imageUrl"
                multiple
              />
              <label
                htmlFor="imageUrl"
                className="cursor-pointer bg-black text-white px-4 py-2 rounded-lg hover:bg-[#FFD700] hover:text-gray-900 transition duration-300"
              >
                Seleccionar Imagen
              </label>
            </div>
          </div>
          <div className="input-wrapper flex flex-col">
            <label
              htmlFor="colorDisposible"
              className="pl-2 text-lg font-semibold text-[#c63d05] uppercase"
            >
              Colores de las Motos
            </label>
            <div className="relative">
              <Select
                options={sortedColorOptions}
                value={optionsColor.filter((option) =>
                  formData.colorDisponible.includes(option.value)
                )}
                placeholder="Selecciona o agrega un color"
                className={`border rounded ${
                  isColorValid === true ? "border-green-500" : ""
                }`}
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

          <div className="input-wrapper flex flex-col">
            <label
              htmlFor="precio"
              className="pl-2 text-lg font-semibold text-[#c63d05] uppercase"
            >
              Precio
            </label>
            <div className="relative">
              <input
                type="number"
                value={formData.precio}
                placeholder="Ingrese un monto"
                onChange={(e) => handlePrecioChange(e)}
                className={`border rounded px-3 py-2 w-full ${
                  isPrecioValid === true ? "border-green-500" : ""
                }`}
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
          <div className="flex justify-center h-full w-full items-end">
            <button
              type="submit"
              onClick={handleSubmiMoto}
              disabled={!isButtonActive}
              className={`mt-4 w-40 h-12 ${
                !isButtonActive
                  ? "bg-slate-300 text-3xl text-black font-bold px-4 mb-2 rounded-lg shadow-sm duration-300 shadow-[#808080] cursor-not-allowed"
                  : "bg-[#C63D05] text-3xl text-white font-bold px-4 mb-2 rounded-lg shadow-sm duration-300 hover:shadow-sm shadow-[#202020] hover:text-gray-900 hover:bg-[#ff6600] cursor-pointer"
              }`}
              // className="w-40 h-12 bg-[#C63D05] text-3xl text-white font-bold px-4 mb-2 rounded-lg shadow-sm duration-300 hover:shadow-sm shadow-[#202020] hover:text-gray-900 hover:bg-[#ff6600]"
            >
              CREAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaInventoryManager;
