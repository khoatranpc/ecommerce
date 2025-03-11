import {
  createQueryThunk,
  createSliceReducer,
} from "@/src/utils/redux-toolkit";

export const queryGetOnePost = createQueryThunk("queryGetOnePost");
export const postDetail = createSliceReducer("postDetail", [queryGetOnePost]);

export const queryCreateAPost = createQueryThunk("queryCreateAPost");
export const createAPost = createSliceReducer("createAPost", [
  queryCreateAPost,
]);
export const clearCreateAPost = createAPost.actions.clear;
