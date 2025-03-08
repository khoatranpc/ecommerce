"use client";
import React, { useState } from "react";
import { Input, Button, Space, Typography, Select, Card, Row, Col } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  ReloadOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { useGetShopDetailByOwnerId } from "@/src/utils/hooks";
import { IObj, IQueryPaginate } from "@/src/types";
import ProductTable from "./ProductTable";

const { Title } = Typography;
const { Option } = Select;

const mapQuery = (
  shopId: string,
  keyword = "",
  paginate: IQueryPaginate = {
    limit: 10,
    page: 1,
  }
) => {
  return {
    query: ``,
    variables: {
      input: {
        filter: {
          shop: [shopId],
          keyword: keyword,
        },
        paginate: {
          limit: Number(paginate.limit),
          page: Number(paginate.page),
        },
      },
    },
  };
};

// Add mock data
const mockProducts = Array.from({ length: 50 }, (_, i) => ({
  id: `${i + 1}`,
  name: `Sản phẩm ${i + 1}`,
  image: "https://picsum.photos/200/300",
  price: Math.floor(Math.random() * 1000000) + 100000,
  originalPrice: Math.floor(Math.random() * 1000000) + 200000,
  stock: Math.floor(Math.random() * 100),
  sold: Math.floor(Math.random() * 50),
  category: ["Điện thoại", "Máy tính", "Phụ kiện"][i % 3],
  status: ["active", "inactive", "out_of_stock"][i % 3],
  createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
}));

const mockResponse = {
  data: {
    getProducts: {
      data: mockProducts,
      paginate: {
        page: 1,
        limit: 10,
        total: mockProducts.length,
      },
    },
  },
  isPending: false,
};

const ListProduct = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchText, setSearchText] = useState(
    searchParams.get("keyword") || ""
  );
  const [keyword] = useDebounce(searchText, 1000);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Replace products hook with mock data
  const products = {
    data: mockResponse.data,
    isPending: mockResponse.isPending,
    query: () => {
      console.log("Mock query called");
    },
  };

  const currentShop = useGetShopDetailByOwnerId();
  const shopId = currentShop.data?.getShopByOwnerId?._id;

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const handlePaginationChange = (page: number, pageSize: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", String(page));
    newParams.set("limit", String(pageSize));
    router.push(`?${newParams.toString()}`);
  };

  const handleRefresh = () => {
    if (shopId) {
      // products.query(mapQuery(shopId, keyword, { page, limit }));
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <div className="mb-6 flex flex-wrap gap-4 justify-between items-center">
          <Title level={3} className="!mb-0">
            Danh sách sản phẩm (
            {products.data?.getProducts?.paginate?.total ?? 0})
          </Title>
          <Space>
            <Button icon={<ReloadOutlined />} onClick={handleRefresh}>
              Làm mới
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                router.push("/shop-management/products/create");
              }}
            >
              Thêm sản phẩm
            </Button>
          </Space>
        </div>

        <Row gutter={[16, 16]} className="mb-4">
          <Col xs={24} sm={8} md={6}>
            <Input
              placeholder="Tìm kiếm sản phẩm..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={8} md={6}>
            <Select
              className="w-full"
              value={selectedCategory}
              onChange={setSelectedCategory}
              placeholder="Lọc theo danh mục"
              suffixIcon={<FilterOutlined />}
            >
              <Option value="all">Tất cả danh mục</Option>
              <Option value="phone">Điện thoại</Option>
              <Option value="laptop">Máy tính</Option>
              <Option value="accessory">Phụ kiện</Option>
            </Select>
          </Col>
          <Col xs={24} sm={8} md={6}>
            <Select
              className="w-full"
              value={selectedStatus}
              onChange={setSelectedStatus}
              placeholder="Lọc theo trạng thái"
              suffixIcon={<FilterOutlined />}
            >
              <Option value="all">Tất cả trạng thái</Option>
              <Option value="active">Đang bán</Option>
              <Option value="inactive">Đã ẩn</Option>
              <Option value="out_of_stock">Hết hàng</Option>
            </Select>
          </Col>
        </Row>

        <ProductTable
          data={products.data?.getProducts?.data}
          loading={products.isPending}
          pagination={{
            current: page,
            pageSize: limit,
            total: products.data?.getProducts?.paginate?.total ?? 0,
          }}
          onPaginationChange={handlePaginationChange}
          onEdit={(record) => console.log("Edit:", record)}
          onDelete={(record) => console.log("Delete:", record)}
          onCreateNew={() => console.log("Create new")}
        />
      </Card>
    </div>
  );
};

export default ListProduct;
