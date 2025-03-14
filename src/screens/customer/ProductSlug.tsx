"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Image,
  Rate,
  Space,
  Typography,
  InputNumber,
  Tabs,
  Divider,
  Tag,
  Carousel,
  Descriptions,
} from "antd";
import {
  HeartOutlined,
  ShoppingCartOutlined,
  ShopOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useGetProductDetailBySlug } from "@/src/utils/hooks";
import ProductDetailLoading from "./ProductDetailLoading";
import { queryGetProductBySlug } from "@/src/utils/graphql-queries";
import { useParams } from "next/navigation";
import { IObj } from "@/src/types";
import ProductPost from "./ProductPost";

const { Title, Text, Paragraph } = Typography;

const mockProduct = {
  id: 1,
  name: "iPhone 15 Pro Max 256GB",
  price: 34900000,
  originalPrice: 37900000,
  discount: 8,
  rating: 4.8,
  reviews: 254,
  sold: 1234,
  images: [
    "/static/shopping-mall.png",
    "/static/shopping-mall.png",
    "/static/shopping-mall.png",
    "/static/shopping-mall.png",
  ],
  description: `
    - Màn hình Super Retina XDR OLED 6.7 inch
    - Chip A17 Pro mạnh mẽ
    - RAM 8GB
    - Camera chính 48MP
    - Pin 4422mAh
  `,
  specifications: [
    { key: "Màn hình", value: "6.7 inch Super Retina XDR OLED" },
    { key: "Chip", value: "A17 Pro" },
    { key: "RAM", value: "8GB" },
    { key: "Bộ nhớ trong", value: "256GB" },
    { key: "Camera sau", value: "48MP + 12MP + 12MP" },
    { key: "Camera trước", value: "12MP" },
    { key: "Pin", value: "4422mAh" },
  ],
  shop: {
    name: "Apple Store Official",
    avatar: "/static/apple-logo.png",
    rating: 4.9,
    products: 158,
    followers: 52000,
    responseRate: 99,
    responseTime: "trong vài phút",
  },
};

