import React, { memo, useMemo } from "react";
import { ColumnType } from "antd/es/table";
import { Table, Space, Typography, Tag, Tooltip, Button, Image } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
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
    (): ColumnType[] => [
      {
        title: "Sản phẩm",
        key: "product",
        width: 300,
        render: (record: IObj) => (
          <Space>
            <Image
              src={record.images?.[0] ?? ""}
              alt={record.name}
              width={60}
              height={60}
              className="object-cover"
              preview={false}
            />
            <div>
              <Text strong className="block">
                {record.name}{" "}
                <small>({record.variants?.length} phân loại)</small>
              </Text>
              <Text type="secondary">SKU: {record.sku}</Text>
            </div>
          </Space>
        ),
      },
      {
        title: "Giá bán",
        key: "price",
        width: 150,
        render: (record: IObj) => {
          const mapListPriceOfProduct = [
            Number(record.price) ?? 0,
            ...(record.variants as IObj[]).map(
              (item) => Number(item.price) ?? 0
            ),
          ].sort((a, b) => a - b);
          return (
            <div className="flex gap-2 items-center">
              <Text strong className="text-[var(--primary)] block">
                {mapListPriceOfProduct[0]?.toLocaleString()} ₫
              </Text>
              {mapListPriceOfProduct.length > 1 && (
                <span className="text-[1rem]">~</span>
              )}
              <Text strong className="text-[var(--primary)] block">
                {mapListPriceOfProduct[
                  mapListPriceOfProduct.length - 1
                ].toLocaleString()}{" "}
                ₫
              </Text>
            </div>
          );
        },
      },
      {
        title: "Tồn kho",
        dataIndex: "stock",
        key: "stock",
        width: 100,
        render: (stock: number) => {
          return <Tag color={stock > 10 ? "blue" : "warning"}>{stock}</Tag>;
        },
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
            <Tooltip title="Xem chi tiết">
              <Button
                type="text"
                icon={<EyeOutlined />}
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

export default memo(ProductTable, (prevProps, nextProps) => {
  if (
    prevProps.data !== nextProps.data ||
    prevProps.loading !== nextProps.loading ||
    JSON.stringify(prevProps.pagination) !==
      JSON.stringify(nextProps.pagination)
  )
    return false;
  return true;
});
