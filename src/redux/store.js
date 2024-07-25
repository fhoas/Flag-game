import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";
import randomItemSlice from "./randomItemSlice";
import resultsSlice from "./resultsSlice";

export const store = configureStore({
  reducer: {
    data: dataReducer,
    randomItem: randomItemSlice,
    results: resultsSlice,
  },
});
