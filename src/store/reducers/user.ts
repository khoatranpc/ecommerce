import {
  createQueryThunk,
  createSliceReducer,
} from "@/src/utils/redux-toolkit";

export const queryVerifyAccount = createQueryThunk("queryVerifyAccount");
const verifyAccount = createSliceReducer("userLogin", [queryVerifyAccount]);

export const queryGetCurrentUser = createQueryThunk("queryGetCurrentUser");
const currentUser = createSliceReducer("currentUser", [queryGetCurrentUser]);

export { verifyAccount, currentUser };
