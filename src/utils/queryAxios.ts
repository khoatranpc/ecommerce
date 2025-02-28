import { Method } from "axios";
import instanceAxios from "./axios";
import { IPayloadGraphql } from "../types";

const createQueryAxios = (payload: IPayloadGraphql) => {
  return async (
    method: Method = "post",
    isRestApi?: boolean,
    urlRestApi?: string
  ) => {
    if (!isRestApi) {
      const data = await instanceAxios.post("/graphql", payload);
      return data;
    }
  };
};

export default createQueryAxios;
