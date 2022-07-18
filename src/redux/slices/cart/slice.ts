import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calcTotalPriceCart } from "../../../utils/calcTotalPriceCart";
import { getCartFromLocalStorage } from "../../../utils/getCartFromLocalStorage";
import { CartItem, CartSliceState } from "./types";

const { items, totalPrice } = getCartFromLocalStorage();

const initialState: CartSliceState = {
  totalPrice,
  items,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = calcTotalPriceCart(state.items);
    },

    minusItem: (state, action: PayloadAction<string>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
    },
    plusItem: (state, action: PayloadAction<string>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count++;
      }
    },

    removeItemFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  clearItems,
  minusItem,
  plusItem,
} = cartSlice.actions;

export default cartSlice.reducer;
