"use client";
import dynamic from "next/dynamic";
import React from "react";

const ListCategory = dynamic(
  () =>
    import("@/src/screens/shop-management-for-shop/Categories/ListCategory"),
  {
    ssr: false,
  }
);

const page = () => {
  return <ListCategory />;
};

export default page;
