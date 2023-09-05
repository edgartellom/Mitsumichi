import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMotos, setCurrentPage } from "../../redux/slices/motoListSlice";
import { fetchBrands } from "../../redux/slices/brandListSlice";
import { Cards, Filters, Paginated, AddButton, Sorts } from "../../components";

// let limit = 6;
const Home = () => {
  const dispatch = useDispatch();
  const { motos, tipos, isLoading, filters, sorts, currentPage, totalPages } =
    useSelector((state) => state.motoList);
  const { brands } = useSelector((state) => state.brandList);

  useEffect(() => {
    dispatch(fetchMotos());
    dispatch(fetchBrands());
  }, [dispatch, currentPage, filters, sorts]);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  // const handleFilterChange = (newFilters) => {
  //   dispatch(setFilters(newFilters));
  //   dispatch(fetchMotos());
  //   dispatch(setCurrentPage(1));
  // };

  // const handleSortChange = (sortBy, direction) => {
  //   dispatch(
  //     setSorts((sorts) => ({
  //       ...sorts,
  //       [sortBy]: direction,
  //     }))
  //   );
  //   dispatch(setCurrentPage(1));
  // };

  return (
    <section>
      <section className="p-3 bg-[#000000cc]  flex justify-around">
        <Filters
          marcas={brands}
          tipos={tipos}
          // onFilterChange={handleFilterChange}
        />
        <Sorts
        // handleSortChange={handleSortChange}
        />
      </section>

      <Cards data={motos} />
      <Paginated
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <AddButton />
    </section>
  );
};

export default Home;
