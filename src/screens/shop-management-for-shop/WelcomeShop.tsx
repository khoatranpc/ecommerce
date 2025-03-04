"use client";
import React, { useEffect, useMemo } from "react";
import {
  Card,
  Typography,
  Button,
  Empty,
  Row,
  Col,
  Statistic,
  Space,
} from "antd";
import {
  ShopOutlined,
  RocketOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { useCurrentUser, useGetShopDetailByOwnerId } from "@/src/utils/hooks";
import { queryShopInfoByOwnerId } from "@/src/utils/graphql-queries";
import { IObj } from "@/src/types";
import Loading from "@/src/components/Loading";
import { useRouter } from "next/navigation";

const { Title, Text, Paragraph } = Typography;

const WelcomeShop = () => {
  const shopInfo = useGetShopDetailByOwnerId();
  const getShopInfo = shopInfo.data?.getShopByOwnerId as IObj;
  const currentUser = useCurrentUser();
  const router = useRouter();
  // Mock data - replace with actual data from your backend
  const hasShopInfo = false; // Toggle this to see different views
  const shopData = {
    name: "Shop Name",
    totalOrders: 150,
    totalCustomers: 89,
    totalRevenue: 12500000,
  };
  useEffect(() => {
    if (currentUser.data.getCurrentUser) {
      if (!shopInfo.data?.getShopByOwnerId && !shopInfo.isFetched) {
        shopInfo.query({
          query: queryShopInfoByOwnerId,
          variables: {
            input: {
              ownerId: currentUser.data?.getCurrentUser?._id as string,
            },
          },
        });
      }
    }
  }, [currentUser.data, shopInfo.data]);
  const NoShopView = useMemo(
    () => (
      <Card className="text-center w-full mx-auto !border-none">
        <Empty
          image={<ShopOutlined className="text-8xl !text-[var(--primary)]" />}
          description={false}
        >
          <div className="space-y-4 mt-8">
            <Title level={2}>Chào mừng đến với hệ thống</Title>
            <Paragraph className="text-gray-500">
              Bắt đầu hành trình kinh doanh của bạn bằng cách thiết lập thông
              tin cửa hàng. Chúng tôi sẽ giúp bạn xây dựng cửa hàng trực tuyến
              một cách dễ dàng và chuyên nghiệp.
            </Paragraph>
            <Space direction="vertical" size="large" className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="text-center">
                  <div className="flex items-center gap-4 justify-center">
                    <RocketOutlined className="text-2xl text-[var(--primary)]" />
                    <Text strong>Dễ dàng thiết lập</Text>
                  </div>
                </Card>
                <Card className="text-center">
                  <div className="flex items-center gap-4 justify-center">
                    <ShoppingCartOutlined className="text-2xl text-[var(--primary)]" />
                    <Text strong>Quản lý đơn hàng</Text>
                  </div>
                </Card>
                <Card className="text-center">
                  <div className="flex items-center gap-4 justify-center">
                    <UserOutlined className="text-2xl text-[var(--primary)]" />
                    <Text strong>Chăm sóc khách hàng</Text>
                  </div>
                </Card>
              </div>
              <Button
                color="primary"
                variant="outlined"
                size="large"
                icon={<ShopOutlined />}
                onClick={() => {
                  router.push("/shop-management/my-shop");
                }}
              >
                <span className="text-md">Tạo cửa hàng ngay</span>
              </Button>
            </Space>
          </div>
        </Empty>
      </Card>
    ),
    []
  );

  const ExistingShopView = () => (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden">
            <Image
              src="/static/shop-avatar.png"
              alt="Shop Avatar"
              fill
              className="object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <Title level={2} className="">
              Chào mừng trở lại, {shopData.name}!
            </Title>
            <Text type="secondary">
              Hãy xem những cập nhật mới nhất của cửa hàng bạn nhé
            </Text>
          </div>
        </div>
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Tổng đơn hàng"
              value={shopData.totalOrders}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: "var(--primary)" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Khách hàng"
              value={shopData.totalCustomers}
              prefix={<UserOutlined />}
              valueStyle={{ color: "var(--primary)" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Doanh thu"
              value={shopData.totalRevenue}
              prefix={<DollarOutlined />}
              suffix="₫"
              valueStyle={{ color: "var(--primary)" }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={16}>
          <Card title="Đơn hàng gần đây" className="h-full">
            {/* Add recent orders component here */}
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Thông báo" className="h-full">
            {/* Add notifications component here */}
          </Card>
        </Col>
      </Row>
    </div>
  );

  return (!getShopInfo && !shopInfo.isFetched) || shopInfo.isPending ? (
    <Loading />
  ) : !getShopInfo && shopInfo.isFetched ? (
    NoShopView
  ) : (
    <ExistingShopView />
  );
};

export default WelcomeShop;
