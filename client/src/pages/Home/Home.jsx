import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMotos,
  setFilters,
  setCurrentPage,
  setSorts,
  resetFilters,
  resetSorts,
} from "../../redux/slices/motoListSlice";
import { fetchBrands } from "../../redux/slices/brandListSlice";
import axios from "axios";
import videoHome from "../../assets/video.mp4";
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
          marcas={brands}
          tipos={tipos}
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
