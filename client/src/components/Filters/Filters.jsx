import React, { useState, useEffect } from "react";
import { DropdownMenu } from "..";
import Button from "../UI/Button";

const MIN_PRICE = 0;
const MAX_PRICE = 60000;
const MIN_YEAR = 2010;
const MAX_YEAR = new Date().getFullYear();
const Filters = ({ marcas, tipos, filters, onFilterChange }) => {
  const [selectedType, setSelectedType] = useState(filters.type || "");
  const [selectedBrand, setSelectedBrand] = useState(filters.brand || "");
  const [selectedPriceRange, setSelectedPriceRange] = useState(
    filters.priceRange || [MIN_PRICE, MAX_PRICE]
  );
  const [selectedYearRange, setSelectedYearRange] = useState(
    filters.yearRange || [MIN_YEAR, MAX_YEAR]
  );

  useEffect(() => {
    // Call the parent component's filter change handler with the updated filters
    onFilterChange({
      brand: selectedBrand,
      type: selectedType,
      priceRange: selectedPriceRange,
      yearRange: selectedYearRange,
    });
  }, [selectedBrand, selectedType, selectedYearRange, selectedPriceRange]);

  const handleBrandClick = (e) => {
    console.log(e.target.value);
    setSelectedBrand(e.target.value);
  };

  const handleTypeClick = (e) => {
    setSelectedType(e.target.value);
  };

  const handlePriceRangeChange = (newValues) => {
    setSelectedPriceRange(newValues);
  };

  const handleYearRangeChange = (newValues) => {
    setSelectedYearRange(newValues);
  };

  const resetFilters = () => {
    setSelectedBrand("");
    setSelectedType("");
    setSelectedPriceRange([MIN_PRICE, MAX_PRICE]);
    setSelectedYearRange([MIN_YEAR, MAX_YEAR]);
    onFilterChange({
      brand: "",
      type: "",
      priceRange: [MIN_PRICE, MAX_PRICE],
      yearRange: [MIN_YEAR, MAX_YEAR],
    });
  };

  return (
    <div className="  flex max-sm:flex-col   gap-3 items-center justify-center">
      <h1 className="text-white ml-3 font-bold">Filtros:</h1>
      <DropdownMenu
        name={"Marca"}
        data={marcas}
        value={selectedBrand}
        onClick={handleBrandClick}
      />
      <DropdownMenu
        name={"Tipo"}
        data={tipos}
        value={selectedType}
        onClick={handleTypeClick}
      />
      <Button
        text={"Reset filters"}
        className="text-white text-base max-sm:w-screen"
        onClick={resetFilters}
      ></Button>

      {/* <DropdownMenu name={"Rango Precio"} />
      <DropdownMenu name={"Rango Año"} /> */}
    </div>
  );
};

export default Filters;
