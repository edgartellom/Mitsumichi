import { DropdownMenu } from "..";
import { BsArrowRepeat } from "react-icons/bs";
import {
  setSorts,
  resetSorts,
  setCurrentPage,
} from "../../redux/slices/motoListSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const Sorts = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const brandDirection = ["A-Z", "Z-A"];
  const priceDirection = ["Menor a Mayor", "Mayor a Menor"];
  const dispatch = useDispatch();
  const { sorts } = useSelector((state) => state.motoList);

  const handleBrandClick = (direction) => {
    console.log(direction);
    let newSorts = { ...sorts };
    if (direction === "A-Z") {
      newSorts.sortByBrand = "ASC";
    } else {
      newSorts.sortByBrand = "DESC";
    }
    dispatch(setSorts(newSorts));
    dispatch(setCurrentPage(1));
  };

  const handlePriceClick = (direction) => {
    console.log(direction);
    let newSorts = { ...sorts };
    if (direction === "Menor a Mayor") {
      newSorts.sortByPrice = "ASC";
    } else {
      newSorts.sortByPrice = "DESC";
    }
    dispatch(setSorts(newSorts));
    dispatch(setCurrentPage(1));
  };

  const handleResetSorts = () => {
    setSelectedBrand(null);
    setSelectedPrice(null);
    dispatch(resetSorts());
    dispatch(setCurrentPage(1));
  };

  return (
    <div className="  flex max-sm:flex-col   gap-3 items-center justify-center">
      <h1 className="text-white ml-3 font-bold">Ordenar por:</h1>
      <DropdownMenu
        name={"Marca"}
        data={brandDirection}
        selectedValue={selectedBrand}
        onClick={handleBrandClick}
      />
      <DropdownMenu
        name={"Precio"}
        data={priceDirection}
        selectedValue={selectedPrice}
        onClick={handlePriceClick}
      />
      <button
        className="text-white text-base max-sm:w-screen"
        onClick={handleResetSorts}
      >
        <BsArrowRepeat />
      </button>
    </div>
  );
};

export default Sorts;
