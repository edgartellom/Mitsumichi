/* Import Library */
import React, { useState, useEffect, useLayoutEffect } from "react";
import { BsXCircle, BsCheckCircle } from "react-icons/bs";
import Select from "react-select";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Swal from "sweetalert2";
import axios from "axios";

/* Import the Componentes*/
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";

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

const Moto_Create = () => {
  const [selectedColors, setSelectedColors] = useState([]);

  const [image, setImage] = useState([""]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const [imageUploaded, setImageUploaded] = useState(false);
  // const [modalSpin, setModalSpin] = useState(false);

  const [motos, setMotos] = useState([]);
  const [motoExistente, setMotoExistente] = useState(false);
  // console.log(motos);

  //Motos almacenadas en la base de datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("motos?page=1&limit=10000");

        setMotos(response.data.data);
      } catch (error) {
        console.error("Error al obtener las motos:", error);
      }
    };

    fetchData();
  }, []);

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

  // Variable para activar el boton de añadir si el formulario es valido
  const [isButtonActive, setIsButtonActive] = useState(false);

  // Variables de validación
  const [isBrandValid, setIsBrandValid] = useState(true);
  const [isModelValid, setIsModelValid] = useState(true);
  const [isYearValid, setIsYearValid] = useState(true);
  const [isTipoValid, setIsTipoValid] = useState(true);
  const [isPrecioValid, setIsPrecioValid] = useState(true);
  const [isColorValid, setIsColorValid] = useState(true);
  const [isCombustibleValid, setIsCombustibleValid] = useState(true);

  // Variables de Validación de la Ficha Tecnica
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
    const validColorDisponible = colorDisponible && colorDisponible.length > 0;
    setIsColorValid(validColorDisponible);
    console.log("Colors:", validColorDisponible, colorDisponible);

    /*--------------------------------------------------------------------------------------------*/
    // Validación de propiedad fichaTecnica:
    // Motor
    const validMotor = ["2 tiempos", "4 tiempos"].includes(fichaTecnica.motor);
    setIsMotorValid(validMotor);
    console.log("Motor: ", validMotor, fichaTecnica.motor);

    // Pasajeros
    const validPasajeros =
      fichaTecnica.pasajeros !== "" && parseInt(fichaTecnica.pasajeros) >= 1;
    setIsPasajerosValid(validPasajeros);
    console.log("Pasajeros: ", validPasajeros, fichaTecnica.pasajeros);

    // Cilindrada
    const validCilindrada =
      fichaTecnica.cilindrada !== "" && parseInt(fichaTecnica.cilindrada) >= 1;
    setIsCilindradaValid(validCilindrada);
    console.log("Cilindrada: ", validCilindrada, fichaTecnica.cilindrada);

    // Velocidades
    const validVelocidades = ["N/A", "4", "5", "6"].includes(
      fichaTecnica.velocidades
    );
    setIsVelocidadesValid(validVelocidades);
    console.log("Velocidades", validVelocidades, fichaTecnica.velocidades);

    // Validaciónes de formulario completo
    const isFormDataValid =
      isBrandValid &&
      isModelValid &&
      isTipoValid &&
      isCombustibleValid &&
      isPrecioValid &&
      isYearValid &&
      isColorValid &&
      isMotorValid &&
      isPasajerosValid &&
      isCilindradaValid &&
      isVelocidadesValid;

    console.log("Formulario", isFormDataValid);
    setIsButtonActive(isFormDataValid);
  }, [
    formData,
    isBrandValid,
    isModelValid,
    isCombustibleValid,
    isPrecioValid,
    isTipoValid,
    isYearValid,
    isColorValid,
    isMotorValid,
    isPasajerosValid,
    isCilindradaValid,
    isVelocidadesValid,
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

    setFormData((prevData) => ({
      ...prevData,
      tipo: tipo,
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

  const handleImageChange = (event) => {
    const files = event.target.files;
    console.log(files);
    const previews = [];

    for (let i = 0; i < files.length; i++) {
      previews.push(URL.createObjectURL(files[i]));
    }
    setImage(files);
    setSelectedImages(files);
    setImagePreviews(previews);
  };
  const handleImageUploadCloudinary = async (images) => {
    const cloudName = import.meta.env.VITE_REACT_APP_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env
      .VITE_REACT_APP_CLOUDINARY_UPLOAD_PRESET;
    const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    return new Promise(async (resolve, reject) => {
      Swal.fire({
        title: "Espere por favor",
        text: "Subiendo las imágenes...",
        width: 400,
        color: "#161616",
        background: "#FFF9EB",
        didOpen: () => {
          Swal.showLoading();
        },
        icon: "info",
      });

      try {
        const imageUrls = [];

        for (const image of images) {
          const formData = new FormData();
          formData.append("file", image);
          formData.append("upload_preset", uploadPreset);
          formData.append("cloud_name", cloudName);

          const response = await axios.post(apiUrl, formData);

          if (response.data && response.data.secure_url) {
            imageUrls.push(response.data.secure_url);
          } else {
            console.log("Error al subir la imagen:", response.data);
          }
        }

        Swal.fire({
          title: "Imágenes subidas",
          text: "Creando la moto...",
          icon: "info",
          width: 400,
          color: "#161616",
          background: "#FFF9EB",
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: false,
          showConfirmButton: false,
          allowEscapeKey: false,
          allowEnterKey: false,
        });

        setTimeout(() => {
          resolve(imageUrls);
        }, 2000); // Resuelve la promesa después de 2 segundos
      } catch (error) {
        // console.error("Error al subir las imágenes:", error);
        Swal.fire({
          title: "<span style='color: red;'>¡ERROR!</span>",
          text: "Ha ocurrido un error al subir las imágenes.",
          icon: "error",

          width: 400,
          color: "#161616",
          background: "#FFF9EB",
        });
        reject(error);
      }
    });
  };

  const handleSubmiMoto = async (e) => {
    e.preventDefault();

    // Verificar si hay imágenes seleccionadas
    if (selectedImages.length === 0) {
      Swal.fire({
        title: "<span style='color: #e76c46;'>¡ADVERTENCIA!</span>",
        text: "Debes cargar al menos una imagen antes de crear la moto.",
        icon: "warning",
        iconColor: "#e76c46",
        width: 400,
        color: "#161616",
        background: "#FFF9EB",
      });
      return;
    }

    // Verifica si existe una moto con la misma marca/modelo y si existe el modelo. Los modelos son unicos para cada moto.
    const marca = formData.marca.toLowerCase();
    const modelo = formData.modelo.toLowerCase();

    const motoExistente = motos.some(
      (moto) =>
        moto.brand.name.toLowerCase() === marca &&
        moto.motoModel.toLowerCase() === modelo
    );

    const modelExistente = motos.some(
      (moto) => moto.motoModel.toLowerCase() === modelo
    );

    if (motoExistente) {
      Swal.fire({
        title: "<span style='color: #e76c46;'>¡ADVERTENCIA!</span>",
        text: "Ya existe una moto con la misma marca y modelo. La marca y modelo deben ser distintos a los existentes.",
        icon: "warning",
        iconColor: "#e76c46",
        width: 400,
        color: "#161616",
        background: "#FFF9EB",
        confirmButtonColor: "#0250B6",
      });
    } else if (modelExistente) {
      Swal.fire({
        title: "<span style='color: #e76c46;'>¡ADVERTENCIA!</span>",
        text: "Ya existe una moto con el mismo modelo. Debe ser un modelo nuevo.",
        icon: "warning",
        iconColor: "#e76c46",
        width: 400,
        color: "#161616",
        background: "#FFF9EB",
        confirmButtonColor: "#0250B6",
      });
    } else {
      Swal.fire({
        title: "¿Deseas añadir esta nueva moto?",
        text: "Al confirmar, se añadirá la nueva moto.",
        icon: "question",
        showCancelButton: true,
        width: 400,
        background: "#FFF9EB",
        color: "#161616",
        confirmButtonColor: "#0250B6",
        cancelButtonColor: "#8D0106",
        confirmButtonText: "AÑADIR",
        cancelButtonText: "CANCELAR",
      }).then(async (result) => {
        if (result.isConfirmed) {
          handleImageUploadCloudinary(image)
            .then(async (imageUrls) => {
              try {
                // Mostrar el mensaje "Procesando..." durante al menos 3 segundos
                const processingDialog = Swal.fire({
                  title: "Espere por favor",
                  text: "Creando la moto...",
                  icon: "info",
                  width: 400,
                  color: "#161616",
                  background: "#FFF9EB",
                  didOpen: () => {
                    Swal.showLoading();
                  },
                  allowOutsideClick: false,
                  showConfirmButton: false,
                  allowEscapeKey: false,
                  allowEnterKey: false,
                });

                // Esperar al menos 3 segundos antes de continuar
                await new Promise((resolve) => setTimeout(resolve, 3000));

                console.log(imageUrls);
                console.log(
                  formData.JSON.stringify({ ...formData, imageUrl: imageUrls })
                );

                const response = await axios.post(
                  "motos",
                  JSON.stringify({ ...formData, imageUrl: imageUrls }),
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );
                console.log(response);

                // Cerrar el cuadro de diálogo "Procesando..."
                processingDialog.close();

                await Swal.fire({
                  title: "Creación exitosa",
                  text: "La moto se ha creado correctamente.",
                  icon: "success",
                  width: 400,
                  color: "#161616",
                  background: "#FFF9EB",
                  confirmButtonColor: "#0250B6",
                  confirmButtonText: "ACEPTAR",
                });

                // Limpiar los campos después de confirmar
                setFormData({
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

                setImage([]);
                setMotos([]);
                setSelectedImages([]);
                setImagePreviews([]);
                setSelectedColors([]);

                // Redirigir a la página de inicio u otra acción que desees realizar
                window.location.href = "/dashboard/products-admin";
              } catch (error) {
                // console.error(error);
                Swal.fire({
                  title: "Error al publicar la moto",
                  text: error.response.data.error,
                  icon: "error",
                  width: 400,
                  color: "#161616",
                  background: "#FFF9EB",
                });
              }
            })
            .catch((error) => {
              Swal.fire({
                title: "Error al publicar la moto",
                text: error.response.data.error,
                icon: "error",
                width: 400,
                color: "#161616",
                background: "#FFF9EB",
                confirmButtonColor: "#0250B6",
                confirmButtonText: "OK",
              });
              // console.error(error);
            });
        }
      });
    }
  };

  return (
    <div className="m-auto flex flex-col min-w-[30%] max-w-[500px] min-h-[30%] max-h-[66.5%] gap-4 py-5 px-10 border-2 rounded-lg overflow-auto">
      {imageUploaded && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-slate-100 bg-opacity-50">
          <LoadingSpinner />
        </div>
      )}
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
              value={formData.marca}
              onChange={(e) => {
                const marca = e.target.value;

                setFormData((prevData) => ({
                  ...prevData,
                  marca: marca,
                }));
              }}
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
          <label htmlFor="modelo">Modelo</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Ingrese el modelo"
              value={formData.modelo}
              onChange={(e) => {
                const modelo = e.target.value;

                setFormData((prevData) => ({
                  ...prevData,
                  modelo: modelo,
                }));
              }}
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
              Debe tener entre 5 y 25 caracteres (sin contar espacios)
            </p>
          )}
        </div>

        <div className="input-wrapper flex flex-col">
          <label htmlFor="tipo">Tipo</label>
          <div className="relative">
            <Select
              options={optionsTipo}
              value={optionsTipo.find(
                (option) => option.value === formData.tipo
              )}
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
          <label htmlFor="year">Año</label>
          <div className="relative">
            <input
              type="number"
              //value={formData.year}
              placeholder="Ingrese un año"
              onChange={(e) => {
                const year = e.target.value;

                setFormData((prevData) => ({
                  ...prevData,
                  year: Number(year),
                }));
              }}
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
          <label htmlFor="precio">Precio</label>
          <div className="relative">
            <input
              type="number"
              //value={formData.precio}
              placeholder="Ingrese un monto"
              onChange={(e) => {
                const precio = e.target.value;

                setFormData((prevData) => ({
                  ...prevData,
                  precio: Number(precio),
                }));
              }}
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

        <div className="input-wrapper flex flex-col">
          <label htmlFor="tipo">Combustible</label>
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

        <div className="input-wrapper flex flex-col">
          <label htmlFor="colorDisposible">Color de la Moto</label>
          <div className="relative">
            <Select
              options={sortedColorOptions}
              value={optionsColor.find(
                (option) => option.value === formData.color
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
        {/* Barra divisoria */}
        <div className="w-full h-0.5 border rounded-lg bg-gray-400 my-4"></div>

        <div className="input-wrapper flex flex-col border rounded p-2">
          <label htmlFor="imageUrl" className="mb-1">
            Imagen
          </label>

          {selectedImages.length > 0 && (
            <div className="image-preview m-4">
              {selectedImages.length === 1 ? (
                <img
                  src={imagePreviews[0]}
                  alt="Vista previa"
                  className=" rounded-lg w-50 h-50"
                />
              ) : (
                <Carousel>
                  {imagePreviews.map((preview, index) => (
                    <div key={index}>
                      <img src={preview} alt={`Vista previa ${index + 1}`} />
                    </div>
                  ))}
                </Carousel>
              )}
            </div>
          )}
          <div className="flex flex-row justify-center">
            <div className="flex items-center gap-2 mr-2">
              <input
                type="file"
                accept=".jpg, .jpeg, .png, .gif"
                onChange={handleImageChange}
                className="hidden"
                id="imageUrl"
                multiple // Asegúrate de que está habilitado el modo de selección múltiple
              />
              <label
                htmlFor="imageUrl"
                className="cursor-pointer bg-black text-white px-4 py-2 rounded-lg hover:bg-[#FFD700] hover:text-gray-900 transition duration-300"
              >
                Seleccionar Imagen
              </label>
            </div>
          </div>
        </div>

        {/* Barra divisoria */}
        <div className="w-full h-0.5 border rounded-lg bg-gray-400 my-4"></div>

        <div className="input-wrapper flex flex-col">
          <div className="input-wrapper flex flex-col">
            <label htmlFor="motor">Motor</label>
            <div className="relative">
              <Select
                options={optionsMotor}
                value={optionsMotor.find(
                  (option) => option.value === formData.motor
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
            <label htmlFor="velocidades">Velocidades de la Moto</label>
            <div className="relative">
              <Select
                options={optionsVelocidades}
                value={optionsVelocidades.find(
                  (option) => option.value === formData.velocidades
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
            <label htmlFor="pasajeros">Pasajeros</label>
            <div className="relative">
              <input
                type="number"
                value={formData.pasajeros}
                placeholder="Ingrese el número de pasajeros"
                onChange={(e) => {
                  const pasajeros = e.target.value;

                  setFormData((prevData) => ({
                    ...prevData,
                    fichaTecnica: {
                      ...prevData.fichaTecnica, // Mantén los campos existentes
                      pasajeros: pasajeros, // Modifica el campo cilindrada
                    },
                  }));
                }}
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
            <label htmlFor="cilindrada">Cilindrada</label>
            <div className="relative">
              <input
                type="number"
                value={formData.cilindrada}
                placeholder="Ingrese el valor la cilindrada"
                onChange={(e) => {
                  const cilindrada = e.target.value;

                  setFormData((prevData) => ({
                    ...prevData,
                    fichaTecnica: {
                      ...prevData.fichaTecnica, // Mantén los campos existentes
                      cilindrada: cilindrada, // Modifica el campo cilindrada
                    },
                  }));
                }}
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

        <div className="input-wrapper flex flex-col">
          <button
            type="submit"
            disabled={!isButtonActive} // Desactiva el botón si isButtonActive es falso
            className="px-4 py-2 mt-4 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Moto_Create;
