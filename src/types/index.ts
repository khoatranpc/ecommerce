import React from "react";
export interface IObj {
  [k: string]: any;
}
export interface ComponentProps extends IObj {
  children?: React.ReactNode;
}

export interface IReducerStore<T = any> {
  data: T;
  isPending: boolean;
  isFetched: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: any;
  payloadQuery: any;
}

export interface IPayloadGraphql {
  query: string;
  variables?: {
    input: IObj;
  };
}

export interface IQueryPaginate {
  page: number;
  limit: number;
}
