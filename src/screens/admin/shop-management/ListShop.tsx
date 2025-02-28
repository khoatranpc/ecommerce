"use client";
import React, { useState } from "react";
import {
  Table,
  Card,
  Input,
  Button,
  Tag,
  Space,
  Select,
  Typography,
  Badge,
  Tooltip,
  Avatar,
} from "antd";
import {
  SearchOutlined,
  ShopOutlined,
  UserOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  ReloadOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import type { TableProps } from "antd";

const { Title } = Typography;
const { Option } = Select;

interface ShopData {
  key: string;
  name: string;
  owner: string;
  phone: string;
  address: string;
  status: "active" | "inactive" | "pending";
  plan: "basic" | "premium" | "enterprise";
  createdAt: string;
}

const ListShop = () => {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [planFilter, setPlanFilter] = useState<string[]>([]);

  // Mock data
  const data: ShopData[] = Array.from({ length: 100 }, (_, i) => ({
    key: i.toString(),
    name: `Shop ${i + 1}`,
    owner: `Owner ${i + 1}`,
    phone: `0123456${i.toString().padStart(3, "0")}`,
    address: `Địa chỉ ${i + 1}, TP.HCM`,
    status: ["active", "inactive", "pending"][i % 3] as ShopData["status"],
    plan: ["basic", "premium", "enterprise"][i % 3] as ShopData["plan"],
    createdAt: new Date(2024, 0, i + 1).toLocaleDateString("vi-VN"),
  }));

  const statusColors = {
    active: "success",
    inactive: "error",
    pending: "warning",
  };

  const planColors = {
    basic: "blue",
    premium: "purple",
    enterprise: "gold",
  };

  const columns: TableProps<ShopData>["columns"] = [
    {
      title: "Tên cửa hàng",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <Space>
          <Avatar icon={<ShopOutlined />} className="bg-[var(--primary)]" />
          <span className="font-medium">{text}</span>
        </Space>
      ),
    },
    {
      title: "Chủ sở hữu",
      dataIndex: "owner",
      key: "owner",
      render: (text) => (
        <Space>
          <UserOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: "Liên hệ",
      dataIndex: "phone",
      key: "phone",
      render: (text) => (
        <Space direction="vertical" size="small">
          <Space>
            <PhoneOutlined />
            {text}
          </Space>
          <Space>
            <EnvironmentOutlined className="text-gray-400" />
            <span className="text-gray-500 text-sm">TP.HCM</span>
          </Space>
        </Space>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Badge
          status={statusColors[status as keyof typeof statusColors] as any}
          text={status}
        />
      ),
      filters: [
        { text: "Hoạt động", value: "active" },
        { text: "Ngừng hoạt động", value: "inactive" },
        { text: "Chờ duyệt", value: "pending" },
      ],
    },
    {
      title: "Gói dịch vụ",
      dataIndex: "plan",
      key: "plan",
      render: (plan) => (
        <Tag color={planColors[plan as keyof typeof planColors]}>{plan}</Tag>
      ),
      filters: [
        { text: "Cơ bản", value: "basic" },
        { text: "Nâng cao", value: "premium" },
        { text: "Doanh nghiệp", value: "enterprise" },
      ],
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => (
        <Space>
          <CalendarOutlined />
          {date}
        </Space>
      ),
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space>
          <Tooltip title="Xem chi tiết">
            <Button type="text" icon={<EyeOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <Title level={3} className="!mb-0">
          Danh sách cửa hàng
        </Title>
        <Button icon={<ReloadOutlined />}>Làm mới</Button>
      </div>

      <div className="mb-6 flex gap-4">
        <Input
          placeholder="Tìm kiếm theo tên cửa hàng, chủ sở hữu..."
          prefix={<SearchOutlined />}
          className="max-w-md"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
        />
      </div>

      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          total: data.length,
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Tổng ${total} cửa hàng`,
        }}
        scroll={{ x: true }}
      />
    </div>
  );
};

export default ListShop;
