import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUpload, queryUpload } from "./../store/reducers/file";
import { redirect } from "next/navigation";
import { AppDispatch, RootState } from "../store";
import { IObj, IPayloadGraphql, IReducerStore } from "../types";
import {
  queryGetCurrentUser,
  queryUserRegister,
  queryVerifyAccount,
} from "../store/reducers/user";
import { Role } from "../types/enum";
import {
  queryCreateShopInfo,
  queryShopDetailInfoByOwnerId,
} from "../store/reducers/shop";
import { queryGetCategories } from "../store/reducers/category";

export interface TypeReturnHook extends IReducerStore {
  query: (
    payload?: IPayloadGraphql,
    callback?: (dataSuccess: any, error: any) => void
  ) => any;
  clear?: () => void;
}
const createHook = (
  nameState: keyof RootState,
  queryFnc: (params: {
    payload?: IPayloadGraphql;
    callback?: (dataSuccess: any, error: any) => void;
  }) => any,
  clearFnc?: Function
) => {
  return (): TypeReturnHook => {
    const state = useSelector(
      (state: RootState) => state[nameState]
    ) as IReducerStore;
    const dispatch = useDispatch<AppDispatch>();
    const query = (
      payload?: IPayloadGraphql,
      callback?: (dataSuccess: any, error: any) => void
    ) => {
      dispatch(
        queryFnc({
          ...payload,
          callback,
        })
      );
    };
    return {
      ...state,
      query,
      clear: () => {
        if (clearFnc) {
          dispatch(clearFnc());
        }
      },
    };
  };
};

export const useCheckCurrentRoleUser = (roleForCheck: Role) => {
  const currentUser = useCurrentUser();
  if (!currentUser.data?.getCurrentUser) {
    localStorage?.setItem("callBackUrl", window.location.href);
    return redirect("/");
  } else {
    if (
      currentUser.data!.getCurrentUser &&
      currentUser.data!.getCurrentUser.role !== roleForCheck
    ) {
      window.localStorage.removeItem("callBackUrl");
      return redirect("/");
    }
  }
};

export const useVerifyAccount = createHook("verifyAccount", queryVerifyAccount);
export const useCurrentUser = createHook("currentUser", queryGetCurrentUser);
export const useUserRegister = createHook("userRegister", queryUserRegister);
export const useGetShopDetailByOwnerId = createHook(
  "shopDetailInfo",
  queryShopDetailInfoByOwnerId
);

export const useUpload = createHook("upload", queryUpload, clearUpload);

export const useCreateShopInfo = createHook(
  "createShopInfo",
  queryCreateShopInfo
);

export const useGetCategories = createHook("categories", queryGetCategories);
