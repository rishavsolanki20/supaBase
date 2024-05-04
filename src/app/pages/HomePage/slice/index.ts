/* eslint-disable prettier/prettier */
import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "utils/@reduxjs/toolkit";
import { useInjectReducer, useInjectSaga } from "utils/redux-injectors";
import { homePageSaga } from "./saga";
import { CartItem, initialState } from "./types";

const slice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    fetchDataStart: (state) => {
      state.loading = true;
    },
    fetchDataSuccess: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      state.loading = false;
    },
    fetchDataFailure: (state) => {
      state.loading = false;
    },
    addToCartStart: (state, action: PayloadAction<CartItem>) => {
      state.loading = true;
    },
    addToCartSuccess: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
      state.loading = false;
    },
    addToCartFailure: (state) => {
      state.loading = false;
      state.error = "Failed to add item to cart";
    },
    someAction(state, action: PayloadAction<any>) {},
  },
});

export const {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
  addToCartStart,
  addToCartSuccess,
  addToCartFailure,
} = slice.actions;
export const homePageReducer = slice.reducer;
export const { actions: homePageActions } = slice;

export const useHomePageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: homePageSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useHomePageSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
