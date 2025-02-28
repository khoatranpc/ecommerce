"use client";
import React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { ComponentProps } from "../types";
import { store } from ".";

const StoreProvider = (props: ComponentProps) => {
  return (
    <Provider store={store}>
      <ToastContainer />
      {props.children}
    </Provider>
  );
};

export default StoreProvider;
