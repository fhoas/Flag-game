import { createSlice } from "@reduxjs/toolkit";

const resultsSlice = createSlice({
  name: "results",
  initialState: 0,
  reducers: {
    setResults: (state, action) => action.payload,
  },
});

export const { setResults } = resultsSlice.actions;
export default resultsSlice.reducer;
