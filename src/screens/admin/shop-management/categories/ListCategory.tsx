"use client";
import React, { useState } from "react";
import {
  Card,
  Table,
  Button,
  Input,
  Space,
  Tag,
  Typography,
  Tooltip,
  Badge,
  Modal,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  FolderOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { confirm } = Modal;

interface Category {
  id: string;
  name: string;
  description: string;
  productCount: number;
  status: "active" | "inactive";
  createdAt: string;
}

const ListCategory = () => {
  const [searchText, setSearchText] = useState("");

  // Mock data
  const categories: Category[] = Array.from({ length: 20 }, (_, i) => ({
    id: i.toString(),
    name: `Danh mục ${i + 1}`,
    description: `Mô tả cho danh mục ${i + 1}`,
    productCount: Math.floor(Math.random() * 100),
    status: i % 3 === 0 ? "inactive" : "active",
    createdAt: new Date(2024, 0, i + 1).toLocaleDateString("vi-VN"),
  }));

  const handleDelete = (id: string) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa danh mục này?",
      icon: <ExclamationCircleOutlined />,
      content: "Hành động này không thể hoàn tác",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        console.log("Delete category:", id);
      },
    });
  };

  const columns = [
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <Space>
          <FolderOutlined className="text-[var(--primary)]" />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (text: string) => (
        <Text className="line-clamp-2">{text}</Text>
      ),
    },
    {
      title: "Số sản phẩm",
      dataIndex: "productCount",
      key: "productCount",
      render: (count: number) => (
        <Tag color="blue">{count} sản phẩm</Tag>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Badge
          status={status === "active" ? "success" : "error"}
          text={status === "active" ? "Đang hoạt động" : "Ngừng hoạt động"}
        />
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_: any, record: Category) => (
        <Space>
          <Tooltip title="Chỉnh sửa">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => console.log("Edit:", record.id)}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Card>
      <div className="mb-6 flex flex-wrap gap-4 justify-between items-center">
        <Title level={3} className="!mb-0">
          Danh mục sản phẩm ({filteredCategories.length})
        </Title>
        <Button type="primary" icon={<PlusOutlined />}>
          Thêm danh mục
        </Button>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Tìm kiếm danh mục..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="max-w-md"
          allowClear
        />
      </div>

      <Table
        columns={columns}
        dataSource={filteredCategories}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Tổng ${total} danh mục`,
        }}
      />
    </Card>
  );
};

export default ListCategory;
