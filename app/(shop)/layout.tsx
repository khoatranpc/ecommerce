"use client";
import dynamic from "next/dynamic";
import React from "react";
const ShopManagementLayout = dynamic(
  () => import("@/src/layouts/ShopManagementLayout"),
  {
    ssr: false,
  }
);

export default function Layout(props: { children: React.ReactNode }) {
  return <ShopManagementLayout>{props.children}</ShopManagementLayout>;
}
