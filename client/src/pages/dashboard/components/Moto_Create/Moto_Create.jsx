import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import Select from "react-select";

import "./carousel.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const optionsTipo = [
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

const optionsColor = [
  { value: "rojo", label: "Rojo" },
  { value: "azul", label: "Azul" },
  // Agregar las demás opciones de color
];

const optionsMotor = [
  { value: "motor1", label: "Motor 1" },
  { value: "motor2", label: "Motor 2" },
  // Agregar las demás opciones de motor
];

const Moto_Create = () => {
  const [validationState, setValidationState] = useState({});
  const [imagePreviews, setImagePreviews] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedColors, setSelectedColors] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const customStyles = {
    control: (provided) => ({
      ...provided,
      boxShadow:
        validationState.colorDisponible === false
          ? "0 0 0 1px #e53e3e"
          : "none",
    }),
  };

  const isFieldValid = (fieldName, value) => {
    switch (fieldName) {
      case "marca":
        return (
          /^[A-Za-z]+(\s[A-Za-z]+)*(?!\s*$)/.test(value) &&
          value.trim().length >= 5 &&
          value.trim().length <= 15
        );
      case "modelo":
        return (
          /^[A-Za-z0-9]+(\s[A-Za-z0-9]+)*$/.test(value) &&
          value.trim().length >= 5 &&
          value.trim().length <= 25
        );
      case "year":
        return (
          /^[0-9]+$/.test(value) &&
          parseInt(value) >= 2010 &&
          parseInt(value) <= new Date().getFullYear()
        );
      case "precio":
        return /^[0-9]+$/.test(value) && parseInt(value) >= 500;
      case "combustible":
        return !!value;
      case "colorDisponible":
        return selectedColors.length > 0;
      // Agregar casos para otros campos aquí
      default:
        return true;
    }
  };

  const handleInputChange = (fieldName, value) => {
    console.log("", fieldName, value);
    const isValid = isFieldValid(fieldName, value);
    console.log(isValid);
    setValidationState({
      ...validationState,
      [fieldName]: isValid,
    });

    //setSelectedImage(null); // Reiniciar la vista previa de imagen
  };
  const handleImageChange = (event) => {
    const selectedFiles = event.target.files;
    const previews = [];

    if (selectedFiles.length > 0) {
      setSelectedImage(null);
      setImagePreviews([]);

      for (let i = 0; i < selectedFiles.length; i++) {
        const reader = new FileReader();

        reader.onload = () => {
          previews.push(reader.result);
          if (previews.length === selectedFiles.length) {
            setImagePreviews(previews);
            if (previews.length === 1) {
              setSelectedImage(previews[0]);
            }
            setValidationState({
              ...validationState,
              imageUrl: true, // Imagen seleccionada correctamente
            });
          }
        };

        reader.readAsDataURL(selectedFiles[i]);
      }
    } else {
      // No se seleccionó ninguna imagen, mostrar icono de error y mensaje de error
      setSelectedImage(null);
      setImagePreviews([]);
      setValidationState({
        ...validationState,
        imageUrl: false, // Error: No se seleccionó ninguna imagen
      });
    }
  };

  const handleTipoSelection = (selectedOption) => {
    handleInputChange("tipo", selectedOption.value);
  };

  const handleColorSelection = (selectedOptions) => {
    console.log("", selectedOptions);
    setSelectedColors(selectedOptions.map((option) => option.value));
    handleInputChange("colorDisponible", selectedOptions);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="m-auto flex flex-col gap-4 w-1/3 py-5 px-10 border-2 rounded-lg">
      <h1 className="bold text-2xl">Add New Moto</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {/* Resto de los campos de entrada aquí */}
        <div className="input-wrapper flex flex-col">
          <label htmlFor="marca">Marca</label>

          <div className="relative">
            <input
              type="text"
              {...register("marca", {
                pattern: {
                  value: /^[A-Za-z\s]*[A-Za-z][A-Za-z\s]*(?!\s*$)/,
                  message: "Solo letras y espacios son permitidos",
                },
              })}
              onChange={(e) => handleInputChange("marca", e.target.value)}
              className={`border rounded px-3 py-2 w-full ${
                validationState.marca === false ? "border-red-500" : ""
              } ${validationState.marca === true ? "border-green-500" : ""}`}
            />
            {validationState.marca === false && (
              <BsXCircle className="text-red-500 absolute top-1/2 transform -translate-y-1/2 right-3" />
            )}
            {validationState.marca === true && (
              <BsCheckCircle className="text-green-500 absolute top-1/2 transform -translate-y-1/2 right-3" />
            )}
          </div>

          {validationState.marca === false && (
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
              {...register("modelo", {
                pattern: {
                  value: /^[A-Za-z0-9\s-]+(?!\s*$)/,
                  message: "Solo letras, números y guiones son permitidos",
                },
              })}
              onChange={(e) => handleInputChange("modelo", e.target.value)}
              className={`border rounded px-3 py-2 w-full ${
                validationState.modelo === false ? "border-red-500" : ""
              } ${validationState.modelo === true ? "border-green-500" : ""}`}
            />
            {validationState.modelo === false && (
              <BsXCircle className="text-red-500 absolute top-1/2 transform -translate-y-1/2 right-3" />
            )}
            {validationState.modelo === true && (
              <BsCheckCircle className="text-green-500 absolute top-1/2 transform -translate-y-1/2 right-3" />
            )}
          </div>

          {validationState.modelo === false && (
            <p className="text-xs italic text-red-500">
              Debe tener entre 5 y 25 caracteres (sin contar espacios)
            </p>
          )}
        </div>

        <div className="input-wrapper flex flex-col">
          <label htmlFor="tipo">Tipo</label>
          <Select
            {...register("tipo", {
              required: "Selecciona un tipo",
            })}
            options={optionsTipo}
            className={`border rounded ${
              validationState.tipo === false ? "border-red-500" : ""
            } ${validationState.tipo === true ? "border-green-500" : ""}`}
            onChange={handleTipoSelection}
          />
          {validationState.tipo === false && (
            <p className="text-xs italic text-red-500">
              Selecciona una opción válida
            </p>
          )}
        </div>

        <div className="input-wrapper flex flex-col">
          <label htmlFor="imageUrl" className="mb-1">
            Imagen
          </label>

          <div className="flex items-center w-full">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Vista previa"
                className="w-20 h-20"
              />
            ) : null}

            {imagePreviews.length > 1 ? (
              <Carousel>
                {imagePreviews.map((preview, index) => (
                  <div key={index}>
                    <img src={preview} alt={`Vista previa ${index + 1}`} />
                  </div>
                ))}
              </Carousel>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="file"
              accept=".jpg, .jpeg, .png, .gif"
              {...register("imageUrl", {
                validate: {
                  validFiles: (value) => {
                    if (!value[0]) {
                      setSelectedImage(null); // Reset the selected image preview
                      return "Selecciona al menos una imagen";
                    }
                    return true;
                  },
                },
              })}
              onChange={handleImageChange}
              className="hidden"
              id="imageUrl"
              multiple
            />
            <label
              htmlFor="imageUrl"
              className="cursor-pointer bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-300"
            >
              Seleccionar Imagen
            </label>
          </div>

          {errors.imageUrl && (
            <div className="flex items-center">
              <BsXCircle className="text-red-500 mr-2" />
              <p className="text-xs italic text-red-500">
                {errors.imageUrl.message}
              </p>
            </div>
          )}
          {selectedImage && !errors.imageUrl && (
            <div className="flex items-center">
              <BsCheckCircle className="text-green-500 mr-2" />
              <p className="text-xs italic text-green-500">
                Imagen seleccionada
              </p>
            </div>
          )}
        </div>

        <div className="input-wrapper flex flex-col">
          <label htmlFor="year">Año</label>
          <div className="relative">
            <input
              type="number"
              {...register("year", {
                validate: {
                  validNumber: (value) =>
                    /^[0-9]+$/.test(value) &&
                    parseInt(value) >= 2010 &&
                    parseInt(value) <= new Date().getFullYear(),
                },
              })}
              onChange={(e) => handleInputChange("year", e.target.value)}
              className={`border rounded px-3 py-2 w-full ${
                validationState.year === false ? "border-red-500" : ""
              } ${validationState.year === true ? "border-green-500" : ""}`}
            />
            {validationState.year === false && (
              <BsXCircle className="text-red-500 absolute top-1/2 transform -translate-y-1/2 right-10" />
            )}
            {validationState.year === true && (
              <BsCheckCircle className="text-green-500 absolute top-1/2 transform -translate-y-1/2 right-10" />
            )}
          </div>
          {validationState.year === false && (
            <p className="text-xs italic text-red-500">
              Debe ser un número entre 2010 y el año actual
            </p>
          )}
        </div>

        <div className="input-wrapper flex flex-col">
          <label htmlFor="precio">Precio</label>
          <div className="relative">
            <input
              type="number"
              {...register("precio", {
                validate: {
                  validNumber: (value) =>
                    /^[0-9]+$/.test(value) && parseInt(value) >= 500,
                },
              })}
              onChange={(e) => handleInputChange("precio", e.target.value)}
              className={`border rounded px-3 py-2 w-full ${
                validationState.precio === false ? "border-red-500" : ""
              } ${validationState.precio === true ? "border-green-500" : ""}`}
            />
            {validationState.precio === false && (
              <BsXCircle className="text-red-500 absolute top-1/2 transform -translate-y-1/2 right-10" />
            )}
            {validationState.precio === true && (
              <BsCheckCircle className="text-green-500 absolute top-1/2 transform -translate-y-1/2 right-10" />
            )}
          </div>
          {validationState.precio === false && (
            <p className="text-xs italic text-red-500">
              Debe ser un número mayor o igual a 500
            </p>
          )}
        </div>

        <div className="input-wrapper flex flex-col">
          <label htmlFor="combustible">Combustible</label>
          <Select
            {...register("combustible", {
              validate: {
                validOption: (value) => !!value,
              },
            })}
            options={optionsCombustible}
            className={`border rounded ${
              validationState.combustible === false ? "border-red-500" : ""
            } ${
              validationState.combustible === true ? "border-green-500" : ""
            }`}
            onChange={(selectedOption) =>
              handleInputChange("combustible", selectedOption.value)
            }
          />
          {validationState.combustible === false && (
            <p className="text-xs italic text-red-500">
              Selecciona una opción válida
            </p>
          )}
        </div>

        <div className="input-wrapper flex flex-col">
          <label htmlFor="colorDisponible">Colores Disponibles</label>
          <Select
            {...register("colorDisponible", {
              validate: {
                validOption: (value) => selectedColors.length > 0,
              },
            })}
            options={optionsColor}
            className="mt-2"
            isMulti
            value={selectedColors.map((color) => ({
              value: color,
              label: color,
            }))}
            onChange={handleColorSelection}
            styles={customStyles}
            placeholder="Selecciona o agrega colores"
            creatable
            formatCreateLabel={(inputValue) => `Agregar color "${inputValue}"`}
          />
          {validationState.colorDisponible === false && (
            <p className="text-xs italic text-red-500">
              Selecciona al menos un color
            </p>
          )}
        </div>
        {/* Resto de los campos de entrada aquí */}
        <button
          type="submit"
          className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Moto_Create;
