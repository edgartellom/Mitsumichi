import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const motoListSlice = createSlice({
  name: "motoList",
  initialState: {
    allMotos: [],
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
    selectedSorts: {
      sortByBrand: "",
      sortByPrice: "",
    },
  },
  reducers: {
    setAllMotos: (state, action) => {
      state.allMotos = action.payload;
    },
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
    setSearch: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSorts: (state, action) => {
      state.sorts = action.payload;
    },
    setSelectedFilters: (state, action) => {
      state.selectedFilters = action.payload;
    },
    setSelectedSorts: (state, action) => {
      state.selectedSorts = action.payload;
    },
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
      state.selectedSorts = {
        sortByBrand: "",
        sortByPrice: "",
      };
    },
  },
});

// Thunks para manejar la carga de datos y las acciones asíncronas

export const fetchMotos = (limit) => async (dispatch, getState) => {
  try {
    dispatch(motoListSlice.actions.setLoading(true));

    const { currentPage, filters, searchQuery, sorts } = getState().motoList;

    const response = await axios.get("/motos", {
      params: {
        limit: limit,
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
    const tipos = [...new Set(jsonData.allMotos.map((moto) => moto.tipo))];
    dispatch(motoListSlice.actions.setAllMotos(jsonData.allMotos));
    dispatch(motoListSlice.actions.setTipos(tipos));
    dispatch(motoListSlice.actions.setMotos(jsonData.data));
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
  setSelectedFilters,
  setSelectedSorts,
  resetFilters,
  resetSorts,
} = motoListSlice.actions;
export default motoListSlice.reducer;
