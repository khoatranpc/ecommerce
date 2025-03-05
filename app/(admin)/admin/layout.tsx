"use client";
import dynamic from "next/dynamic";
import React from "react";
const AdminLayout = dynamic(() => import("@/src/layouts/AdminLayout"), {
  ssr: false,
});

const layout = (props: { children: React.ReactNode }) => {
  return <AdminLayout>{props.children}</AdminLayout>;
};

export default layout;
