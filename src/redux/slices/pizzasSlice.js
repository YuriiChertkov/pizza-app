import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setPizzas: (state, action) => {
      state.items = action.payload.items;
    },
  },
});

export const { setPizzas } = pizzasSlice.actions;

export default pizzasSlice.reducer;
