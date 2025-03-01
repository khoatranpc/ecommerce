'use client';
import React from "react";
import ShopManagementLayout from "@/src/layouts/ShopManagementLayout";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <ShopManagementLayout>
      {props.children}
    </ShopManagementLayout>
  );
}
