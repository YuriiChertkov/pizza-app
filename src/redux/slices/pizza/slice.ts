import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Pizza, PizzaSliceState, SearchPizzaParams, Status } from "./types";

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  "pizza/fetchPizzasStatus",

  async (params) => {
    const {
      currentPage,
      categoryAllProperty,
      sortProperty,
      orderProperty,
      search,
    } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://628e0b22368687f3e70f5438.mockapi.io/items?page=${currentPage}&limit=4&${categoryAllProperty}&sortBy=${sortProperty}&order=${orderProperty}${search}`
    );

    return data;
  }
);

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.SUCCESS;
      state.items = [];
    });
  },
  /* For JS  
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
  }, */
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
