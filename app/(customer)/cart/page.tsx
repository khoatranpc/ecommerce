import React from "react";
import CartScreen from "@/src/screens/customer/cart/CartScreen";
import { Metadata } from "next";
export const metadata: Metadata = { title: "Giỏ hàng" };
const page = () => {
  return <CartScreen />;
};

export default page;
