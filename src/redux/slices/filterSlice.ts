import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum sortPropertyEnum {
  RATING_DESC = "rating",
  RATING_ASC = "-rating",
  PRICE_DESC = "price",
  PRICE_ASC = "-price",
  TITLE_DESC = "title",
  TITLE_ASC = "-title",
}
export type Sort = {
  name: string;
  sortValue: sortPropertyEnum;
};

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: Sort;
}

const initialState: FilterSliceState = {
  searchValue: "",
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "популярности",
    sortValue: sortPropertyEnum.RATING_DESC,
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setSort: (state, action: PayloadAction<Sort>) => {
      state.sort = action.payload;
    },
    setCurentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },

    setFilters: (state, action: PayloadAction<FilterSliceState>) => {
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage);
        state.sort = action.payload.sort;
        state.categoryId = Number(action.payload.categoryId);
      } else state.currentPage = 1;
      state.categoryId = 0;
      state.sort = {
        name: "популярности",
        sortValue: sortPropertyEnum.RATING_DESC,
      };
    },
  },
});

export const selectSort = (state: RootState) => state.filter.sort;
export const selectFilter = (state: RootState) => state.filter;

export const {
  setCategoryId,
  setSort,
  setCurentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
