import { configureStore } from "@reduxjs/toolkit";
import counter from "./reducers/example";
import { verifyAccount, currentUser } from "./reducers/user";

export const store = configureStore({
  reducer: {
    counter: counter.reducer,
    verifyAccount: verifyAccount.reducer,
    currentUser: currentUser.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
