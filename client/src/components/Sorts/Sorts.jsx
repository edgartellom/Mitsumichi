import { DropdownMenu } from "..";
import { BsArrowRepeat } from "react-icons/bs";
import {
  setSorts,
  setSelectedSorts,
  resetSorts,
  setCurrentPage,
} from "../../redux/slices/motoListSlice";
import { useDispatch, useSelector } from "react-redux";

const Sorts = () => {
  const brandDirection = ["A - Z", "Z - A"];
  const priceDirection = ["Menor precio", "Mayor precio"];
  const dispatch = useDispatch();
  const { sorts, selectedSorts } = useSelector((state) => state.motoList);

  const handleBrandClick = (direction) => {
    let newSorts = { ...sorts };
    let newSelectedSorts = { ...selectedSorts };
    if (direction === "A - Z") {
      newSorts.sortByBrand = "ASC";
    } else {
      newSorts.sortByBrand = "DESC";
    }
    newSelectedSorts.sortByBrand = direction;
    dispatch(setSelectedSorts(newSelectedSorts));
    dispatch(setSorts(newSorts));
    dispatch(setCurrentPage(1));
  };

  const handlePriceClick = (direction) => {
    let newSorts = { ...sorts };
    let newSelectedSorts = { ...selectedSorts };
    if (direction === "Menor precio") {
      newSorts.sortByPrice = "ASC";
    } else {
      newSorts.sortByPrice = "DESC";
    }
    newSelectedSorts.sortByPrice = direction;
    dispatch(setSelectedSorts(newSelectedSorts));
    dispatch(setSorts(newSorts));
    dispatch(setCurrentPage(1));
  };

  const handleResetSorts = () => {
    dispatch(resetSorts());
    dispatch(setCurrentPage(1));
  };

  return (
    <section className="  flex max-sm:flex-col   gap-3 items-center justify-center">
      <h1 className="text-white ml-3 font-bold">Ordenar por:</h1>
      <DropdownMenu
        name={"Nombre"}
        data={brandDirection}
        selectedValue={selectedSorts.sortByBrand}
        onClick={handleBrandClick}
      />
      <DropdownMenu
        name={"Precio"}
        data={priceDirection}
        selectedValue={selectedSorts.sortByPrice}
        onClick={handlePriceClick}
      />
      <button
        className="text-white text-base max-sm:w-screen"
        onClick={handleResetSorts}
      >
        <BsArrowRepeat />
      </button>
    </section>
  );
};

export default Sorts;
