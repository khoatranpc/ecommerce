"use client";
import React, { useState } from "react";
import {
  Input,
  Row,
  Col,
  Card,
  Button,
  Space,
  Select,
  Typography,
  Tag,
  Badge,
  Image,
  Pagination,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  FilterOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;
const { Meta } = Card;

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  status: "in_stock" | "out_of_stock" | "low_stock";
  quantity: number;
}

const ProductCard = ({ product }: { product: Product }) => {
  const statusConfig = {
    in_stock: { color: "success", text: "Còn hàng" },
    out_of_stock: { color: "error", text: "Hết hàng" },
    low_stock: { color: "warning", text: "Sắp hết" },
  };

  return (
    <Card
      hoverable
      className="h-[350px] flex flex-col"
      cover={
        <Image
          src={product.image}
          alt={product.name}
          className="object-fit p-4 !h-[200px]"
          preview={false}
        />
      }
      actions={[
        <Button key="view" type="text" icon={<EyeOutlined />} />,
        <Button key="edit" type="text" icon={<EditOutlined />} />,
        <Button key="delete" type="text" danger icon={<DeleteOutlined />} />,
      ]}
    >
      <Meta
        title={
          <div className="font-medium text-base mb-2 line-clamp-1 tex-wrap">
            {product.name}
          </div>
        }
        description={
          <Space direction="vertical" className="w-full">
            <div className="flex items-center justify-between">
              <Tag color="blue">{product.category}</Tag>
              <Tag icon={<ShoppingOutlined />}>{product.quantity}</Tag>
            </div>
            <Text strong className="text-lg text-[var(--primary)]">
              {product.price.toLocaleString()}₫
            </Text>
          </Space>
        }
      />
    </Card>
  );
};

const ListProduct = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Mock data
  const products: Product[] = Array.from({ length: 50 }, (_, i) => ({
    id: i.toString(),
    name: `iPhone 14 Pro Max 256GB Chính hãng VN/A ${i + 1}`,
    price: Math.floor(Math.random() * 1000000) + 100000,
    image: "https://picsum.photos/200/300",
    category: ["Điện thoại", "Máy tính", "Phụ kiện"][i % 3],
    status: ["in_stock", "out_of_stock", "low_stock"][i % 3] as any,
    quantity: Math.floor(Math.random() * 100),
  }));

  const pageSize = 12;
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase()) &&
      (categoryFilter === "all" || product.category === categoryFilter)
  );
  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="space-y-6">
      <Card>
        <div className="mb-6 flex flex-wrap gap-4 justify-between items-center">
          <Title level={3} className="!mb-0">
            Danh sách sản phẩm ({filteredProducts.length})
          </Title>
          <Button type="primary" icon={<PlusOutlined />}>
            Thêm sản phẩm
          </Button>
        </div>

        <div className="flex flex-wrap gap-4">
          <Input
            placeholder="Tìm kiếm sản phẩm..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="max-w-md"
            allowClear
          />
          <Select
            defaultValue="all"
            style={{ width: 200 }}
            onChange={(value) => setCategoryFilter(value)}
            prefix={<FilterOutlined />}
          >
            <Option value="all">Tất cả danh mục</Option>
            <Option value="Điện thoại">Điện thoại</Option>
            <Option value="Máy tính">Máy tính</Option>
            <Option value="Phụ kiện">Phụ kiện</Option>
          </Select>
        </div>
      </Card>

      <Row gutter={[16, 16]} className="mt-4">
        {currentProducts.map((product) => (
          <Col xs={24} sm={16} md={12} lg={6} key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>

      {totalPages > 1 && (
        <Card className="text-center">
          <Pagination
            current={currentPage}
            total={filteredProducts.length}
            pageSize={pageSize}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger
            showTotal={(total) => `Tổng ${total} sản phẩm`}
          />
        </Card>
      )}
    </div>
  );
};

export default ListProduct;
