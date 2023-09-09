import { DropdownMenu } from "..";
import { BsArrowRepeat } from "react-icons/bs";
import {
  setFilters,
  resetFilters,
  setCurrentPage,
} from "../../redux/slices/motoListSlice";
import { useDispatch, useSelector } from "react-redux";
// import NewSlider from "../UI/NewSlider";

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

  const handlePriceRangeChange = (newValues) => {
    dispatch(
      setFilters({ ...filters, minPrice: newValues[0], maxPrice: newValues[1] })
    );
    dispatch(setCurrentPage(1));
  };

  const handleYearRangeChange = (newValues) => {
    dispatch(
      setFilters({ ...filters, minYear: newValues[0], maxYear: newValues[1] })
    );
    dispatch(setCurrentPage(1));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
    dispatch(setCurrentPage(1));
  };

  return (
    <div className="  flex max-sm:flex-col max-md:hidden   gap-3 items-center justify-center">
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
      {/* <NewSlider
        name={"Rango Precio"}
        min={filters.minPrice}
        max={filters.maxPrice}
        value={[filters.minPrice, filters.maxPrice]}
        onChange={handlePriceRangeChange}
      />
      <NewSlider
        name={"Rango Año"}
        min={filters.minYear}
        max={filters.maxYear}
        value={[filters.minYear, filters.maxYear]}
        onChange={handleYearRangeChange}
      /> */}

      <button
        className="text-white text-base max-sm:w-screen"
        onClick={handleResetFilters}
      >
        <BsArrowRepeat />
      </button>
    </div>
  );
};

export default Filters;
