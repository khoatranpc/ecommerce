import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { IPayloadGraphql, IReducerStore } from "../types";
import {
  queryGetCurrentUser,
  queryVerifyAccount,
} from "../store/reducers/user";

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

export const useVerifyAccount = createHook("verifyAccount", queryVerifyAccount);
export const useCurrentUser = createHook("currentUser", queryGetCurrentUser);
