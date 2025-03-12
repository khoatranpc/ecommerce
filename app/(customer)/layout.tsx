import CustomerLayout from "@/src/layouts/CustomerLayout";
import React from "react";
interface Props {
  children: React.ReactNode;
}
const layout = (props: Props) => {
  return <CustomerLayout>{props.children}</CustomerLayout>;
};

export default layout;
