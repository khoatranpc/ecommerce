"use client";
import React, { useEffect } from "react";
import { Select, SelectProps, Tag } from "antd";
import { useGetCategories } from "../utils/hooks";
import { queryGetCategories } from "../utils/graphql-queries";
import { IObj } from "../types";
import { BaseOptionType } from "antd/es/select";
import { Status } from "../types/enum";

interface Props extends SelectProps {
  shopId?: string;
  value?: string[];
  onChange?: (value: string[]) => void;
  className?: string;
}

const SelectCategories = ({ value, onChange, className, ...props }: Props) => {
  const categories = useGetCategories();
  const getCategories: BaseOptionType[] = (
    (categories.data?.getCategories?.data as IObj[]) ?? []
  ).map((item) => {
    return {
      value: item._id,
      label: item.name,
    };
  });
  useEffect(() => {
    categories.query({
      query: queryGetCategories(),
      variables: {
        input: {
          filter: {
            shop: props.shopId ? [props.shopId] : [],
            status: [Status.active],
          },
          paginate: {
            limit: 500,
          },
        },
      },
    });
  }, [props.shopId]);
  return (
    <Select
      mode="multiple"
      allowClear
      className={`w-full ${className}`}
      placeholder="Chọn danh mục"
      value={value}
      onChange={onChange}
      options={getCategories}
      maxTagCount="responsive"
      onPopupScroll={(e) => {
        console.log(e);
      }}
      {...props}
    />
  );
};

export default SelectCategories;
