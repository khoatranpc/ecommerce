"use client";
import React, { useState } from "react";
import { Layout, Menu, Button, theme, Avatar } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { ComponentProps } from "../types";
import Image from "next/image";
import Link from "next/link";
import { ItemType } from "antd/es/menu/interface";
import { useCheckCurrentRoleUser } from "../utils/hooks";
import { Role } from "../types/enum";

const { Header, Sider, Content } = Layout;

const AdminLayout = ({ children }: ComponentProps) => {
  useCheckCurrentRoleUser(Role.admin);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems: ItemType[] = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: (
        <Link href="/admin" className="font-bold">
          Dashboard
        </Link>
      ),
    },
    {
      key: "shops",
      icon: <UserOutlined />,
      label: (
        <Link href="/admin/shops" className="!text-black font-bold">
          Shop
        </Link>
      ),
      children: [
        {
          key: "shop_list",
          icon: <FileTextOutlined />,
          label: (
            <Link href="/admin/shops" className="font-bold">
              Danh sách
            </Link>
          ),
        },
      ],
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: (
        <Link href="/admin/settings" className="font-bold">
          Cài đặt
        </Link>
      ),
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Sider
        trigger={null}
        collapsible
        theme="light"
        collapsed={collapsed}
        className="overflow-auto h-screen fixed left-0 top-0 bottom-0"
      >
        <div className="p-4 flex items-center justify-center">
          <Image
            src="/static/logo-short.png"
            alt="Logo"
            width={40}
            height={40}
            className="w-auto h-auto"
          />
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          items={menuItems}
        />
      </Sider>

      <Layout className={`transition-all duration-300`}>
        <Header
          style={{ background: colorBgContainer }}
          className="!px-2 flex items-center justify-between fixed right-0 top-0 z-10 w-full shadow-sm"
        >
          <div className="flex items-center flex-1">
            <div className="flex items-center justify-start gap-3">
              <Image
                src="/static/logo-short.png"
                alt="Logo"
                width={150}
                height={50}
                className="w-auto h-13"
              />
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                className="ml-4"
              />

              <div className="h-6 w-[1px] bg-gray-200"></div>
              <span className="text-lg font-medium text-gray-700">
                Admin Dashboard
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium">Admin User</div>
                <div className="text-xs text-gray-500">admin@example.com</div>
              </div>
              <Avatar
                size="large"
                icon={<UserOutlined />}
                className="bg-[var(--primary)] flex items-center justify-center"
              />
            </div>
            <div className="px-4 py-2 flex items-center gap-3">
              <Button
                type="text"
                icon={<LogoutOutlined />}
                danger
                className="hover:bg-red-50"
                onClick={() => {
                  localStorage.removeItem("access_token");
                  window.location.assign("/");
                }}
              >
                Đăng xuất
              </Button>
            </div>
          </div>
        </Header>

        <Content
          style={{
            margin: "88px 24px 24px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
