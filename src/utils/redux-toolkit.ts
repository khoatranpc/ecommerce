import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initDataReducer } from "./init";
import createQueryAxios from "./queryAxios";
import { IObj, IPayloadGraphql } from "../types";
import { AxiosRequestConfig, Method } from "axios";

export const createQueryThunk = (
  name: string,
  urlRestApi?: string,
  method?: Method,
  config?: AxiosRequestConfig<IPayloadGraphql>
) => {
  return createAsyncThunk(`${name}/fetch`, async (payload) => {
    return createQueryAxios(
      payload as unknown as IPayloadGraphql,
      urlRestApi,
      method,
      config
    )();
  });
};
const createSliceReducer = (
  name: string,
  queriesThunk: AsyncThunk<any, any, any>[]
) => {
  return createSlice({
    name: name,
    initialState: initDataReducer,
    reducers: {
      clear(state) {
        for (const key in initDataReducer) {
          state[key as keyof typeof state] =
            initDataReducer[key as keyof typeof initDataReducer];
        }
      },
    },
    extraReducers(builder) {
      queriesThunk.map((query) => {
        builder.addCase(query.pending, (state) => {
          state.isPending = true;
          state.isFetched = false;
        });
        builder.addCase(query.fulfilled, (state, action) => {
          state.isPending = false;
          const getResponse = (action.payload.data?.data as IObj) ?? {};
          const getCallBackFnc = action.meta.arg.callback as any;
          state.data = getResponse;
          state.isFetched = true;
          state.isSuccess = true;
          state.error = null;
          state.isError = false;
          getCallBackFnc?.(getResponse, null);
        });
        builder.addCase(query.rejected, (state, action) => {
          const getCallBackFnc = action.meta.arg.callback as any;
          state.isPending = true;
          state.isPending = false;
          state.isFetched = true;
          state.isSuccess = false;
          state.error = action.error;
          state.isError = true;
          getCallBackFnc?.(null, action.error);
        });
      });
    },
  });
};

export { createSliceReducer };
