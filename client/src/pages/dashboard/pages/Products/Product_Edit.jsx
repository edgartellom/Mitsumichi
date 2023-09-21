import React, { useState, useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Basic_Info_Product,
  Data_Sheet_Product,
  MediaInventoryManager_Product,
} from "../../components";

const Product_Edit = () => {
  const [activeTab, setActiveTab] = useState("BasicInfo");
  const { id } = useParams();

  const [formData, setFormData] = useState({
    marca: "YAMAHA",
    modelo: "YB-125",
    tipo: "CUTER",
    year: 2020,
    precio: 3600,
    imageUrl: [],
    combustible: "NAFTRA",
    colorDisponible: ["Rojo", "Blue"],
    fichaTecnica: {
      motor: "4 Tiempos",
      pasajeros: "3",
      cilindrada: "266",
      velocidades: "6 Velocidades",
    },
  });

  useEffect(() => {
    const fetchDataEdit_Product = async () => {};

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
