import { configureStore } from "@reduxjs/toolkit";
import counter from "./reducers/example";
import { verifyAccount, currentUser, userRegister } from "./reducers/user";

export const store = configureStore({
  reducer: {
    counter: counter.reducer,
    verifyAccount: verifyAccount.reducer,
    currentUser: currentUser.reducer,
    userRegister: userRegister.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
