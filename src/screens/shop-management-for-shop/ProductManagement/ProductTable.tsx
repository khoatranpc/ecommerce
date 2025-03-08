import React, { memo, useMemo } from "react";
import { Table, Space, Typography, Tag, Tooltip, Button, Image } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import EmptyData from "@/src/components/EmptyData";
import { IObj } from "@/src/types";

const { Text } = Typography;

interface ProductTableProps {
  data?: IObj[];
  loading?: boolean;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
  onPaginationChange: (page: number, pageSize: number) => void;
  onEdit?: (record: IObj) => void;
  onDelete?: (record: IObj) => void;
  onCreateNew?: () => void;
}

const ProductTable = ({
  data = [],
  loading,
  pagination,
  onPaginationChange,
  onEdit,
  onDelete,
  onCreateNew,
}: ProductTableProps) => {
  const columns = useMemo(
    () => [
      {
        title: "Sản phẩm",
        key: "product",
        width: 300,
        render: (record: IObj) => (
          <Space>
            <Image
              src={record.image}
              alt={record.name}
              width={60}
              height={60}
              className="object-cover"
              preview={false}
            />
            <div>
              <Text strong className="block">
                {record.name}
              </Text>
              <Text type="secondary">SKU: {record.id}</Text>
            </div>
          </Space>
        ),
      },
      {
        title: "Giá bán",
        key: "price",
        width: 150,
        render: (record: IObj) => (
          <div>
            <Text strong className="text-[var(--primary)] block">
              {record.price?.toLocaleString()}₫
            </Text>
            {record.originalPrice > record.price && (
              <Text delete type="secondary" className="text-sm">
                {record.originalPrice?.toLocaleString()}₫
              </Text>
            )}
          </div>
        ),
      },
      {
        title: "Tồn kho",
        dataIndex: "stock",
        key: "stock",
        width: 100,
        render: (stock: number) => (
          <Tag color={stock > 10 ? "blue" : "warning"}>{stock}</Tag>
        ),
      },
      {
        title: "Đã bán",
        dataIndex: "sold",
        key: "sold",
        width: 100,
      },
      {
        title: "Danh mục",
        dataIndex: "category",
        key: "category",
        width: 120,
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        width: 120,
        render: (status: string) => {
          const config = {
            active: { color: "success", text: "Đang bán" },
            inactive: { color: "default", text: "Đã ẩn" },
            out_of_stock: { color: "error", text: "Hết hàng" },
          };
          return (
            <Tag color={config[status as keyof typeof config].color}>
              {config[status as keyof typeof config].text}
            </Tag>
          );
        },
      },
      {
        title: "Thao tác",
        key: "actions",
        width: 120,
        render: (_: any, record: IObj) => (
          <Space>
            <Tooltip title="Chỉnh sửa">
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => onEdit?.(record)}
              />
            </Tooltip>
            <Tooltip title="Xóa">
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => onDelete?.(record)}
              />
            </Tooltip>
          </Space>
        ),
      },
    ],
    [onEdit, onDelete]
  );

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      loading={loading}
      pagination={{
        ...pagination,
        showSizeChanger: true,
        showTotal: (total) => `Tổng ${total} sản phẩm`,
      }}
      onChange={(pagination) => {
        onPaginationChange(pagination.current!, pagination.pageSize!);
      }}
      scroll={{ x: true }}
      locale={{
        emptyText: (
          <EmptyData
            description="Không có sản phẩm nào"
            renderAction={
              onCreateNew && (
                <Button type="primary" onClick={onCreateNew}>
                  Thêm sản phẩm mới
                </Button>
              )
            }
          />
        ),
      }}
    />
  );
};

export default memo(ProductTable);