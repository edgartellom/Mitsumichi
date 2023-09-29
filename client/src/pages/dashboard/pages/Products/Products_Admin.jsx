import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import axios from "axios";

import {
  MdOutlineDeleteForever,
  MdOutlineRestoreFromTrash,
} from "react-icons/md";

import "../styles.css";
import { SearchBar_Dashboard } from "../../components";

const Products_Admin = () => {
  const navigate = useNavigate();

  const [motos, setMotos] = useState([]);
  const [filteredMotos, setFilteredMotos] = useState([]);
  const [showItems, setShowItems] = useState([]);
  const [selectedMotos, setSelectedMotos] = useState([]);

  const [selectAll, setSelectAll] = useState(false);
  const [activeMotos, setActiveMotos] = useState(true);
  // const selectedMotoIds = selectedMotos.map((selectedMoto) => selectedMoto.id);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("motos?page=1&limit=10000");
        setMotos(response.data.data);
        setFilteredMotos(response.data.data); // Inicializa filteredMotos aquí
      } catch (error) {
        console.error("Error al obtener las motos:", error);
      }
    };

    fetchData();
    handleSearch("");
  }, []);

  const totalPages = Math.ceil(filteredMotos.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMotos = filteredMotos.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  const handleMarkMotos = async () => {
    const motosToUpdate = selectedMotos.map((moto) => ({
      id: moto.id,
      deleted: !moto.deleted,
    }));

    const motoStatus = JSON.stringify(motosToUpdate);

    console.log(motoStatus);
    try {
      // Realizar la solicitud PUT al servidor para marcar/desmarcar motos
      await axios.put("moto/marcar-desmarcar", motosToUpdate);

      // Actualizar el estado de las motos en el cliente según la respuesta del servidor
      const updatedMotos = motos.map((moto) => {
        const updatedMoto = motosToUpdate.find(
          (update) => update.id === moto.id
        );
        return updatedMoto ? { ...moto, deleted: !moto.deleted } : moto;
      });

      setMotos(updatedMotos);
      setSelectedMotos([]); // Desmarcar todas las motos después de la operación
    } catch (error) {
      console.error("Error al marcar/desmarcar motos:", error);
    }
  };

  useEffect(() => {
    const handleWindowResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const toggleActiveMotos = () => {
    setActiveMotos(!activeMotos);
  };

  const toggleSelectAll = () => {
    const newState = !selectAll;

    setSelectAll(newState);

    // Filtrar las motos según el estado activo/inactivo
    const filteredMotos = motos.filter((moto) => moto.deleted === !activeMotos);

    setSelectedMotos(newState ? filteredMotos : []);
  };

  // Función para marcar/desmarcar motos
  const toggleSelectMoto = (moto) => {
    const motoId = moto?.id;
    const isSelected = selectedMotos.some(
      (selectedMoto) => selectedMoto?.id === motoId
    );

    // Crear una copia actualizada de las motos seleccionadas
    let updatedSelectedMotos;

    if (!isSelected) {
      // Si la moto no está seleccionada, agrégala
      updatedSelectedMotos = [...selectedMotos, moto];
    } else {
      // Si la moto ya está seleccionada, desmárcala
      updatedSelectedMotos = selectedMotos.filter(
        (selectedMoto) => selectedMoto.id !== motoId
      );
    }

    setSelectedMotos(updatedSelectedMotos);
  };

  useEffect(() => {
    // Retardar la aparición de elementos para crear la animación de cascada
    if (motos.length > 0) {
      const animationDelay = 30; // Ajusta la velocidad de la animación
      motos.forEach((_, index) => {
        setTimeout(() => {
          setShowItems((prevShowItems) => [...prevShowItems, index]);
        }, animationDelay * index);
      });
    }
  }, [motos]);

  const handleSearch = (searchQuery) => {
    const searchText = searchQuery.toLowerCase();
    const filteredMotos = motos.filter((moto) => {
      const motoId = moto.id ? moto?.id.toString().toLowerCase() : "";
      return (
        motoId.includes(searchText) ||
        (moto?.motoModel &&
          moto?.motoModel.toLowerCase().includes(searchText)) ||
        (moto?.brand &&
          moto?.brand?.name &&
          moto?.brand?.name.toLowerCase().includes(searchText)) ||
        (moto?.tipo &&
          moto?.tipo?.name &&
          moto?.tipo?.name.toLowerCase().includes(searchText))
      );
    });

    // Establece filteredMotos en todas las motos si la búsqueda está vacía
    setFilteredMotos(searchQuery === "" ? motos : filteredMotos);
  };

  return (
    <div className="min-h-full pl-4 pr-1 py-4 justify-center overflow-y-scroll scrollbar-gutter relative">
      {selectedMotos.length > 0 && (
        <button
          className="absolute duration-200 top-4 right-2 bg-[#303030] font-bold rounded-lg shadow-sm hover:shadow-sm shadow-[#202020] hover:text-gray-900 hover:bg-[#252525] cursor-pointer"
          onClick={handleMarkMotos}
        >
          <div
            className={`flex flex-row py-2 pr-2 items-center justify-between h-8 text-white ${
              selectedMotos.some((moto) => moto?.deleted)
                ? "hover:text-green-500"
                : "hover:text-red-600"
            } `}
          >
            {selectedMotos.some((moto) => moto?.deleted) ? (
              <>
                <MdOutlineRestoreFromTrash size={30} />
                <span className="">RESTORE</span>
              </>
            ) : (
              <>
                <MdOutlineDeleteForever size={30} />
                <span className="">REMOVE</span>
              </>
            )}
          </div>
        </button>
      )}
      <div className="absolute toggle-button-cover p-4 top-0 left-2 scale-95">
        <div id="button-3" className="button r border-4 border-[#252525]">
          <input
            className="checkbox"
            type="checkbox"
            onChange={toggleActiveMotos}
            checked={!activeMotos}
          />
          <div className="knobs"></div>
          <div className="layer"></div>
        </div>
        <h1 className="text-[#c63d05] text-[16px] font-semibold">
          Select Status
        </h1>
      </div>
      <h1 className="pb-2 -pt-2 text-3xl text-center font-bold text-[#c63d05] uppercase">
        Lista de Productos
      </h1>
      <table
        className={`w-full rounded-md shadow-sm shadow-[#252525] overflow-hidden`}
      >
        <thead
          className={`h-[40px] bg-[#C63D05] text-white ${
            screenWidth >= 1220 ? "text-2xl" : "text-lg"
          }`}
        >
          {currentMotos.length === 0 ? null : (
            <tr className="">
              <th
                className={`w-1/8 text-center pt-1 ${
                  screenWidth <= 768 ? "pl-2" : "pl-1"
                }`}
              >
                <div className="flex justify-center font-bold text-center relative">
                  <label className="flex container items-center justify-center">
                    <input
                      type="checkbox"
                      onChange={toggleSelectAll}
                      checked={selectAll}
                    />
                    <div className="checkmark"></div>
                  </label>
                </div>
              </th>
              {screenWidth >= 900 && (
                <th className="text-center w-1/8 font-bold ml-1 text-with-text-shadow">
                  ID
                </th>
              )}
              {screenWidth >= 768 && (
                <th className="text-center w-1/8 font-bold text-with-text-shadow">
                  IMAGEN
                </th>
              )}

              <th className="text-center w-1/8 font-bold text-with-text-shadow">
                DESCRIPCIÓN
              </th>
              {screenWidth >= 900 && (
                <th className="text-center w-1/8 font-bold text-with-text-shadow">
                  CATEGORIA
                </th>
              )}

              <th className="text-center w-1/8 font-bold text-with-text-shadow">
                {" "}
                {screenWidth >= 400 ? "CANTIDAD" : "QTY"}
              </th>

              <th className="text-center w-1/8 font-bold text-with-text-shadow">
                PRECIO
              </th>
              {screenWidth >= 1220 && (
                <th className="text-center w-1/8 font-bold mr-1 text-with-text-shadow">
                  ESTADO
                </th>
              )}
            </tr>
          )}
        </thead>
        {currentMotos.length === 0 ? (
          <h1 className="p-4 uppercase text-center text-red-600 font-semibold">
            No hay productos con esta DESCRIPCIÓN
          </h1>
        ) : (
          <tbody
            className={`bg-white duration-300 ${
              screenWidth >= 1220 ? "" : "duration-300 text-[14px]"
            }`}
          >
            {currentMotos.map((moto, index) => (
              <tr
                className={`hover:text-blue-400 h-[75px] ${
                  showItems.includes(index)
                    ? "duration-200 opacity-100 translate-y-0"
                    : "duration-200 opacity-0 translate-y-10"
                }`}
                key={moto?.id}
              >
                <td
                  className={`text-center w-1/8 ${
                    screenWidth <= 768 ? "pl-2" : "pl-1"
                  }`}
                >
                  <label className="flex container items-center justify-center">
                    <input
                      type="checkbox"
                      onChange={() => toggleSelectMoto(moto)}
                      checked={selectedMotos.includes(moto)}
                    />
                    <div className="checkmarklist"></div>
                  </label>
                  {/* <input
                  type="checkbox"
                  className="w-4 h-4 ml-1"
                  onChange={() => toggleSelectMoto(moto)}
                  checked={selectedMotos.includes(moto)}
                /> */}
                </td>
                {screenWidth >= 900 && (
                  <td className="text-center w-1/8 font-bold ml-1">
                    {moto?.id}
                  </td>
                )}
                {screenWidth >= 768 && (
                  <td
                    className="text-center w-1/8"
                    onClick={() => navigate(`${moto.id}`)}
                  >
                    {moto?.imageUrl[0] ? (
                      <img
                        src={moto?.imageUrl[0]}
                        alt="Moto"
                        className="mx-auto h-[75px] duration-200 hover:scale-[0.95]"
                      />
                    ) : (
                      <div
                        className="w-[100px] h-[100px] bg-gray-300 animate-pulse"
                        style={{ aspectRatio: "1/1" }} // Asegura la misma proporción
                      ></div>
                    )}
                  </td>
                )}
                <td
                  className="text-center w-1/8 font-bold uppercase hover:text-[#C63D05] cursor-pointer"
                  onClick={() => navigate(`${moto?.id}`)}
                >
                  {moto?.brand?.name} - {moto?.motoModel}
                </td>
                {screenWidth >= 900 && (
                  <td className="text-center w-1/8 font-bold uppercase">
                    {moto?.tipo?.name}
                  </td>
                )}
                <td className="text-center w-1/8 font-bold">
                  {moto?.stock ? moto?.stock : 0} {screenWidth >= 400 && "Unds"}
                </td>
                <td className="text-center w-1/8 font-bold text-blue-600 mr-1">
                  {parseFloat(moto?.precio).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2,
                  })}
                </td>
                {screenWidth >= 1220 && (
                  <td
                    className={`text-center w-1/8 font-bold uppercase ${
                      moto?.deleted ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {moto?.deleted ? "Inactivo" : "Activo"}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        )}
      </table>
      <div className="flex flex-row justify-between">
        <section className="flex w-[30%]">
          <SearchBar_Dashboard handleSearch={handleSearch} />
        </section>
        <section className=" w-[70%]">
          <Pagination
            totalPages={totalPages}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        </section>
      </div>
    </div>
  );
};

export default Products_Admin;
