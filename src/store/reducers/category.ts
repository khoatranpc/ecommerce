import {
  createQueryThunk,
  createSliceReducer,
} from "@/src/utils/redux-toolkit";

export const queryGetCategories = createQueryThunk("categories");
export const categories = createSliceReducer("categories", [
  queryGetCategories,
]);

export const queryCreateCategory = createQueryThunk("createCategory");
export const createCategory = createSliceReducer("createCategory", [
  queryCreateCategory,
]);
export const createCreateCategory = createCategory.actions.clear;
