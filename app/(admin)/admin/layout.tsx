import React from "react";
import AdminLayout from "@/src/layouts/AdminLayout";

const layout = (props: { children: React.ReactNode }) => {
  return <AdminLayout>{props.children}</AdminLayout>;
};

export default layout;
