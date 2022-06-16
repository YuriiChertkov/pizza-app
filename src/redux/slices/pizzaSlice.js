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
    const res = await axios
      .get(
        `https://628e0b22368687f3e70f5438.mockapi.io/items?page=${currentPage}&limit=4&${categoryAllProperty}&sortBy=${sortProperty}&order=${orderProperty}${search}`
      )
      .then((res) => res.data);
    return res;
  }
);

const initialState = {
  items: [],
  status: "loading",
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
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.items = [];
      console.log("pending...");
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
      console.log(state, "it's OK");
    },

    [fetchPizzas.rejected]: (state) => {
      state.status = "rejected";
      state.items = [];
      console.log("error");
    },
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
