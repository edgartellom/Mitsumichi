import { DropdownMenu } from "..";
import { BsArrowRepeat } from "react-icons/bs";
import {
  setFilters,
  resetFilters,
  setCurrentPage,
} from "../../redux/slices/motoListSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const Filters = ({ marcas, tipos }) => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.motoList);

  const handleBrandClick = (brand) => {
    dispatch(setFilters({ ...filters, brand }));
    dispatch(setCurrentPage(1));
  };

  const handleTypeClick = (tipo) => {
    dispatch(setFilters({ ...filters, tipo }));
    dispatch(setCurrentPage(1));
  };

  // const handlePriceRangeChange = (newValues) => {};

  // const handleYearRangeChange = (newValues) => {
  //   dispatch({ type: "SET_YEAR_RANGE", payload: newValues });
  // };

  const handleResetFilters = () => {
    dispatch(resetFilters());
    dispatch(setCurrentPage(1));
  };

  return (
    <div className="  flex max-sm:flex-col   gap-3 items-center justify-center">
      <h1 className="text-white ml-3 font-bold">Filtros:</h1>
      <DropdownMenu
        name={"Marca"}
        data={marcas}
        selectedValue={filters.brand}
        onClick={handleBrandClick}
      />
      <DropdownMenu
        name={"Tipo"}
        data={tipos}
        selectedValue={filters.tipo}
        onClick={handleTypeClick}
      />
      <button
        className="text-white text-base max-sm:w-screen"
        onClick={handleResetFilters}
      >
        <BsArrowRepeat />
      </button>

      {/* <DropdownMenu name={"Rango Precio"} />
      <DropdownMenu name={"Rango Año"} /> */}
    </div>
  );
};

export default Filters;
