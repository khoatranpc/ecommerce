import { configureStore } from "@reduxjs/toolkit";
import counter from "./reducers/example";
import { verifyAccount, currentUser, userRegister } from "./reducers/user";
import { createShopInfo, shopDetailInfo } from "./reducers/shop";
import { categories, createCategory } from "./reducers/category";
import {
  createAProduct,
  productDetail,
  products,
  quickSearchProducts,
  updateProduct,
} from "./reducers/product";
import { createAPost, postDetail } from "./reducers/post";
import { carts, insertToCart } from "./reducers/cart";

export const store = configureStore({
  reducer: {
    counter: counter.reducer,
    verifyAccount: verifyAccount.reducer,
    currentUser: currentUser.reducer,
    userRegister: userRegister.reducer,
    shopDetailInfo: shopDetailInfo.reducer,
    createShopInfo: createShopInfo.reducer,
    categories: categories.reducer,
    createCategory: createCategory.reducer,
    createAProduct: createAProduct.reducer,
    products: products.reducer,
    quickSearchProducts: quickSearchProducts.reducer,
    productDetail: productDetail.reducer,
    updateProduct: updateProduct.reducer,
    postDetail: postDetail.reducer,
    createAPost: createAPost.reducer,
    insertToCart: insertToCart.reducer,
    carts: carts.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
