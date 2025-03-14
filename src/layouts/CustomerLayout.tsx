"use client";
import {
  Badge,
  Button,
  Dropdown,
  Image,
  Layout,
  Space,
  Tooltip,
  Typography,
} from "antd";
import { Header, Content, Footer } from "antd/es/layout/layout";
import { useRouter } from "next/navigation";
import {
  BellOutlined,
  HeartOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  DownloadOutlined,
  ShopOutlined,
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import React, { useEffect } from "react";
import { useCheckCurrentRoleUser, useCurrentUser } from "../utils/hooks";
import { IObj } from "../types";
import { Role } from "../types/enum";
import QuickSearch from "../components/customer/QuickSearch";
import ChatBox from "../components/customer/ChatBox";

const { Title, Text } = Typography;

interface Props {
  children: React.ReactNode;
}

const CustomerLayout = (props: Props) => {
  useCheckCurrentRoleUser(Role.customer);
  const currentUser = useCurrentUser();
  const getCurrentUser = currentUser.data?.getCurrentUser as IObj;
  const router = useRouter();
  return (
    <Layout className="min-h-screen">
      <Header className="!bg-white backdrop-blur-sm sticky top-0 px-0 w-full z-50 !h-fit !p-0">
        <div className="bg-[var(--primary)]">
          <div className="max-w-7xl mx-auto px-4 py-1.5">
            <div className="flex justify-end items-center gap-8 text-white/90 text-sm">
              <button className="hover:text-white transition-all flex items-center gap-2 group cursor-ponter">
                <DownloadOutlined className="group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Tải ứng dụng</span>
              </button>
              <button className="hover:text-white transition-all flex items-center gap-2 group cursor-ponter">
                <ShopOutlined className="group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Kênh người bán</span>
              </button>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center h-16">
              <div className="flex-shrink-0 mr-12 flex items-center gap-2">
                <Image
                  className="!w-14"
                  src="/static/shopping-mall.png"
                  preview={false}
                />
                <Title level={3} className="!mb-0 whitespace-nowrap">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 hover:to-pink-600 transition-all cursor-pointer">
                    Shopping Mall
                  </span>
                </Title>
              </div>
              <QuickSearch />

              <div className="flex items-center gap-6 ml-8">
                <Badge count={3} color="#4F46E5">
                  <button className="group p-2 hover:bg-gray-50 rounded-full transition-all">
                    <BellOutlined className="text-xl text-gray-600 group-hover:text-indigo-600 transition-colors" />
                  </button>
                </Badge>
                <Badge count={2} color="#4F46E5">
                  <button className="group p-2 hover:bg-gray-50 rounded-full transition-all">
                    <HeartOutlined className="text-xl text-gray-600 group-hover:text-indigo-600 transition-colors" />
                  </button>
                </Badge>
                <Badge count={5} color="#4F46E5">
                  <button className="group p-2 hover:bg-gray-50 rounded-full transition-all">
                    <ShoppingCartOutlined className="text-xl text-gray-600 group-hover:text-indigo-600 transition-colors" />
                  </button>
                </Badge>
                {getCurrentUser ? (
                  <Dropdown
                    openClassName="!bg-red"
                    arrow
                    menu={{
                      items: [
                        {
                          key: "Info",
                          label: "Thông tin cá nhân",
                        },
                        {
                          key: "Purchase",
                          label: "Đơn hàng của tôi",
                        },
                        {
                          key: "Logout",
                          label: "Đăng xuất",
                          onClick() {
                            localStorage.removeItem("access_token");
                            window.location.assign("/shopping");
                          },
                        },
                      ],
                    }}
                  >
                    <Button
                      type="primary"
                      icon={<UserOutlined />}
                      size="large"
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 border-none hover:opacity-90 ml-2"
                    >
                      <span className="hidden sm:inline ml-1">
                        {getCurrentUser.name ?? "User"}
                      </span>
                    </Button>
                  </Dropdown>
                ) : (
                  <Button
                    type="primary"
                    icon={<UserOutlined />}
                    size="large"
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 border-none hover:opacity-90 ml-2"
                    onClick={() => {
                      router.push("/login");
                    }}
                  >
                    <span className="hidden sm:inline ml-1">{"Đăng nhập"}</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Header>
      <Content className="">
        {props.children}
        <ChatBox />
      </Content>

      <Footer className="!bg-[var(--primary)] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
            <div>
              <Title level={4} className="!text-white">
                Về Shopping Mall
              </Title>
              <Text className="text-gray-300 block mb-4">
                Nền tảng thương mại điện tử hàng đầu Việt Nam, cung cấp những
                sản phẩm chất lượng từ các thương hiệu uy tín.
              </Text>
              <Space size="large">
                <FacebookOutlined className="text-2xl hover:text-blue-400 cursor-pointer transition-colors" />
                <InstagramOutlined className="text-2xl hover:text-pink-400 cursor-pointer transition-colors" />
                <YoutubeOutlined className="text-2xl hover:text-red-500 cursor-pointer transition-colors" />
              </Space>
            </div>
            <div>
              <Title level={4} className="!text-white">
                Hỗ trợ khách hàng
              </Title>
              <ul className="space-y-2 text-gray-300">
                <li className="hover:text-blue-400 cursor-pointer transition-colors">
                  Trung tâm trợ giúp
                </li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors">
                  Hướng dẫn mua hàng
                </li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors">
                  Vận chuyển
                </li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors">
                  Chính sách đổi trả
                </li>
              </ul>
            </div>
            <div>
              <Title level={4} className="!text-white">
                Dịch vụ
              </Title>
              <ul className="space-y-2 text-gray-300">
                <li className="hover:text-blue-400 cursor-pointer transition-colors">
                  Điều khoản sử dụng
                </li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors">
                  Chính sách bảo mật
                </li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors">
                  Giải quyết khiếu nại
                </li>
              </ul>
            </div>
            <div>
              <Title level={4} className="!text-white">
                Liên hệ
              </Title>
              <div className="space-y-2 text-gray-300">
                <p>Email: support@shoppingmall.com</p>
                <p>Hotline: 1900 xxxx</p>
                <p>Địa chỉ: 123 ABC Street, XYZ City</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 pb-4 text-center text-gray-400">
            © 2024 Shopping Mall. All rights reserved.
          </div>
        </div>
      </Footer>
    </Layout>
  );
};

export default CustomerLayout;
