"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Input,
  Button,
  Space,
  Typography,
  Select,
  Card,
  Row,
  Col,
  InputNumber,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  ReloadOutlined,
  FilterOutlined,
  MenuOutlined,
  InfoCircleOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { useGetShopDetailByOwnerId, useProducts } from "@/src/utils/hooks";
import { IObj, IQueryPaginate } from "@/src/types";
import ProductTable from "./ProductTable";
import { queryProducts } from "@/src/utils/graphql-queries";
import SelectCategories from "@/src/components/SelectCategories";
import SelectStatus from "@/src/components/SelectStatus";

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

const ListProduct = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const products = useProducts();
  const getDataProducts = (products.data?.getProducts?.data as IObj[]) ?? [];
  const [searchText, setSearchText] = useState(
    searchParams.get("keyword") || ""
  );
  const [filter, setFilter] = useState<IObj>({});
  const [debounceFilter] = useDebounce(filter, 2000);
  const [keyword] = useDebounce(searchText, 1000);

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

  const queryFilter = useMemo(() => {
    return {
      ...(products.payloadQuery?.variables?.input?.filter as IObj),
      ...debounceFilter,
      shop: [shopId],
      keywords: keyword,
    };
  }, [shopId, keyword, debounceFilter]);

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
      products.query(mapQuery(queryProducts, queryFilter, queryParams));
    }
  }, [currentShop.data, queryParams, keyword, queryFilter]);

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
        </Row>
        <Row gutter={[16, 16]} className="mb-4">
          <Col xs={24} sm={8} md={6}>
            <SelectCategories
              shopId={shopId}
              prefix={<MenuOutlined />}
              onChange={(value) => {
                setFilter({
                  ...filter,
                  categories: value,
                });
              }}
            />
          </Col>
          <Col xs={24} sm={8} md={6}>
            <SelectStatus
              onChange={(value) => {
                setFilter({
                  ...filter,
                  status: value,
                });
              }}
              prefix={<InfoCircleOutlined />}
            />
          </Col>
          <Col xs={24} sm={8} md={6}>
            <div className="flex items-center gap-2">
              <InputNumber
                prefix={<>$</>}
                placeholder="Giá từ"
                className="w-full"
                min={0}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              />
              <ArrowRightOutlined />
              <InputNumber
                prefix={<>$</>}
                placeholder="Đến"
                className="w-full"
                min={0}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              />
            </div>
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
