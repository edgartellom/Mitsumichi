import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const tipoSlice = createSlice({
  name: "tipoList",
  initialState: {
    tipos: [],
  },
  reducers: {
    setTipos: (state, action) => {
      state.tipos = action.payload;
    },
  },
});

export const fetchTipos = () => async (dispatch) => {
  try {
    const response = await axios.get("tipos");
    const jsonData = await response.data;
    const tipos = jsonData.map((tipo) => tipo.name);
    dispatch(tipoSlice.actions.setTipos(tipos));
  } catch (error) {
    console.error("Error fetching tipos:", error);
  }
};

export const { setTipos } = tipoSlice.actions;
export default tipoSlice.reducer;
