import React, { useState } from "react";
import { setSearch, setCurrentPage } from "../../redux/slices/motoListSlice";
import { useSelector, useDispatch } from "react-redux";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState(""); // Estado local para el término de búsqueda

  const handleInputChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    handleSearch(newSearchTerm); // Llamar a handleSearch con el nuevo término de búsqueda
  };

  const handleSearch = (searchQuery) => {
    dispatch(setCurrentPage(1));
    dispatch(setSearch(searchQuery));
  };

  return (
    <div className="pl-3 relative flex w-4/12 flex-wrap items-stretch">
      <input
        type="search"
        className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="button-addon1"
        onChange={handleInputChange} // Llamar a handleInputChange en el evento onChange
        value={searchTerm} // Establecer el valor del input para que refleje el estado local
      />

      {/* El botón de búsqueda ya no es necesario */}
    </div>
  );
};

export default SearchBar;