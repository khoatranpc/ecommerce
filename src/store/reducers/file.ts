import {
  createQueryThunk,
  createSliceReducer,
} from "@/src/utils/redux-toolkit";
export const queryUpload = createQueryThunk("upload", "/upload", "post", {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
export const upload = createSliceReducer("upload", [queryUpload]);
export const clearUpload = upload.actions.clear;
