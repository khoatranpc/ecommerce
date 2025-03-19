import React from "react";
import { Image, Typography, Space, Divider, Button } from "antd";
import { ShopOutlined, MessageOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface ShopInfoProps {
  shop?: {
    logo: string;
    name: string;
    products: number;
    followers: number;
  };
}

const ShopInfo = ({ shop }: ShopInfoProps) => {
  return (
    <div className="flex items-center gap-4">
      <Image
        src={shop?.logo}
        alt={shop?.name}
        className="!w-16 !h-16 object-cover rounded-full"
      />
      <div className="flex-1">
        <Title level={5}>{shop?.name}</Title>
        <Space split={<Divider type="vertical" />}>
          <Text>{shop?.products} sản phẩm</Text>
          <Text>{shop?.followers} người theo dõi</Text>
        </Space>
      </div>
      <Space>
        <Button icon={<ShopOutlined />}>Xem shop</Button>
        <Button icon={<MessageOutlined />}>Chat ngay</Button>
      </Space>
    </div>
  );
};

export default ShopInfo;