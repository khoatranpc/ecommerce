import { Descriptions, Space } from "antd";
import React from "react";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const ShopInfoOverView = () => {
  const shopInfo = {
    name: "Shop Example",
    owner: "John Doe",
    email: "contact@shopexample.com",
    phone: "0123456789",
    address: "123 ABC Street, District 1, HCMC",
    status: "active",
    plan: "premium",
    createdAt: "01/01/2024",
    description: "Cửa hàng chuyên cung cấp các sản phẩm chất lượng cao",
  };

  return (
    <Descriptions bordered column={2}>
      <Descriptions.Item label="Chủ sở hữu">
        <Space>
          <UserOutlined />
          {shopInfo.owner}
        </Space>
      </Descriptions.Item>
      <Descriptions.Item label="Email">
        <Space>
          <MailOutlined />
          {shopInfo.email}
        </Space>
      </Descriptions.Item>
      <Descriptions.Item label="Số điện thoại">
        <Space>
          <PhoneOutlined />
          {shopInfo.phone}
        </Space>
      </Descriptions.Item>
      <Descriptions.Item label="Địa chỉ">
        <Space>
          <EnvironmentOutlined />
          {shopInfo.address}
        </Space>
      </Descriptions.Item>
      <Descriptions.Item label="Ngày tạo">
        {shopInfo.createdAt}
      </Descriptions.Item>
      <Descriptions.Item label="Mô tả">
        {shopInfo.description}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default ShopInfoOverView;
