import React, { useEffect, useState } from "react";
import { Badge, InputNumber, Tooltip } from "antd";
import {
  ArrowRightOutlined,
  NotificationFilled,
  NotificationOutlined,
} from "@ant-design/icons";
interface Props {
  /**
   * @param placeholders
   * Thứ tự hiển thị placeholder
   */
  placeholders?: string[];
  /**
   * @param prefixes
   * Thứ tự hiển thị prefix
   */
  prefixes?: React.ReactNode[];
  value?: [number | null, number | null];
  defaultValues?: Array<number | null>;
  onChange?: (value: [number | null, number | null]) => void;
  className?: string;
}

const RangeNumber = ({
  placeholders,
  prefixes,
  value,
  onChange,
  className,
  defaultValues,
}: Props) => {
  const [internalValue, setInternalValue] = useState<
    [number | null, number | null]
  >([null, null]);

  useEffect(() => {
    if (value) {
      setInternalValue(value);
    }
  }, [value]);

  const handleFromChange = (newFromValue: number | null) => {
    const currentTo = value?.[1] ?? internalValue[1];
    if (
      currentTo !== null &&
      newFromValue !== null &&
      newFromValue > currentTo
    ) {
      return;
    }
    const newValue: [number | null, number | null] = [newFromValue, currentTo];
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const handleToChange = (newToValue: number | null) => {
    const currentFrom = value?.[0] ?? internalValue[0];
    if (
      currentFrom !== null &&
      newToValue !== null &&
      newToValue < currentFrom
    ) {
      return;
    }
    const newValue: [number | null, number | null] = [currentFrom, newToValue];
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const currentValue = value ?? internalValue;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <InputNumber
        defaultValue={defaultValues?.[0] ?? undefined}
        prefix={prefixes?.[0]}
        placeholder={placeholders?.[0] ?? "From"}
        className="w-full"
        min={0}
        value={currentValue[0]}
        onChange={handleFromChange}
        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      />
      <ArrowRightOutlined />
      <InputNumber
        defaultValue={defaultValues?.[1] ?? undefined}
        prefix={prefixes?.[1]}
        placeholder={placeholders?.[1] ?? "To"}
        className="w-full"
        min={currentValue[0] ?? 0}
        value={currentValue[1]}
        onChange={handleToChange}
        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      />
      <sup className="cursor-pointer">
        <Tooltip
          title="Giá trị sau phải LỚN HƠN hoặc BẰNG giá trị trước"
          color="var(--primary)"
        >
          <NotificationFilled />
        </Tooltip>
      </sup>
    </div>
  );
};

export default RangeNumber;
