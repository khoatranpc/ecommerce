"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { ComponentProps } from "../types";
import { store } from ".";

const StoreProvider = (props: ComponentProps) => {
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.pathname !=="/") {
      const handleBeforeUnload = () => {
        localStorage.setItem("callBackUrl", window.location.href);
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, []);
  return (
    <Provider store={store}>
      <ToastContainer
        icon={
          <Image src={"/static/logo-short.png"} alt="" width={50} height={50} />
        }
      />
      {props.children}
    </Provider>
  );
};

export default StoreProvider;
