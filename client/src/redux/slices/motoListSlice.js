import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const motoListSlice = createSlice({
  name: "motoList",
  initialState: {
    motos: [],
    tipos: [],
    isLoading: false,
    currentPage: 1,
    totalPages: 1,
    filters: {
      brand: "",
      tipo: "",
      minPrice: 0,
      maxPrice: 60000,
      minYear: 2010,
      maxYear: new Date().getFullYear(),
    },
    searchQuery: "",
    sorts: {
      sortByBrand: "",
      sortByPrice: "",
    },
  },
  reducers: {
    setMotos: (state, action) => {
      state.motos = action.payload;
    },
    setTipos: (state, action) => {
      state.tipos = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    // setBrand: (state, action) => {
    //   state.filters.brand = action.payload;
    // },
    // setTipo: (state, action) => {
    //   state.filters.tipo = action.payload;
    // },
    // setPriceRange: (state, action) => {
    //   state.filters.minPrice = action.payload[0];
    //   state.filters.maxPrice = action.payload[1];
    // },
    // setYearRange: (state, action) => {
    //   state.filters.minYear = action.payload[0];
    //   state.filters.maxYear = action.payload[1];
    // },
    setSearch: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSorts: (state, action) => {
      state.sorts = action.payload;
    },
    // setSortByBrand: (state, action) => {
    //   state.sorts.sortByBrand = action.payload;
    // },
    // setSortByPrice: (state, action) => {
    //   state.sorts.sortByPrice = action.payload;
    // },
    resetFilters: (state) => {
      state.filters = {
        brand: "",
        tipo: "",
        minPrice: 0,
        maxPrice: 60000,
        minYear: 2010,
        maxYear: new Date().getFullYear(),
      };
    },
    resetSorts: (state) => {
      state.sorts = {
        sortByBrand: "",
        sortByPrice: "",
      };
    },
  },
});

// Thunks para manejar la carga de datos y las acciones asíncronas

export const fetchMotos = () => async (dispatch, getState) => {
  try {
    dispatch(motoListSlice.actions.setLoading(true));

    const { currentPage, filters, searchQuery, sorts } = getState().motoList;

    const response = await axios.get("/motos", {
      params: {
        limit: 6,
        page: currentPage,
        brand: filters.brand,
        tipo: filters.tipo,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        minYear: filters.minYear,
        maxYear: filters.maxYear,
        search: searchQuery,
        sortByBrand: sorts.sortByBrand,
        sortByPrice: sorts.sortByPrice,
      },
    });
    const jsonData = await response.data;
    const tipos = [...new Set(jsonData.data.map((moto) => moto.tipo))];
    dispatch(motoListSlice.actions.setTipos(tipos));
    dispatch(motoListSlice.actions.setMotos(jsonData.data));
    // dispatch(motoListSlice.actions.setCurrentPage(jsonData.currentPage));
    dispatch(motoListSlice.actions.setTotalPages(jsonData.totalPages));
  } catch (error) {
    console.error("Error fetching motos:", error);
  } finally {
    dispatch(motoListSlice.actions.setLoading(false));
  }
};

export const {
  setMotos,
  setLoading,
  setCurrentPage,
  setFilters,
  setSearch,
  setSorts,
  resetFilters,
  resetSorts,
} = motoListSlice.actions;
export default motoListSlice.reducer;