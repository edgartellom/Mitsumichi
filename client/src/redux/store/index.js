// import rootReducer from "../reducer/index";
// import { createStore, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import motoListSlice from "../slices/motoListSlice";
import brandListSlice from "../slices/brandListSlice";
import tipoListSlice from "../slices/tipoListSlice";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";

const store = configureStore({
  reducer: {
    motoList: motoListSlice,
    brandList: brandListSlice,
    tipoList: tipoListSlice,
  },
});

export default store;
