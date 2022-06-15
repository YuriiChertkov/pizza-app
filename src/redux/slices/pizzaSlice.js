import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",

  async (params) => {
    const {
      currentPage,
      categoryAllProperty,
      sortProperty,
      orderProperty,
      search,
    } = params;
    const { data } = await axios.get(
      `https://628e0b22368687f3e70f5438.mockapi.io/items?page=${currentPage}&limit=4&${categoryAllProperty}&sortBy=${sortProperty}&order=${orderProperty}${search}`
    );
    return data;
  }
);

const initialState = {
  items: [],
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.fulfilled]: (state, action) => {
      console.log(state);
    },
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