const ProductSlug = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const carouselRef = useRef<any>(null);
  const currentProduct = useGetProductDetailBySlug();
  const getDataCurrentProduct =
    (currentProduct.data?.getProductBySlug as IObj) ?? {};
  const getCategories = getDataCurrentProduct?.categories?.[0];
  const params = useParams();
  useEffect(() => {
    if (!currentProduct.isFetched) {
      currentProduct.query({
        query: queryGetProductBySlug,
        variables: {
          input: {
            slug: params.slug,
          },
        },
      });
    }
  }, [currentProduct.data]);
  return !currentProduct.isFetched || currentProduct.isPending ? (
    <ProductDetailLoading />
  ) : (
    <div className="grid grid-cols-12 gap-8">
      {/* Product Images */}
      <div className="col-span-5">
        <div className="sticky top-24">
          <Card className="overflow-hidden">
            <Carousel
              ref={carouselRef}
              slidesToShow={1}
              slidesToScroll={1}
              draggable
              infinite
              afterChange={(slide) => {
                setSelectedImage(slide);
              }}
            >
              {(getDataCurrentProduct.images as string[])?.map(
                (img: string, idx: number) => (
                  <Image
                    src={img}
                    alt={`${mockProduct.name} ${idx + 1}`}
                    className="w-20 h-20 object-cover !select-none"
                    preview={false}
                    fallback="/static/fallback-img.png"
                  />
                )
              )}
            </Carousel>
            <Carousel
              className="mt-4"
              dots={false}
              slidesToShow={5}
              infinite={false}
            >
              {(getDataCurrentProduct.images as string[])?.map(
                (img: string, idx: number) => (
                  <div
                    key={idx}
                    className={`cursor-pointer border-2 rounded overflow-hidden ${
                      selectedImage === idx
                        ? "border-[var(--primary)]"
                        : "border-transparent"
                    }`}
                    onClick={() => {
                      setSelectedImage(idx);
                      carouselRef.current?.goTo(idx);
                    }}
                  >
                    <Image
                      src={img}
                      alt={`${getDataCurrentProduct.name} ${idx + 1}`}
                      className="!w-14object-cover !select-none"
                      preview={false}
                      fallback="/static/fallback-img.png"
                    />
                  </div>
                )
              )}
            </Carousel>
          </Card>
        </div>
      </div>

      <div className="col-span-7">
        <Card>
          <Title level={3}>{getDataCurrentProduct?.name}</Title>

          <Space className="my-4">
            <Rate disabled defaultValue={mockProduct.rating} />
            <Text type="secondary">
              {mockProduct.rating} ({mockProduct.reviews} đánh giá)
            </Text>
            <Divider type="vertical" />
            <Text type="secondary">{mockProduct.sold} đã bán</Text>
          </Space>

          <div className="bg-gray-50 p-6 rounded-lg my-6">
            <p className="text-4xl text-red-500 font-bold">
              {getDataCurrentProduct?.price?.toLocaleString()}₫
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Text delete className="text-gray-500">
                {/* {mockProduct.originalPrice.toLocaleString()}₫ */}
              </Text>
              {/* <Tag color="red">-{mockProduct.discount}%</Tag> */}
            </div>
          </div>

          <div className="space-y-6">
            <div className="prose max-w-none">
              <Paragraph>{getDataCurrentProduct?.description}</Paragraph>
            </div>
            <div className="flex items-center gap-4">
              <Text strong>Số lượng:</Text>
              <InputNumber
                min={1}
                max={10}
                value={quantity}
                onChange={(value) => setQuantity(value || 1)}
              />
            </div>

            <Space size="large">
              <Button
                type="primary"
                size="large"
                icon={<ShoppingCartOutlined />}
                className="bg-gradient-to-r from-blue-600 to-indigo-600"
              >
                Thêm vào giỏ hàng
              </Button>
              <Button size="large" icon={<HeartOutlined />}>
                Yêu thích
              </Button>
            </Space>
          </div>

          <Divider />
          <div className="flex items-center gap-4">
            <Image
              src={getDataCurrentProduct?.shop?.logo}
              alt={getDataCurrentProduct?.shop?.name}
              className="!w-16 !h-16 object-cover rounded-full"
            />
            <div className="flex-1">
              <Title level={5}>{getDataCurrentProduct?.shop?.name}</Title>
              <Space split={<Divider type="vertical" />}>
                <Text>{mockProduct.shop.products} sản phẩm</Text>
                <Text>{mockProduct.shop.followers} người theo dõi</Text>
              </Space>
            </div>
            <Space>
              <Button icon={<ShopOutlined />}>Xem shop</Button>
              <Button icon={<MessageOutlined />}>Chat ngay</Button>
            </Space>
          </div>
        </Card>
      </div>
      <div className="col-span-12">
        <Card>
          <Text className="!text-2xl !bg-gray-50 inline-block w-full p-2">
            Chi tiết sản phẩm
          </Text>
          <div className="p-2">
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Danh mục">
                <div className="flex gap-2">
                  {(getDataCurrentProduct?.categories as IObj[])?.map((cat) => {
                    return (
                      <span className="text-blue-500 cursor-pointer hover:underline">
                        {cat?.name}
                      </span>
                    );
                  })}
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="Kho">
                {getDataCurrentProduct?.stock ?? 0}
              </Descriptions.Item>
              <Descriptions.Item label="Tổ chức chịu trách nhiệm xuất bản">
                {getDataCurrentProduct?.shop?.name}
              </Descriptions.Item>
            </Descriptions>
          </div>
        </Card>
      </div>
      <div className="col-span-12">
        <Card>
          <Text className="!text-2xl !bg-gray-50 inline-block w-full p-2">
            Mô tả sản phẩm
          </Text>
          <div className="prose max-w-none p-2">
            <ProductPost productId={getDataCurrentProduct?._id as string} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProductSlug;
