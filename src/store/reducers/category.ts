import {
  createQueryThunk,
  createSliceReducer,
} from "@/src/utils/redux-toolkit";

export const queryGetCategories = createQueryThunk("categories");
export const categories = createSliceReducer("categories", [
  queryGetCategories,
]);
