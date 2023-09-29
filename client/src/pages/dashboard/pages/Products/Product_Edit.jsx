import React, { useState, useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import Swal from "sweetalert2";

import {
  Basic_Info_Product,
  Data_Sheet_Product,
  MediaInventoryManager_Product,
} from "../../components";

const Product_Edit = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("BasicInfo");

  // Estado para rastrear las imágenes seleccionadas en el input
  const [selectedImages, setSelectedImages] = useState([]);
  // Estado para rastrear las URL de previsualización de las imágenes
  const [imagePreviews, setImagePreviews] = useState([]);

  const [currentFormData, setCurrentFormData] = useState({
    precio: 0,
    stock: 0,
  });

  const [formData, setFormData] = useState({
    id: 0,
    marca: "",
    modelo: "",
    tipo: "",
    year: 0,
    precio: 0,
    imageUrl: [],
    combustible: "",
    stock: 0,
    fichaTecnica: {
      motor: "",
      pasajeros: "",
      cilindrada: "",
      velocidades: "",
    },
  });

  useEffect(() => {
    const fetchDataEdit_Product = async () => {
      try {
        const response = await axios.get(`motos/${id}`);

        const responseBrand = await axios(`marcas`);
        const brandFound = responseBrand.data.find(
          (e) => e.id === response.data.brandId
        );

        const responseTipo = await axios(`tipos`);
        const tipoFound = responseTipo.data.find(
          (e) => e.id === response.data.tipoId
        );

        console.log(response.data);

        // Mapea los datos recibidos del backend al objeto formData
        setFormData({
          id: Number(id),
          marca: brandFound.name, // Convierte brandId a cadena si es necesario
          modelo: response.data.motoModel,
          tipo: tipoFound.name, // Convierte tipoId a cadena si es necesario
          year: response.data.year,
          precio: parseFloat(response.data.precio), // Convierte precio a número decimal si es necesario
          imageUrl: response.data.imageUrl,
          combustible: response.data.combustible,
          stock: response.data.stock,
          fichaTecnica: {
            motor: response.data.fichaTecnica.motor,
            pasajeros: response.data.fichaTecnica.pasajeros,
            cilindrada: response.data.fichaTecnica.cilindrada,
            velocidades: response.data.fichaTecnica.velocidades,
          },
        });

        setCurrentFormData({
          precio: parseFloat(response.data.precio), // Convierte precio a número decimal si es necesario
          stock: response.data.stock,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataEdit_Product();
  }, [id]);

  // Variable para activar el boton de añadir si el formulario es valido
  const [isButtonActive, setIsButtonActive] = useState(true);

  // Variables de validación
  const [isPrecioValid, setIsPrecioValid] = useState(true);
  const [isStockValid, setIsStockValid] = useState(true);

  useLayoutEffect(() => {
    const { precio, stock } = formData;

    // Validación de propiedad precio
    const precioRegex = /^\d[0-9]+$/;
    const validPrecio =
      precioRegex.test(precio) &&
      parseInt(precio) >= 500 &&
      precio !== currentFormData.precio;
    setIsPrecioValid(validPrecio);
    console.log("Precio:", validPrecio, precio);

    // Validación de propiedad stock
    const stockRegex = /^\d[0-9]+$/;
    const validStock =
      stockRegex.test(stock) &&
      parseInt(stock) >= 0 &&
      stock !== currentFormData.stock;
    setIsStockValid(validStock);
    console.log("Stock:", validStock, stock);

    const isNewImageAdded = formData.imageUrl.some(
      (newImage) => !imagePreviews.includes(newImage)
    );

    console.log("Nueva imagen añadida:", isNewImageAdded);

    // Validaciónes de formulario completo
    const isFormDataValid = isPrecioValid || isStockValid || isNewImageAdded;

    console.log("Formulario", isFormDataValid);
    setIsButtonActive(isFormDataValid);
  }, [
    currentFormData.precio,
    currentFormData.stock,
    formData,
    imagePreviews,
    isPrecioValid,
    isStockValid,
  ]);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files); // Convierte FileList a un array

    console.log(files);
    const previews = [];

    for (let i = 0; i < files.length; i++) {
      previews.push(URL.createObjectURL(files[i]));
    }
    console.log(previews);

    // Filtrar las imágenes nuevas
    const newImages = files.filter((file) => {
      return !selectedImages.some(
        (existingImage) => file.name === existingImage.name
      );
    });

    // Agregar las nuevas imágenes al estado de imágenes seleccionadas
    setSelectedImages([...selectedImages, ...newImages]);
    setImagePreviews([...imagePreviews, ...previews]);
  };

  const handleImageUploadCloudinary = async (images) => {
    const cloudName = import.meta.env.VITE_REACT_APP_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env
      .VITE_REACT_APP_CLOUDINARY_UPLOAD_PRESET;
    const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    return new Promise(async (resolve, reject) => {
      // ... (tu lógica para mostrar el diálogo de carga)

      try {
        const imageUrls = [...formData.imageUrl]; // Copia el array de URLs actual

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

        // Actualiza el formData con las nuevas URLs de imagen
        setFormData({ ...formData, imageUrl: imageUrls });

        // ... (tu lógica para ocultar el diálogo de carga)

        resolve(imageUrls);
      } catch (error) {
        // ... (tu manejo de errores)
      }
    });
  };

  const handleSubmiMoto = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "¿Deseas Actualizar esta moto?",
      text: "Al confirmar, se actualizará la moto con los datos proporcionados.",
      icon: "question",
      showCancelButton: true,
      width: 400,
      background: "#FFF9EB",
      color: "#161616",
      confirmButtonColor: "#0250B6",
      cancelButtonColor: "#8D0106",
      confirmButtonText: "ACEPTAR",
      cancelButtonText: "CANCELAR",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const processingDialog = Swal.fire({
            title: "Espere por favor",
            text: "Actualizando la moto...",
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

          if (formData.precio !== currentFormData.precio) {
            const newPrecioData = {
              precio: formData.precio,
            };

            try {
              const response = await axios.put(
                `motos/${formData.id}`,
                newPrecioData,
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              console.log(response);
            } catch (error) {
              console.log(error);
            }
          }

          if (formData.stock !== currentFormData.stock) {
            const newStockData = [
              {
                motoId: formData.id,
                newStock: formData.stock,
              },
            ];

            try {
              const response = await axios.put(`editStock`, newStockData, {
                headers: {
                  "Content-Type": "application/json",
                },
              });

              console.log(response);
            } catch (error) {
              console.log(error);
            }
          }

          // Esperar al menos 3 segundos antes de continuar
          await new Promise((resolve) => setTimeout(resolve, 3000));

          // Cerrar el cuadro de diálogo "Procesando..."
          processingDialog.close();

          await Swal.fire({
            title: "Actualización exitosa",
            text: "La moto se ha actualizado correctamente.",
            icon: "success",
            width: 400,
            color: "#161616",
            background: "#FFF9EB",
            confirmButtonColor: "#0250B6",
            confirmButtonText: "ACEPTAR",
          });
        } catch (error) {
          // console.log(error);
          Swal.fire({
            title: "Error al actualizar la moto",
            text: error.response.data.error,
            icon: "error",
            width: 400,
            color: "#161616",
            background: "#FFF9EB",
          });
        }
      }
    });
  };

  return (
    <div className="min-h-full max-h-full pl-4 pr-1 py-4 justify-center overflow-y-scroll scrollbar-gutter">
      <div className="">
        <div
          className={`w-[full] min-h-full max-h-full border-b border-gray-200 rounded-md overflow-hidden`}
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

        <form className="gap-2 min-w-full h-full">
          {activeTab === "BasicInfo" && (
            <Basic_Info_Product formData={formData} />
          )}
          {activeTab === "DataSheet" && (
            <Data_Sheet_Product formData={formData} />
          )}
          {activeTab === "ImagesColorsStock" && (
            <MediaInventoryManager_Product
              formData={formData}
              setFormData={setFormData}
              isButtonActive={isButtonActive}
              imagePreviews={imagePreviews}
              selectedImages={selectedImages}
              handleImageChange={handleImageChange}
              handleSubmiMoto={handleSubmiMoto}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default Product_Edit;
