import { AxiosInstance, AxiosRequestConfig, Method } from "axios";
import instanceAxios from "./axios";
import { IPayloadGraphql } from "../types";

const createQueryAxios = (
  payload: IPayloadGraphql,
  urlRestApi?: string,
  method: Method = "post",
  config?: AxiosRequestConfig<IPayloadGraphql>
) => {
  return async (isRestApi?: boolean) => {
    if (!isRestApi) {
      const data = await instanceAxios.post("/graphql", payload);
      return data;
    } else {
      const data = await instanceAxios[method as "post"](
        urlRestApi ?? "",
        payload ?? config,
        config
      );
      return data;
    }
  };
};

export default createQueryAxios;
