"use client";
import React from "react";
import { Breadcrumb } from "antd";
import { useRouter } from "next/navigation";
import { useGetProductDetailBySlug } from "@/src/utils/hooks";
import { IObj } from "@/src/types";
interface Props {
  children: React.ReactNode;
}

const ProductDetailLayout = (props: Props) => {
  const router = useRouter();
  const currentProduct = useGetProductDetailBySlug();
  const getDataCurrentProduct = currentProduct.data?.getProductBySlug as IObj;
  const getCategories = getDataCurrentProduct?.categories?.[0];
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb
        className="mb-8"
        items={[
          {
            title: "Trang chủ",
            onClick() {
              router.push("/shopping");
            },
            className: "cursor-pointer",
          },
          { title: getCategories?.name },
          { title: getDataCurrentProduct?.name },
        ]}
      />
      {props.children}
    </div>
  );
};

export default ProductDetailLayout;
