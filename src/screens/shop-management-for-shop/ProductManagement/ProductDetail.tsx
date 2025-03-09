import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Card,
  Descriptions,
  Tag,
  Image,
  Table,
  Space,
  Button,
  Typography,
  TabsProps,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { ColumnType } from "antd/es/table";
import { Tabs } from "antd";
import { useGetProductDetailBySlug } from "@/src/utils/hooks";
import { queryGetProductBySlug } from "@/src/utils/graphql-queries";
import { IObj } from "@/src/types";
import {
  mapStatusProductToColor,
  mapStatusToStatusProductString,
  Status,
} from "@/src/types/enum";
import DrawerUpdateProduct from "./DrawerUpdateProduct";

const { Title } = Typography;

const ProductDetailInfo = () => {
  const params = useParams();
  const productDetail = useGetProductDetailBySlug();
  const getProductDetail = (productDetail.data?.getProductBySlug as IObj) ?? {};

  const variantColumns: ColumnType[] = [
    {
      title: "Tên phân loại",
      dataIndex: "name",
      key: "name",
      render(value, record, index) {
        return (
          <div className="flex items-center gap-2">
            <Image
              className="!w-10 !h-10"
              fallback="/static/fallback-img.png"
              src={getProductDetail?.images?.[record.imageIndex]}
              preview={false}
            />
            <span>
              (Loại {index + 1}) {value}
            </span>
            {"-"}
            <span>
              {record.attributes
                ?.map((att: IObj) => `${att.key}: ${att.value}`)
                .join("; ")}
            </span>
          </div>
        );
      },
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `${price.toLocaleString("vi-VN")}₫`,
    },
    {
      title: "Tồn kho",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status === "active" ? "Đang bán" : "Ngừng bán"}
        </Tag>
      ),
    },
  ];
  useEffect(() => {
    if (
      !productDetail.data?.getProductBySlug ||
      (productDetail.data?.getProductBySlug &&
        productDetail.data?.getProductBySlug._id !== params.slug)
    ) {
      productDetail.query({
        query: queryGetProductBySlug,
        variables: {
          input: {
            slug: params.slug,
          },
        },
      });
    }
  }, [params.slug]);
  return (
    <div className="space-y-4 p-4">
      {/* {productDetail.isPending && <Loading isScreen />} */}
      <div className="flex justify-between items-center">
        <Title level={4}>Chi tiết sản phẩm</Title>
        <Space>
          <DrawerUpdateProduct />
          <Button icon={<DeleteOutlined />} danger>
            Xóa
          </Button>
        </Space>
      </div>

      <Card className="!mb-4">
        <Descriptions title="Thông tin cơ bản" bordered>
          <Descriptions.Item label="Tên sản phẩm" span={3}>
            {getProductDetail?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Giá bán">
            {getProductDetail?.price?.toLocaleString("vi-VN")}₫
          </Descriptions.Item>
          <Descriptions.Item label="SKU">
            {getProductDetail?.sku}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái">
            <Tag
              className={`${
                mapStatusProductToColor[getProductDetail?.status as Status]
              }`}
            >
              {
                mapStatusToStatusProductString[
                  getProductDetail?.status as Status
                ]
              }
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Danh mục" span={3}>
            {getProductDetail?.categories?.length ? (
              getProductDetail?.categories?.map((cat: IObj) => {
                return <Tag key={cat._id}>{cat.name}</Tag>;
              })
            ) : (
              <p>Chưa có danh mục</p>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Mô tả sản phẩm" span={3}>
            <p>{getProductDetail?.description ?? "Chưa có mô tả"}</p>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="Hình ảnh sản phẩm" className="!mb-4">
        <div className="flex gap-4">
          {(getProductDetail?.images as string[])?.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Product ${index + 1}`}
              width={200}
              height={200}
              className="object-cover rounded"
              fallback="/static/fallback-img.png"
            />
          ))}
        </div>
      </Card>

      <Card title="Phân loại sản phẩm">
        <Table
          columns={variantColumns}
          dataSource={getProductDetail?.variants}
          rowKey="id"
          pagination={false}
        />
      </Card>
    </div>
  );
};
enum Tab {
  INFO = "INFO",
  BLOG = "BLOG",
}
const tabContent: Record<Tab, React.ReactNode> = {
  BLOG: <></>,
  INFO: <ProductDetailInfo />,
};
const ProductDetail = () => {
  const items: TabsProps["items"] = [
    { key: Tab.INFO, label: "Thông tin" },
    { key: Tab.BLOG, label: "Bài viết mô tả" },
  ];
  const [tab, setTab] = useState<Tab>(Tab.INFO);
  const onChange = (key: string) => {
    setTab(key as Tab);
  };
  return (
    <div className="containerProductDetail">
      <Tabs defaultActiveKey="INFO" items={items} onChange={onChange} />
      {tabContent[tab]}
    </div>
  );
};
export default ProductDetail;
