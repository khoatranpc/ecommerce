import { Select, SelectProps } from "antd";
import React from "react";
import {
  mapStatusToStatusProductString,
  mapStatusToString,
  Status,
} from "../types/enum";

interface Props extends SelectProps {
  isNormalContentStatus?: boolean;
}

const SelectStatus = (props: Props) => {
  const options = Object.keys(Status).map((item) => {
    return {
      value: item,
      label: !props.isNormalContentStatus
        ? mapStatusToStatusProductString[item as Status]
        : mapStatusToString[item as Status],
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
