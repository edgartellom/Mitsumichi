import React, { useEffect, useState } from "react";
import axios from "axios";
import videoHome from "../../assets/video.mp4";
import {
  Cards,
  Filters,
  Paginated,
  LoadingSpinner,
  AddButton,
} from "../../components";

const URL = import.meta.env.VITE_REACT_APP_URL_BACKEND;
const limit = 6;
const MIN_PRICE = 0;
const MAX_PRICE = 60000;
const MIN_YEAR = 2010;
const MAX_YEAR = new Date().getFullYear();

const Home = () => {
  const [motos, setMotos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedType, setSelectedType] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState([
    MIN_PRICE,
    MAX_PRICE,
  ]);
  const [selectedYearRange, setSelectedYearRange] = useState([
    MIN_YEAR,
    MAX_YEAR,
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    try {
      const response = await axios(
        `/motos?page=${currentPage}&limit=${limit}&brand=${selectedBrand}&tipo=${selectedType}&minPrice=${selectedPriceRange[0]}&maxPrice=${selectedPriceRange[1]}&minYear=${selectedYearRange[0]}&maxYear=${selectedYearRange[1]}`
      );

      const jsonData = await response.data;
      const tipos = [...new Set(jsonData.data.map((moto) => moto.tipo))];
      setTotalPages(jsonData.totalPages);

      if (Array.isArray(jsonData.data)) {
        setMotos(jsonData.data);
        setTipos(tipos);
      } else {
        console.log("API response is not an array:", jsonData.data);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await axios("/marcas");
      const jsonData = response.data;

      if (Array.isArray(jsonData)) {
        const marcas = jsonData.map((marca) => marca.name);
        setMarcas(marcas);
      } else {
        console.log("API response is not an array:", jsonData);
      }
    } catch (error) {
      console.log("Error fetching brands:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchBrands();
  }, [
    currentPage,
    selectedBrand,
    selectedType,
    selectedPriceRange,
    selectedYearRange,
  ]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (newFilters) => {
    setSelectedBrand(newFilters.brand);
    setSelectedType(newFilters.type);
    setSelectedPriceRange(newFilters.priceRange);
    setSelectedYearRange(newFilters.yearRange);
    setCurrentPage(1);
  };

  return (
    <div className=" ">
      {/* <video
        autoPlay
        muted
        loop
        src={videoHome}
        className=" max-sm:hidden"
      ></video> */}

      <section className="pt-1 pb-3 bg-[#000000cc] flex flex-col w-screen">
        <Filters
          marcas={marcas}
          tipos={tipos}
          filters={{
            brand: selectedBrand,
            type: selectedType,
            priceRange: selectedPriceRange,
            yearRange: selectedYearRange,
          }}
          onFilterChange={handleFilterChange}
        />
      </section>
      {isLoading ? <LoadingSpinner /> : <Cards data={motos} />}
      <Paginated
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <AddButton />
    </div>
  );
};

export default Home;
