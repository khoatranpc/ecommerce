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
import {
  createCreateCategory,
  queryCreateCategory,
  queryGetCategories,
} from "../store/reducers/category";
import { removeLocalStorage, setLocalStorage } from ".";

export interface TypeReturnHook extends IReducerStore {
  query: (
    payload?: IPayloadGraphql,
    callback?: (dataSuccess: any, error: any) => void
  ) => any;
  clear?: () => void;
  refresh?: () => void;
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
    const refresh = () => {
      const getPayloadQueried = state.payloadQuery;
      dispatch(queryFnc(getPayloadQueried));
    };
    return {
      ...state,
      query,
      clear: () => {
        if (clearFnc) {
          dispatch(clearFnc());
        }
      },
      refresh,
    };
  };
};

export const useCheckCurrentRoleUser = (roleForCheck: Role) => {
  const currentUser = useCurrentUser();
  if (!currentUser.data?.getCurrentUser) {
    setLocalStorage("callBackUrl", window.location.href);
    return redirect("/");
  } else {
    if (
      currentUser.data!.getCurrentUser &&
      currentUser.data!.getCurrentUser.role !== roleForCheck
    ) {
      removeLocalStorage("callBackUrl");
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
export const useCreateCategory = createHook(
  "createCategory",
  queryCreateCategory,
  createCreateCategory
);
