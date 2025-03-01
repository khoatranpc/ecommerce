"use client";
import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  DashboardOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { Button, Image, Layout, Menu, theme } from "antd";
import UserComponent from "../components/UserComponent";
import { useCheckCurrentRoleUser } from "../utils/hooks";
import { Role } from "../types/enum";
import { useRouter } from "next/navigation";

const { Header, Sider, Content } = Layout;

const ShopManagementLayout = (props: { children: React.ReactNode }) => {
  useCheckCurrentRoleUser(Role.shop);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();
  return (
    <Layout className="!min-h-screen">
      <Sider
        theme="light"
        className="shadow-sm"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="demo-logo-vertical flex justify-center my-4">
          <Image
            preview={false}
            alt="Logo"
            src="/static/logo-short.png"
            className="!h-[50px] !w-auto"
          />
        </div>
        <Menu
          theme="light"
          mode="inline"
          items={[
            {
              key: "dashboard",
              icon: <DashboardOutlined />,
              label: "Dashboard",
            },
            {
              key: "products",
              icon: <ShoppingOutlined />,
              label: "Sản phẩm",
            },
            {
              key: "orders",
              icon: <ShoppingCartOutlined />,
              label: "Đơn hàng",
            },
            {
              key: "categories",
              icon: <AppstoreOutlined />,
              label: "Danh mục",
            },
            {
              key: "shop",
              icon: <ShopOutlined />,
              label: "Cửa hàng",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{ padding: 0, background: colorBgContainer }}
          className="!flex justify-between"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <UserComponent
            menuItems={[
              {
                key: "1",
                label: "Đăng xuất",
                onClick() {
                  localStorage.removeItem("access_token");
                  window.location.assign("/");
                },
              },
            ]}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ShopManagementLayout;
