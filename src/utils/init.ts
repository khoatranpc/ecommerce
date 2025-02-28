import { IReducerStore } from "../types";

export const initDataReducer: IReducerStore = {
  data: null,
  error: null,
  isError: false,
  isFetched: false,
  isSuccess: false,
  isPending: false,
};
