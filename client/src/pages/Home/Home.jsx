import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMotos, setCurrentPage } from "../../redux/slices/motoListSlice";
import { fetchBrands } from "../../redux/slices/brandListSlice";
import { fetchTipos } from "../../redux/slices/tipoListSlice";
import {
  Cards,
  Filters,
  Paginated,
  AddButton,
  Sorts,
  SearchBar,
} from "../../components";

const LIMIT = 6;
const Home = () => {
  const dispatch = useDispatch();
  const { motos, searchQuery, filters, sorts, currentPage, totalPages } =
    useSelector((state) => state.motoList);
  const { brands } = useSelector((state) => state.brandList);
  const { tipos } = useSelector((state) => state.tipoList);

  useEffect(() => {
    dispatch(fetchMotos(LIMIT));
    dispatch(fetchBrands());
    dispatch(fetchTipos());
  }, [dispatch, currentPage, filters, sorts, searchQuery]);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  // const handleSearch = (searchQuery) => {
  //   dispatch(setSearch(searchQuery));
  //   dispatch(setCurrentPage(1));
  // };

  return (
    <>
      <section className="p-3 bg-[#000000cc]  flex justify-around max-md:flex-col">
        <Filters marcas={brands} tipos={tipos} />
        <SearchBar />
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
