import React from "react";
import { ComponentProps } from "@/src/types";
import AdminLayout from "@/src/layouts/AdminLayout";

const layout = (props: ComponentProps) => {
  return <AdminLayout>{props.children}</AdminLayout>;
};

export default layout;
