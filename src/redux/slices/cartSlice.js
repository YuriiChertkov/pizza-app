import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /*  addItemToCart: (state, action) => {
      state.items.push(action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => obj.price + sum, 0);
    }, */
    addItemToCart: (state, action) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce(
        (sum, obj) => obj.price * obj.count + sum,
        0
      );
    },

    removeItemFromCart: (state, action) => {
      state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems: (state) => {
      state.items = [];
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearItems } =
  cartSlice.actions;

export default cartSlice.reducer;
