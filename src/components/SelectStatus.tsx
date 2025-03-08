import { Select, SelectProps } from "antd";
import React from "react";
import { mapStatusToStatusProductString, Status } from "../types/enum";

interface Props extends SelectProps {}

const SelectStatus = (props: Props) => {
  const options = Object.keys(Status).map((item) => {
    return {
      value: item,
      label: mapStatusToStatusProductString[item as Status],
    };
  });
  return (
    <Select
      mode="multiple"
      allowClear
      className={`w-full ${props.className ?? ""}`}
      placeholder="Chọn trạng thái"
      value={props.value}
      onChange={props.onChange}
      options={options}
      maxTagCount="responsive"
      {...props}
    />
  );
};

export default SelectStatus;
