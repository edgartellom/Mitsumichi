import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const SearchBar_Dashboard = ({ handleSearch }) => {
  const location = useLocation(); // Obtiene la ruta actual
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (e) => {
    const newSearch = e.target.value;
    setSearchQuery(newSearch);
    handleSearch(newSearch);
  };

  return (
    <div className="flex w-full mt-4">
      <input
        type="text"
        placeholder={`Buscar por ${
          location.pathname === "/dashboard/products-admin"
            ? "marca, modelo o categoria"
            : location.pathname === "/dashboard/users-admin"
            ? "nombre, apellido o email"
            : location.pathname === "/dashboard/orders-admin"
            ? "numero de orden, cliente"
            : "cliente, marca o modelo"
        }`}
        value={searchQuery}
        onChange={handleSearchInputChange}
        className="w-full border-2 border-[#C63D05] rounded-md p-2 text-xl text-[#C63D05] outline-none"
      />
    </div>
  );
};

export default SearchBar_Dashboard;
