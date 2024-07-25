import { createSlice } from "@reduxjs/toolkit";

const randomItemSlice = createSlice({
  name: "randomItem",
  initialState: null,
  reducers: {
    setRandomItem: (state, action) => action.payload,
  },
});

export const { setRandomItem } = randomItemSlice.actions;
export default randomItemSlice.reducer;