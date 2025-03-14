import ProductDetailLayout from "@/src/components/customer/ProductDetailLayout";
import React from "react";

interface Props {
  children: React.ReactNode;
}
const layout = (props: Props) => {
  return <ProductDetailLayout>
    {props.children}
  </ProductDetailLayout>;
};

export default layout;
