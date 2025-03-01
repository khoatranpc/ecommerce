import { Badge, Table } from "antd";
import React from "react";

const ListOrder = () => {
  const orderColumns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "orderNumber",
      key: "orderNumber",
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Giá trị",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `₫${amount.toLocaleString()}`,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Badge
          status={
            {
              completed: "success",
              pending: "processing",
              cancelled: "error",
            }[status] as any
          }
          text={
            {
              completed: "Hoàn thành",
              pending: "Đang xử lý",
              cancelled: "Đã hủy",
            }[status]
          }
        />
      ),
    },
    {
      title: "Ngày đặt",
      dataIndex: "date",
      key: "date",
    },
  ];

  const recentOrders = [
    {
      key: "1",
      orderNumber: "#12345",
      customer: "Customer 1",
      amount: 1200000,
      status: "completed",
      date: "2024-01-15",
    },
    // ... more orders
  ];

  return (
    <Table
      columns={orderColumns}
      dataSource={recentOrders}
      pagination={{ pageSize: 5 }}
    />
  );
};

export default ListOrder;
