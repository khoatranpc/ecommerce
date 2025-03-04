import { configureStore } from "@reduxjs/toolkit";
import counter from "./reducers/example";
import { verifyAccount, currentUser, userRegister } from "./reducers/user";
import { createShopInfo, shopDetailInfo } from "./reducers/shop";
import { upload } from "./reducers/file";

export const store = configureStore({
  reducer: {
    counter: counter.reducer,
    verifyAccount: verifyAccount.reducer,
    currentUser: currentUser.reducer,
    userRegister: userRegister.reducer,
    shopDetailInfo: shopDetailInfo.reducer,
    createShopInfo: createShopInfo.reducer,
    upload: upload.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
