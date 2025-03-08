"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Input, Button, Space, Typography, Select, Card, Row, Col } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  ReloadOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { useGetShopDetailByOwnerId, useProducts } from "@/src/utils/hooks";
import { IObj, IQueryPaginate } from "@/src/types";
import ProductTable from "./ProductTable";
import { queryProducts } from "@/src/utils/graphql-queries";

const { Title } = Typography;
const { Option } = Select;

const mapQuery = (
  query: string,
  filter: IObj,
  paginate: IQueryPaginate = {
    limit: 10,
    page: 1,
  }
) => {
  return {
    query: query,
    variables: {
      input: {
        filter: {
          ...filter,
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

const ListProduct = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const products = useProducts();
  const getDataProducts = (products.data?.getProducts?.data as IObj[]) ?? [];
  const [searchText, setSearchText] = useState(
    searchParams.get("keyword") || ""
  );
  const [keyword] = useDebounce(searchText, 1000);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const currentShop = useGetShopDetailByOwnerId();
  const shopId = currentShop.data?.getShopByOwnerId?._id;

  const page =
    Number(searchParams.get("page")) !== 0
      ? Number(searchParams.get("page"))
      : products.payloadQuery?.variables?.input?.paginate?.page ?? 1;
  const limit =
    Number(searchParams.get("limit")) !== 0
      ? Number(searchParams.get("limit"))
      : products.payloadQuery?.variables?.input?.paginate?.limit ?? 10;

  const handlePaginationChange = (page: number, pageSize: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", String(page));
    newParams.set("limit", String(pageSize));
    router.push(`?${newParams.toString()}`);
  };
  const queryParams = useMemo(() => {
    return {
      page: Number(page),
      limit: Number(limit),
    } as IQueryPaginate;
  }, [page, limit]);

  const handleRefresh = () => {
    if (shopId) {
      products.query(
        mapQuery(
          queryProducts,
          {
            ...(products.payloadQuery?.variables?.input?.filter as IObj),
          },
          {
            ...(products.payloadQuery?.variables?.input?.paginate as any),
          }
        )
      );
    }
  };
  useEffect(() => {
    if (currentShop.data?.getShopByOwnerId) {
      products.query(
        mapQuery(
          queryProducts,
          {
            ...(products.payloadQuery?.variables?.input?.filter as IObj),
            shop: [shopId],
            keywords: keyword,
          },
          queryParams
        )
      );
    }
  }, [currentShop.data, queryParams, keyword]);

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
          data={getDataProducts}
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
