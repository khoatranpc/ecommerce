import {
  createQueryThunk,
  createSliceReducer,
} from "@/src/utils/redux-toolkit";

export const queryInsertToCart = createQueryThunk("queryInsertToCart");
export const insertToCart = createSliceReducer("insertToCart", [
  queryInsertToCart,
]);
export const clearInsertToCart = insertToCart.actions.clear;

export const queryGetCarts = createQueryThunk("queryGetCarts");
export const carts = createSliceReducer("carts", [queryGetCarts]);
