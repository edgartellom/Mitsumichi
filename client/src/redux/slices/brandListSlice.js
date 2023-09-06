import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const brandSlice = createSlice({
  name: "brandList",
  initialState: {
    brands: [],
  },
  reducers: {
    setBrands: (state, action) => {
      state.brands = action.payload;
    },
  },
});

export const fetchBrands = () => async (dispatch) => {
  try {
    const response = await axios.get("/marcas");
    const jsonData = await response.data;
    const marcas = jsonData.map((marca) => marca.name);
    dispatch(brandSlice.actions.setBrands(marcas));
  } catch (error) {
    console.error("Error fetching brands:", error);
  }
};

export const { setBrands } = brandSlice.actions;
export default brandSlice.reducer;
