"use client";
import React, { useEffect, useState } from "react";
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
import {
  useCheckCurrentRoleUser,
  useCurrentUser,
  useGetShopDetailByOwnerId,
} from "../utils/hooks";
import { Role } from "../types/enum";
import { useRouter } from "next/navigation";
import { queryShopInfoByOwnerId } from "../utils/graphql-queries";
interface Window {
  localStorage: Storage;
}

declare const localStorage: Storage;
const { Header, Sider, Content } = Layout;

const ShopManagementLayout = (props: { children: React.ReactNode }) => {
  useCheckCurrentRoleUser(Role.shop);
  const currentUser = useCurrentUser();
  const getShopInfo = useGetShopDetailByOwnerId();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();
  useEffect(() => {
    if (!getShopInfo.data) {
      getShopInfo.query({
        query: queryShopInfoByOwnerId,
        variables: {
          input: {
            ownerId: currentUser.data?.getCurrentUser?._id as string,
          },
        },
      });
    }
  }, []);

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
              onClick() {
                router.push("/shop-management");
              },
            },
            {
              key: "products",
              icon: <ShoppingOutlined />,
              label: "Sản phẩm",
              onClick() {
                router.push("/shop-management/products");
              },
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
              onClick() {
                router.push("/shop-management/categories");
              },
            },
            {
              key: "shop",
              icon: <ShopOutlined />,
              label: "Cửa hàng",
              onClick() {
                router.push("/shop-management/my-shop");
              },
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
                  if (typeof window !== "undefined") {
                    localStorage.removeItem("access_token");
                    window.location.assign("/");
                  }
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
