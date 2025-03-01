import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { IPayloadGraphql, IReducerStore } from "../types";
import {
  queryGetCurrentUser,
  queryUserRegister,
  queryVerifyAccount,
} from "../store/reducers/user";
import { redirect } from "next/navigation";
import { Role } from "../types/enum";

export interface TypeReturnHook extends IReducerStore {
  query: (
    payload?: IPayloadGraphql,
    callback?: (dataSuccess: any, error: any) => void
  ) => any;
}
const createHook = (
  nameState: keyof RootState,
  queryFnc: (params: {
    payload?: IPayloadGraphql;
    callback?: (dataSuccess: any, error: any) => void;
  }) => any
) => {
  return (): TypeReturnHook => {
    const userLoggedIn = useSelector(
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
      ...userLoggedIn,
      query,
    };
  };
};

export const useCheckCurrentRoleUser = (roleForCheck: Role) => {
  const currentUser = useCurrentUser();
  if (!currentUser.data?.getCurrentUser) {
    window.localStorage.setItem("callBackUrl", window.location.href);
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
