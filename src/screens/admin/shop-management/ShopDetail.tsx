"use client";
import React, { useState } from "react";
import {
  Card,
  Tabs,
  Typography,
  Button,
  Space,
  Tag,
  Avatar,
  Row,
  Col,
  Statistic,
  Badge,
} from "antd";
import {
  ShopOutlined,
  EditOutlined,
  ShoppingOutlined,
  DollarOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import ShopInfoOverView from "./ShopInfoOverView";
import ListOrder from "./ListOrder";
import ListProduct from "./products/ListProduct";
import ListCategory from "./categories/ListCategory";

const { Title } = Typography;
export enum Tab {
  SHOP_INFO_OVERVIEW = "SHOP_INFO_OVERVIEW",
  LIST_ORDER = "LIST_ORDER",
  PRODUCTS = "PRODUCTS",
  CATEGORIES = "CATEGORIES",
}

export const titleTab: Record<Tab, string> = {
  LIST_ORDER: "Đơn hàng",
  PRODUCTS: "Sản phẩm",
  SHOP_INFO_OVERVIEW: "Thông tin chung",
  CATEGORIES: "Danh mục bán hàng",
};

const ShopDetail = () => {
  const [activeTab, setActiveTab] = useState<Tab | string>(
    Tab.SHOP_INFO_OVERVIEW
  );
  const contentByTab: Record<Tab, React.ReactNode> = {
    SHOP_INFO_OVERVIEW: <ShopInfoOverView />,
    LIST_ORDER: <ListOrder />,
    PRODUCTS: <ListProduct />,
    CATEGORIES: <ListCategory />,
  };
  const itemsTab = Object.keys(Tab).map((item) => {
    return {
      key: item,
      label: titleTab[item as Tab],
    };
  });
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

  const stats = [
    {
      title: "Tổng đơn hàng",
      value: 1234,
      icon: <ShoppingOutlined />,
      color: "var(--primary)",
    },
    {
      title: "Doanh thu",
      value: 45600000,
      prefix: "₫",
      icon: <DollarOutlined />,
      color: "var(--primary)",
    },
    {
      title: "Khách hàng",
      value: 892,
      icon: <TeamOutlined />,
      color: "var(--primary)",
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex justify-between items-start mb-6">
          <Space size="large">
            <Avatar
              size={64}
              icon={<ShopOutlined />}
              className="bg-[var(--primary)]"
            />
            <div>
              <Title level={3} className="!mb-1">
                {shopInfo.name}
              </Title>
              <Space>
                <Tag color="blue">{shopInfo.plan.toUpperCase()}</Tag>
                <Badge
                  status={shopInfo.status === "active" ? "success" : "error"}
                  text={
                    shopInfo.status === "active"
                      ? "Đang hoạt động"
                      : "Ngừng hoạt động"
                  }
                />
              </Space>
            </div>
          </Space>
          <Button type="primary" icon={<EditOutlined />}>
            Chỉnh sửa
          </Button>
        </div>

        <Row gutter={[16, 16]}>
          {stats.map((stat, index) => (
            <Col xs={24} sm={8} key={index}>
              <Card className="text-center">
                <Statistic
                  title={stat.title}
                  value={stat.value}
                  prefix={stat.prefix}
                  valueStyle={{ color: stat.color }}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      <Card>
        <Tabs activeKey={activeTab} onChange={setActiveTab} items={itemsTab} />
        {contentByTab[activeTab as Tab]}
      </Card>
    </div>
  );
};

export default ShopDetail;
