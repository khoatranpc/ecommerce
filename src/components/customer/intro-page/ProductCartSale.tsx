import React from "react";
import { Badge, Card, Image, Space, Typography } from "antd";
const { Title, Text } = Typography;
import { useCountDown } from "../../../utils/hooks";

const ProductCartSale = () => {
  const [timeLeft] = useCountDown(new Date());

  const formatTime = (value: number) => value.toString().padStart(2, "0");

  return (
    <Badge.Ribbon text={`-${10}%`} color="red">
      <Card hoverable className="bg-white/90 backdrop-blur">
        <div className="relative flex justify-center">
          <Image
            src={"/static/fallback-img.png"}
            alt={""}
            className="w-full h-48 object-contain m-auto"
            preview={false}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-center">
            <span className="text-white font-bold text-sm">
              {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:
              {formatTime(timeLeft.seconds)}
            </span>
            <span className="text-white/80 ml-2 font-bold">còn lại</span>
          </div>
        </div>
        <Title level={5} className="mt-4 mb-2">
          IP 15 Promax
        </Title>
        <Space direction="vertical" className="w-full">
          <div className="flex justify-between items-center">
            <Text type="danger" className="text-xl font-bold">
              {Number(9000000).toLocaleString()}₫
            </Text>
            <Text delete className="text-gray-500">
              {Number(9000000).toLocaleString()}₫
            </Text>
          </div>
          <div className="bg-gray-200 rounded-full h-2">
            <div
              className="bg-red-500 h-2 rounded-full transition-all"
              style={{
                width: `${50}%`,
              }}
            />
          </div>
          <Text className="text-center text-gray-500">Đã bán 80/160</Text>
        </Space>
      </Card>
    </Badge.Ribbon>
  );
};

export default ProductCartSale;
