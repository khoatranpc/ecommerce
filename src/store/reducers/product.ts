import {
  createQueryThunk,
  createSliceReducer,
} from "@/src/utils/redux-toolkit";

export const queryCreateAProduct = createQueryThunk("queryCreateAProduct");
export const createAProduct = createSliceReducer("createAProduct", [
  queryCreateAProduct,
]);
export const clearCreateAProduct = createAProduct.actions.clear;
