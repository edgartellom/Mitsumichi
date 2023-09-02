import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMotos,
  setFilters,
  setCurrentPage,
} from "../../redux/slices/motoListSlice";
import { fetchBrands } from "../../redux/slices/brandListSlice";
import {
  Cards,
  Filters,
  Paginated,
  LoadingSpinner,
  AddButton,
} from "../../components";

// let limit = 6;
const Home = () => {
  const dispatch = useDispatch();
  const { motos, tipos, isLoading, filters, currentPage, totalPages } =
    useSelector((state) => state.motoList);
  const { brands } = useSelector((state) => state.brandList);

  useEffect(() => {
    dispatch(fetchMotos());
    dispatch(fetchBrands());
  }, [dispatch, currentPage, filters]);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters));
    dispatch(fetchMotos());
    dispatch(setCurrentPage(1));
  };

  return (
    <div>
      <section className="pt-1 pb-3 bg-[#000000cc] flex flex-col ">
        <Filters
          marcas={brands}
          tipos={tipos}
          onFilterChange={handleFilterChange}
        />
      </section>
      <Cards data={motos} />
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
