import React, { useState } from "react";

const SearchBar_Dashboard = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (e) => {
    const newSearch = e.target.value;
    setSearchQuery(newSearch);
    onSearch(newSearch);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Buscar..."
        value={searchQuery}
        onChange={handleSearchInputChange}
        className="w-full border border-gray-300 rounded-md p-2"
      />
    </div>
  );
};

export default SearchBar_Dashboard;
