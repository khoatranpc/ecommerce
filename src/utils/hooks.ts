import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { AxiosRequestConfig, Method } from "axios";
import instanceAxios from "./axios";
import {
  clearCreateAProduct,
  clearUpdateProduct,
  queryCreateAProduct,
  queryProductBySlug,
  queryProducts,
  queryUpdateProduct,
} from "../store/reducers/product";
import {
  clearCreateAPost,
  queryCreateAPost,
  queryGetOnePost,
} from "../store/reducers/post";

export interface TypeReturnHook extends IReducerStore {
  query: (
    payload?: IPayloadGraphql,
    callback?: (
      dataSuccess: IObj,
      error: { message?: string; [k: string]: any }
    ) => void,
    isRest?: boolean
  ) => any;
  clear?: () => void;
  refresh?: () => void;
}
const createHook = (
  nameState: keyof RootState,
  queryFnc: (params: {
    payload?: IPayloadGraphql;
    callback?: (
      dataSuccess: IObj,
      error: { message?: string; [k: string]: any }
    ) => void;
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
      callback?: (
        dataSuccess: IObj,
        error: { message?: string; [k: string]: any }
      ) => void,
      isRest?: boolean
    ) => {
      if (!isRest) {
        dispatch(
          queryFnc({
            ...payload,
            callback,
          })
        );
      } else {
        dispatch(queryFnc(payload as any));
      }
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
export const useRequestRestApi = () => {
  const [data, setData] = useState<IReducerStore>({
    data: null,
    error: null,
    isError: false,
    isFetched: false,
    isPending: false,
    isSuccess: false,
    payloadQuery: null,
  });
  const query = async (
    endpoint: string,
    method: Method,
    payload: any,
    config?: AxiosRequestConfig
  ) => {
    try {
      setData({
        ...data,
        isPending: true,
      });
      const response = await instanceAxios[method as "post"](
        endpoint ?? "",
        payload ?? config,
        config
      );
      setData({
        ...data,
        isPending: false,
        isFetched: true,
        data: response.data,
      });
      return response;
    } catch (err) {
      setData({
        ...data,
        isPending: false,
        isFetched: true,
        error: err,
        isError: true,
      });
      return null;
    }
  };
  return {
    data,
    query,
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

export const useCreateAProduct = createHook(
  "createAProduct",
  queryCreateAProduct,
  clearCreateAProduct
);

export const useProducts = createHook("products", queryProducts);
export const useGetProductDetailBySlug = createHook(
  "productDetail",
  queryProductBySlug
);

export const useUpdateProduct = createHook(
  "updateProduct",
  queryUpdateProduct,
  clearUpdateProduct
);

export const usePostDetail = createHook("postDetail", queryGetOnePost);
export const useCreateAPost = createHook(
  "createAPost",
  queryCreateAPost,
  clearCreateAPost
);

export const useCountDown = (startTime: Date) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: startTime.getHours(),
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          clearInterval(timer);
          return prev;
        }

        let newHours = prev.hours;
        let newMinutes = prev.minutes;
        let newSeconds = prev.seconds;

        if (newSeconds > 0) {
          newSeconds--;
        } else if (newMinutes > 0) {
          newMinutes--;
          newSeconds = 59;
        } else if (newHours > 0) {
          newHours--;
          newMinutes = 59;
          newSeconds = 59;
        }

        return {
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return [timeLeft];
};
