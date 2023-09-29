import React, { useState, useEffect, useLayoutEffect } from "react";

import axios from "axios";

import Swal from "sweetalert2";

import {
  Basic_Info,
  Data_Sheet,
  MediaInventoryManager,
} from "../../components";

const Create_New_Moto = () => {
  const [activeTab, setActiveTab] = useState("BasicInfo");
  const [formData, setFormData] = useState({
    marca: "",
    modelo: "",
    tipo: "",
    year: Number,
    precio: Number,
    imageUrl: [],
    combustible: "",
    fichaTecnica: {
      motor: "",
      pasajeros: "",
      cilindrada: "",
      velocidades: "",
    },
  });

  const [motos, setMotos] = useState([]);
  // const [motoExistente, setMotoExistente] = useState(false);

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

  // const [selectedColors, setSelectedColors] = useState([]);

  const [image, setImage] = useState([""]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageUploaded, setImageUploaded] = useState(false);
  // const [modalSpin, setModalSpin] = useState(false);
  //console.log(formData);

  // Variable para activar el boton de añadir si el formulario es valido
  const [isButtonActive, setIsButtonActive] = useState(false);

  // Variables de validación
  const [isBrandValid, setIsBrandValid] = useState(true);
  const [isModelValid, setIsModelValid] = useState(true);
  const [isYearValid, setIsYearValid] = useState(true);
  const [isTipoValid, setIsTipoValid] = useState(true);
  const [isPrecioValid, setIsPrecioValid] = useState(true);
  // const [isColorValid, setIsColorValid] = useState(true);
  const [isCombustibleValid, setIsCombustibleValid] = useState(true);

  // Variables de Validación de la Ficha Tecnica
  const [isMotorValid, setIsMotorValid] = useState(true);
  const [isPasajerosValid, setIsPasajerosValid] = useState(true);
  const [isCilindradaValid, setIsCilindradaValid] = useState(true);
  const [isVelocidadesValid, setIsVelocidadesValid] = useState(true);

  useLayoutEffect(() => {
    const { marca, modelo, tipo, year, precio, combustible, fichaTecnica } =
      formData;

    // Validación de propiedad marca
    const brandRegex = /^[A-Za-z\s]*[A-Za-z][A-Za-z\s]*(?!\s*$)/;
    const validBrand =
      brandRegex.test(marca) &&
      marca.trim().length >= 3 &&
      marca.trim().length <= 15;
    setIsBrandValid(validBrand);

    //console.log("Marca", validBrand, marca);

    // Validación de propiedad modelo
    const modeloRegex = /^[A-Za-z0-9/-]+(\s[A-Za-z0-9/-]+)*$/;
    const validCarModel =
      modeloRegex.test(modelo) &&
      modelo.trim().length >= 5 &&
      modelo.trim().length <= 50;
    setIsModelValid(validCarModel);

    // Validación de propiedad tipo
    const validTipo = ["scooter", "naked", "enduro", "street", "cub"].includes(
      tipo
    );
    setIsTipoValid(validTipo);
    //console.log("Tipo", validTipo);

    // Validación del rango de los años
    const currentYear = new Date().getFullYear();
    const minYear = 2010;
    const validYear = year >= minYear && year <= currentYear;
    setIsYearValid(validYear);

    // Validación de propiedad precio
    const precioRegex = /^\d[0-9]+$/;
    const validPrecio = precioRegex.test(precio) && parseInt(precio) >= 500;
    setIsPrecioValid(validPrecio);
    //console.log("Precio:", validPrecio, precio);

    // Validación de propiedad combustible
    const validCombustible = ["nafta", "gasolina", "electrico"].includes(
      combustible
    );
    setIsCombustibleValid(validCombustible);
    //console.log("Combustible", validCombustible, combustible);

    // // Validación de propiedad color
    // const validColorDisponible = colorDisponible && colorDisponible.length > 0;
    // setIsColorValid(validColorDisponible);
    // //console.log("Colors:", validColorDisponible, colorDisponible);

    /*--------------------------------------------------------------------------------------------*/
    // Validación de propiedad fichaTecnica:
    // Motor
    const validMotor = ["2 tiempos", "4 tiempos"].includes(fichaTecnica.motor);
    setIsMotorValid(validMotor);
    //console.log("Motor: ", validMotor, fichaTecnica.motor);

    // Pasajeros
    const validPasajeros =
      fichaTecnica.pasajeros !== "" && parseInt(fichaTecnica.pasajeros) >= 1;
    setIsPasajerosValid(validPasajeros);
    //console.log("Pasajeros: ", validPasajeros, fichaTecnica.pasajeros);

    // Cilindrada
    const validCilindrada =
      fichaTecnica.cilindrada !== "" && parseInt(fichaTecnica.cilindrada) >= 1;
    setIsCilindradaValid(validCilindrada);
    //console.log("Cilindrada: ", validCilindrada, fichaTecnica.cilindrada);

    // Velocidades
    const validVelocidades = ["N/A", "4", "5", "6"].includes(
      fichaTecnica.velocidades
    );
    setIsVelocidadesValid(validVelocidades);
    //console.log("Velocidades", validVelocidades, fichaTecnica.velocidades);

    // Validaciónes de formulario completo
    const isFormDataValid =
      isBrandValid &&
      isModelValid &&
      isTipoValid &&
      isCombustibleValid &&
      isPrecioValid &&
      isYearValid &&
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
    isMotorValid,
    isPasajerosValid,
    isCilindradaValid,
    isVelocidadesValid,
  ]);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
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
                const jsonData = JSON.stringify({
                  ...formData,
                  imageUrl: imageUrls,
                });
                console.log(jsonData);

                const response = await axios.post("motos", jsonData, {
                  headers: {
                    "Content-Type": "application/json",
                  },
                });

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
    <div className="min-h-full max-h-full pl-4 pr-1 py-4 justify-center overflow-y-scroll scrollbar-gutter">
      <div className="flex flex-col">
        <div
          className={`w-[full] min-h-full max-h-full border-b border-gray-200 rounded-md -mb-2 z-0 overflow-hidden`}
        >
          <nav className="-mb-px flex gap-0">
            <a
              href="#"
              className={`duration-200 linear shrink-0 border rounded-t-lg border-b-transparent p-2 text-sm font-medium ${
                activeTab === "BasicInfo"
                  ? "text-[#C63D05] border-[#C63D05] bg-[#f8baa150]"
                  : "text-gray-500 hover:text-gray-700 border-transparent"
              }`}
              onClick={() => handleTabChange("BasicInfo")}
            >
              Información Básica
            </a>

            <a
              href="#"
              className={`duration-200 linear shrink-0 border rounded-t-lg border-b-transparent p-2 text-sm font-medium ${
                activeTab === "DataSheet"
                  ? "text-[#C63D05] border-[#C63D05] bg-[#f8baa150]"
                  : "text-gray-500 hover:text-gray-700 border-transparent"
              }`}
              onClick={() => handleTabChange("DataSheet")}
            >
              Ficha Técnica
            </a>

            <a
              href="#"
              className={`duration-200 linear shrink-0 border rounded-t-lg border-b-transparent p-2 text-sm font-medium ${
                activeTab === "ImagesColorsStock"
                  ? "text-[#C63D05] border-[#C63D05] bg-[#f8baa150]"
                  : "text-gray-500 hover:text-gray-700 border-transparent"
              }`}
              onClick={() => handleTabChange("ImagesColorsStock")}
            >
              Multimedia y Gestión de Inventario
            </a>
          </nav>
        </div>

        <form className="gap-2 min-w-full h-full bg-white z-10 ">
          {activeTab === "BasicInfo" && (
            <Basic_Info
              formData={formData}
              setFormData={setFormData}
              isBrandValid={isBrandValid}
              isModelValid={isModelValid}
              isTipoValid={isTipoValid}
              isYearValid={isYearValid}
              isCombustibleValid={isCombustibleValid}
            />
          )}
          {activeTab === "DataSheet" && (
            <Data_Sheet
              formData={formData}
              setFormData={setFormData}
              isMotorValid={isMotorValid}
              isCilindradaValid={isCilindradaValid}
              isPasajerosValid={isPasajerosValid}
              isVelocidadesValid={isVelocidadesValid}
            />
          )}
          {activeTab === "ImagesColorsStock" && (
            <MediaInventoryManager
              formData={formData}
              setFormData={setFormData}
              handleImageChange={handleImageChange}
              isPrecioValid={isPrecioValid}
              selectedImages={selectedImages}
              imagePreviews={imagePreviews}
              isButtonActive={isButtonActive}
              handleSubmiMoto={handleSubmiMoto}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default Create_New_Moto;
