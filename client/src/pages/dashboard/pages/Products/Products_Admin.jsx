import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import SearchBar from "../../SearchBar/SearchBar";

import {
  MdOutlineDeleteForever,
  MdOutlineRestoreFromTrash,
} from "react-icons/md";

import "../styles.css";

const Products_Admin = () => {
  const navigate = useNavigate();

  const [motos, setMotos] = useState([]);
  const [showItems, setShowItems] = useState([]);
  const [selectedMotos, setSelectedMotos] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [filteredMotos, setFilteredMotos] = useState([]);

  const selectedMotoIds = selectedMotos.map((selectedMoto) => selectedMoto.id);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/motos?page=1&limit=10000"
        );

        setMotos(response.data.data);
      } catch (error) {
        console.error("Error al obtener las motos:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleWindowResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedMotos(selectAll ? [] : [...motos]);
  };

  const toggleSelectMoto = (moto) => {
    const motoId = moto?.id;
    const isSelected = selectedMotos.some(
      (selectedMoto) => selectedMoto?.id === motoId
    );

    if (isSelected) {
      setSelectedMotos((prevSelected) =>
        prevSelected.filter((selectedMoto) => selectedMoto?.id !== motoId)
      );
    } else {
      setSelectedMotos((prevSelected) => [...prevSelected, moto]);
    }
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
      const motoId = moto.id ? moto.id.toString().toLowerCase() : "";
      return (
        motoId.includes(searchText) ||
        (moto.motoModel && moto.motoModel.toLowerCase().includes(searchText)) ||
        (moto.brand &&
          moto.brand.name &&
          moto.brand.name.toLowerCase().includes(searchText)) ||
        (moto.tipo &&
          moto.tipo.name &&
          moto.tipo.name.toLowerCase().includes(searchText))
      );
    });
    setFilteredMotos(filteredMotos);
  };

  console.log(screenWidth);

  return (
    <div className="min-h-full pl-4 pr-1 py-4 justify-center overflow-y-scroll scrollbar-gutter relative">
      {selectedMotos.length > 0 && (
        <button
          className="absolute duration-200 top-4 right-2 bg-[#303030] font-bold rounded-lg shadow-sm hover:shadow-sm shadow-[#202020] hover:text-gray-900 hover:bg-[#252525] cursor-pointer"
          onClick={""}
        >
          <div className="flex flex-row py-2 pr-2 items-center justify-between h-8 text-white hover:text-red-600 ">
            <MdOutlineRestoreFromTrash size={30} />
            <span className="">REMOVE</span>
          </div>
        </button>
      )}
      <h1 className="pb-2 -pt-2 text-2xl font-bold text-[#c63d05] uppercase">
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
          <tr className="">
            <th
              className={`w-1/8 text-center pt-1 ${
                screenWidth <= 768 ? "pl-2" : "pl-1"
              }`}
            >
              <label className="flex container items-center justify-center">
                <input
                  type="checkbox"
                  onChange={toggleSelectAll}
                  checked={selectAll}
                />
                <div className="checkmark"></div>
              </label>
              {/* <input
                type="checkbox"
                className="w-5 h-5 ml-1 mx-auto"
                onChange={toggleSelectAll}
                checked={selectAll}
              /> */}
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
        </thead>
        <tbody
          className={`bg-white duration-300 ${
            screenWidth >= 1220 ? "" : "duration-300 text-[14px]"
          }`}
        >
          {motos.map((moto, index) => (
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
                <td className="text-center w-1/8 font-bold ml-1">{moto?.id}</td>
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
                      className="mx-auto w-[100px] duration-200 hover:scale-[0.95]"
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
                onClick={() => navigate(`${moto.id}`)}
              >
                {moto?.brand?.name} - {moto?.motoModel}
              </td>
              {screenWidth >= 900 && (
                <td className="text-center w-1/8 font-bold uppercase">
                  {moto?.tipo?.name}
                </td>
              )}
              <td className="text-center w-1/8 font-bold">
                {moto?.stock} {screenWidth >= 400 && "Unds"}
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
      </table>
    </div>
  );
};

export default Products_Admin;
