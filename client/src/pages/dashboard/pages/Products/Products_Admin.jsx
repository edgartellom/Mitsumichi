import React, { useEffect, useState } from "react";
import axios from "axios";

const Products_Admin = () => {
  const [motos, setMotos] = useState([]);
  const [selectedMotos, setSelectedMotos] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
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
    const motoId = moto.id;
    const isSelected = selectedMotos.some(
      (selectedMoto) => selectedMoto.id === motoId
    );

    if (isSelected) {
      setSelectedMotos((prevSelected) =>
        prevSelected.filter((selectedMoto) => selectedMoto.id !== motoId)
      );
    } else {
      setSelectedMotos((prevSelected) => [...prevSelected, moto]);
    }
  };

  console.log(screenWidth);
  return (
    <div className="min-h-full bg-slate-100 p-4">
      <h1>Administrador de Productos</h1>
      <table className={`w-full border-2 shadow-sm duration-300`}>
        <thead
          className={`h-[40px] bg-[#C63D05] text-white ${
            screenWidth >= 1220 ? "text-2xl" : "text-lg"
          }`}
        >
          <tr className="">
            <th className="w-1/8 text-center pt-2">
              <input
                type="checkbox"
                className="w-5 h-5 ml-1 mx-auto"
                onChange={toggleSelectAll}
                checked={selectAll}
              />
            </th>
            {screenWidth >= 900 && (
              <th className="text-center w-1/8 font-bold ml-1">ID</th>
            )}
            {screenWidth >= 768 && (
              <th className="text-center w-1/8 font-bold">IMAGEN</th>
            )}

            <th className="text-center w-1/8 font-bold">DESCRIPCIÓN</th>
            {screenWidth >= 900 && (
              <th className="text-center w-1/8 font-bold">CATEGORIA</th>
            )}

            <th className="text-center w-1/8 font-bold">
              {" "}
              {screenWidth >= 400 ? "CANTIDAD" : "QTY"}
            </th>

            <th className="text-center w-1/8 font-bold">PRECIO</th>
            {screenWidth >= 1220 && (
              <th className="text-center w-1/8 font-bold mr-1">ESTADO</th>
            )}
          </tr>
        </thead>
        <tbody
          className={`bg-white duration-300 ${
            screenWidth >= 1220 ? "" : "duration-300 text-[14px]"
          }`}
        >
          {motos.map((moto) => (
            <tr className="hover:text-blue-400 h-[75px]" key={moto.id}>
              <td className="text-center w-1/8">
                <input
                  type="checkbox"
                  className="w-4 h-4 ml-1"
                  onChange={() => toggleSelectMoto(moto)}
                  checked={selectedMotos.includes(moto)}
                />
              </td>
              {screenWidth >= 900 && (
                <td className="text-center w-1/8 font-bold ml-1">{moto.id}</td>
              )}
              {screenWidth >= 768 && (
                <td className="text-center w-1/8">
                  <img
                    src={moto.imageUrl[0]}
                    alt="Moto"
                    width="100"
                    className="mx-auto"
                  />
                </td>
              )}
              <td className="text-center w-1/8 font-bold uppercase hover:text-[#C63D05] cursor-pointer">
                {moto.brand.name} - {moto.motoModel}
              </td>
              {screenWidth >= 900 && (
                <td className="text-center w-1/8 font-bold uppercase">
                  {moto.tipo.name}
                </td>
              )}
              <td className="text-center w-1/8 font-bold">
                {moto.stock} {screenWidth >= 400 && "Unds"}
              </td>
              <td className="text-center w-1/8 font-bold text-blue-600 mr-1">
                {parseFloat(moto.precio).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                })}
              </td>
              {screenWidth >= 1220 && (
                <td
                  className={`text-center w-1/8 font-bold uppercase ${
                    moto.deleted ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {moto.deleted ? "Inactivo" : "Activo"}
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
