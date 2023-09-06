import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMotos, setCurrentPage } from "../../redux/slices/motoListSlice";
import { fetchBrands } from "../../redux/slices/brandListSlice";
import { Cards, Filters, Paginated, AddButton, Sorts } from "../../components";

const Home = () => {
  const dispatch = useDispatch();
  const { motos, tipos, isLoading, filters, sorts, currentPage, totalPages } =
    useSelector((state) => state.motoList);
  const { brands } = useSelector((state) => state.brandList);

  useEffect(() => {
    dispatch(fetchMotos(6));
    dispatch(fetchBrands());
  }, [dispatch, currentPage, filters, sorts]);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <>
      <section className="p-3 bg-[#000000cc]  flex justify-around max-md:flex-col">
        <Filters marcas={brands} tipos={tipos} />
        <Sorts />
      </section>

      <Cards data={motos} />
      <Paginated
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <AddButton />
    </>
  );
};

export default Home;
