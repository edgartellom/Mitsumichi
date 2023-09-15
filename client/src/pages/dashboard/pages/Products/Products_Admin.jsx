import React, { useEffect, useState } from "react";
import axios from "axios";

const Products_Admin = () => {
  const [motos, setMotos] = useState([]);
  const [selectedMotos, setSelectedMotos] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const selectedMotoIds = selectedMotos.map((selectedMoto) => selectedMoto.id);

  console.log(selectedMotoIds);

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

  return (
    <div className="min-h-full bg-slate-100 p-4">
      <h1>Administrador de Productos</h1>
      <table className="w-full border-2 shadow-sm">
        <thead className="h-[40px] bg-[#C63D05] text-white text-xl">
          <tr>
            <th className="text-center w-1/8">
              <input
                type="checkbox"
                onChange={toggleSelectAll}
                checked={selectAll}
              />
            </th>
            <th className="text-center w-1/8 font-bold">ID</th>
            <th className="text-center w-1/8 font-bold">IMAGEN</th>
            <th className="text-center w-1/8 font-bold">DESCRIPCIÓN</th>
            <th className="text-center w-1/8 font-bold">CATEGORIÍA</th>
            <th className="text-center w-1/8 font-bold">CANTIDAD</th>
            <th className="text-center w-1/8 font-bold">PRECIO</th>
            <th className="text-center w-1/8 font-bold">STATUS</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {motos.map((moto) => (
            <tr className="hover:text-blue-500 h-[75px]" key={moto.id}>
              <td className="text-center w-1/8">
                <input
                  type="checkbox"
                  onChange={() => toggleSelectMoto(moto)}
                  checked={selectedMotos.includes(moto)}
                />
              </td>
              <td className="text-center w-1/8 font-bold">{moto.id}</td>
              <td className="text-center w-1/8">
                <img
                  src={moto.imageUrl[0]}
                  alt="Moto"
                  width="100"
                  className="mx-auto"
                />
              </td>
              <td className="text-center w-1/8 font-bold uppercase">
                {moto.brand.name} - {moto.motoModel}
              </td>
              <td className="text-center w-1/8 font-bold">{moto.tipo.name}</td>
              <td className="text-center w-1/8 font-bold">{moto.stock}</td>
              <td className="text-center w-1/8 font-bold">{moto.precio}</td>
              <td className="text-center w-1/8 font-bold">
                {moto.deleted ? "Inactivo" : "Activo"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products_Admin;
