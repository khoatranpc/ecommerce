import {
  createQueryThunk,
  createSliceReducer,
} from "@/src/utils/redux-toolkit";

export const queryShopDetailInfoByOwnerId = createQueryThunk("shopDetailInfo");
export const shopDetailInfo = createSliceReducer("shopDetailInfo", [
  queryShopDetailInfoByOwnerId,
]);

export const queryCreateShopInfo = createQueryThunk("queryCreateShopInfo");
export const createShopInfo = createSliceReducer("createShopInfo", [
  queryCreateShopInfo,
]);
