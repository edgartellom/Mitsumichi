import React, { useState, useReducer, useEffect } from "react";
import { DropdownMenu } from "..";
import { BsArrowRepeat } from "react-icons/bs";
import { setFilters, resetFilters } from "../../redux/slices/motoListSlice";
import { useDispatch, useSelector } from "react-redux";

const Filters = ({ marcas, tipos }) => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.motoList);
  // const [selectedBrand, setSelectedBrand] = useState("");
  // const [selectedType, setSelectedType] = useState("");

  const handleBrandClick = (brand) => {
    console.log(brand);
    dispatch(setFilters({ ...filters, brand }));
    setSelectedBrand(brand);
  };

  const handleTypeClick = (tipo) => {
    console.log(tipo);
    dispatch(setFilters({ ...filters, tipo }));
    setSelectedType(tipo);
  };

  // const handlePriceRangeChange = (newValues) => {};

  // const handleYearRangeChange = (newValues) => {
  //   dispatch({ type: "SET_YEAR_RANGE", payload: newValues });
  // };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="  flex max-sm:flex-col   gap-3 items-center justify-center">
      <h1 className="text-white ml-3 font-bold">Filtros:</h1>
      <DropdownMenu
        name={"Marca"}
        data={marcas}
        // value={selectedBrand}
        onClick={handleBrandClick}
      />
      <DropdownMenu
        name={"Tipo"}
        data={tipos}
        // value={selectedType}
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
