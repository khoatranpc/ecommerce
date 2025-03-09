import {
  createQueryThunk,
  createSliceReducer,
} from "@/src/utils/redux-toolkit";

export const queryCreateAProduct = createQueryThunk("queryCreateAProduct");
export const createAProduct = createSliceReducer("createAProduct", [
  queryCreateAProduct,
]);
export const clearCreateAProduct = createAProduct.actions.clear;

export const queryProducts = createQueryThunk("queryProducts");
export const products = createSliceReducer("products", [queryProducts]);

export const queryProductBySlug = createQueryThunk("queryProductBySlug");
export const productDetail = createSliceReducer("productDetail", [
  queryProductBySlug,
]);

export const queryUpdateProduct = createQueryThunk("queryUpdateProduct");
export const updateProduct = createSliceReducer("updateProduct", [
  queryUpdateProduct,
]);
export const clearUpdateProduct = updateProduct.actions.clear;
