"use client";
import React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { ComponentProps } from "../types";
import { store } from ".";
import Image from "next/image";

const StoreProvider = (props: ComponentProps) => {
  return (
    <Provider store={store}>
      <ToastContainer
        icon={<Image src={"/static/logo-short.png"} alt="" width={50} height={50} />}
      />
      {props.children}
    </Provider>
  );
};

export default StoreProvider;
