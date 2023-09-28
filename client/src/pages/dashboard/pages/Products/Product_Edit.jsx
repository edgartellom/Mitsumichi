import React, { useState, useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import {
  Basic_Info_Product,
  Data_Sheet_Product,
  MediaInventoryManager_Product,
} from "../../components";

const Product_Edit = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("BasicInfo");

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
          marca: brandFound.name, // Convierte brandId a cadena si es necesario
          modelo: response.data.motoModel,
          tipo: tipoFound.name, // Convierte tipoId a cadena si es necesario
          year: response.data.year,
          precio: parseFloat(response.data.precio), // Convierte precio a número decimal si es necesario
          imageUrl: response.data.imageUrl,
          combustible: response.data.combustible,
          //colorDisponible: [], // Debes proporcionar datos para esta propiedad si corresponde
          fichaTecnica: {
            motor: response.data.fichaTecnica.motor,
            pasajeros: response.data.fichaTecnica.pasajeros,
            cilindrada: response.data.fichaTecnica.cilindrada,
            velocidades: response.data.fichaTecnica.velocidades,
          },
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataEdit_Product();
  }, [id]);

  useLayoutEffect(() => {});

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
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
            <MediaInventoryManager_Product formData={formData} />
          )}
        </form>
      </div>
    </div>
  );
};

export default Product_Edit;
