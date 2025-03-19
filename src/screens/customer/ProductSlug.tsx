"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Rate,
  Space,
  Typography,
  InputNumber,
  Divider,
  Descriptions,
} from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useGetProductDetailBySlug, useInsertToCart } from "@/src/utils/hooks";
import ProductDetailLoading from "./ProductDetailLoading";
import {
  queryGetProductBySlug,
  queryInsertToCart,
} from "@/src/utils/graphql-queries";
import { useParams } from "next/navigation";
import { IObj } from "@/src/types";
import ProductPost from "./ProductPost";
import ProductImages from "./components/ProductImages";
import ProductVariants from "./components/ProductVariants";
import ShopInfo from "./components/ShopInfo";

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
  const [quantity, setQuantity] = useState(1);
  const insertToCart = useInsertToCart();
  const currentProduct = useGetProductDetailBySlug();
  const getDataCurrentProduct =
    (currentProduct.data?.getProductBySlug as IObj) ?? {};
  const getVariants =
    (currentProduct.data?.getProductBySlug?.variants as IObj[]) ?? [];
  const getOptions: IObj[] = getVariants.filter(
    (variant) => (variant.attributes as IObj[]).length
  );
  const mapKeyOptions: IObj = {};
  const mapOptionToObjectId: IObj = {};
  getOptions
    .map((variant: IObj) => {
      mapOptionToObjectId[variant._id] = (variant.attributes as IObj[]).map(
        (attr) => {
          return {
            key: attr.key.toLowerCase().trim(),
            value: String(attr.value).toLowerCase().trim(),
          };
        }
      );
      return {
        variantId: variant._id,
        attributes: variant.attributes,
      };
    })
    .forEach(
      (opt: {
        variantId: string;
        attributes: { key: string; value: string }[];
      }) => {
        opt.attributes.forEach((optItem: { key: string; value: string }) => {
          const getKey = String(optItem.key).trim().toLowerCase();
          const newValue = {
            varianId: opt.variantId,
            attribute: optItem.value.toLowerCase(),
          };
          if (mapKeyOptions[getKey]) {
            mapKeyOptions[getKey].push(newValue);
          } else {
            mapKeyOptions[getKey] = [newValue];
          }
        });
      }
    );
  const params = useParams();
  const [keysSelected, setKeysSelected] = useState<IObj[]>([]);
  const [selectedVariantId, setSelectedVariantId] = useState<string>("");
  const variantsHasKey = useMemo(() => {
    const variants = getVariants.filter((variant) => {
      return (variant.attributes as IObj[]).find((attri) => {
        return keysSelected.every((keySelected) => {
          return (
            String(keySelected.key).toLowerCase().trim() ===
              String(attri.key).toLowerCase().trim() &&
            String(keySelected.value).toLowerCase().trim() ===
              String(attri.value).toLowerCase().trim()
          );
        });
      });
    });
    return variants;
  }, [keysSelected, getVariants]);
  const lastIndexVariantSelected = useMemo(() => {
    const mapKeysSelected = keysSelected
      .map((obj) => JSON.stringify(obj))
      .sort();
    const getLastVariantSelect = Object.keys(mapOptionToObjectId).find(
      (key: keyof typeof mapOptionToObjectId) => {
        const sortList = mapOptionToObjectId[key]
          .map((obj: IObj) => JSON.stringify(obj))
          .sort();
        return JSON.stringify(sortList) === JSON.stringify(mapKeysSelected);
      }
    );
    return getLastVariantSelect;
  }, [keysSelected]);
  const getVariant = useMemo(() => {
    const variantId = lastIndexVariantSelected || selectedVariantId;
    const currentVariant = getVariants.find((v) => v._id === variantId);
    return currentVariant;
  }, [lastIndexVariantSelected, selectedVariantId, getVariants]);
  const handleAddToCart = () => {
    if (getVariant) {
      const selectedProduct = {
        product: getDataCurrentProduct?._id,
        quantity: quantity,
        variant: getVariant?._id,
        shop: getDataCurrentProduct?.shop?._id,
      };
      insertToCart.query({
        query: queryInsertToCart,
        variables: {
          input: selectedProduct,
        },
      });
    }
  };
  useEffect(() => {
    currentProduct.query({
      query: queryGetProductBySlug,
      variables: {
        input: {
          slug: params.slug,
        },
      },
    });
  }, [params.slug]);
  useEffect(() => {
    if (getVariant) {
      setQuantity(1);
    }
  }, [getVariant]);
  return !currentProduct.isFetched || currentProduct.isPending ? (
    <ProductDetailLoading />
  ) : (
    <div className="grid grid-cols-12 gap-8" key={params.slug as string}>
      <div className="col-span-5">
        <div className="sticky top-24">
          <ProductImages
            images={getDataCurrentProduct.images as string[]}
            productName={getDataCurrentProduct.name}
          />
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
              {getVariant?.price?.toLocaleString() ??
                getDataCurrentProduct?.price?.toLocaleString()}
              ₫
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Text delete className="text-gray-500"></Text>
            </div>
          </div>
          <div className="space-y-4">
            <ProductVariants
              mapKeyOptions={mapKeyOptions}
              variantsHasKey={variantsHasKey}
              keysSelected={keysSelected}
              setKeysSelected={setKeysSelected}
              getVariants={getVariants}
              selectedVariantId={selectedVariantId}
              setSelectedVariantId={setSelectedVariantId}
              productImages={getDataCurrentProduct.images as string[]}
            />
          </div>
          <div className="space-y-6 mt-4">
            <div className="prose max-w-none">
              <Paragraph>{getDataCurrentProduct?.description}</Paragraph>
            </div>
            <div className="flex items-center gap-4">
              <Text strong>Số lượng:</Text>
              <InputNumber
                disabled={
                  lastIndexVariantSelected || selectedVariantId ? false : true
                }
                min={1}
                max={getVariant?.stock || getDataCurrentProduct?.stock}
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
                disabled={
                  lastIndexVariantSelected || selectedVariantId ? false : true
                }
                loading={insertToCart.isPending}
                onClick={handleAddToCart}
              >
                Thêm vào giỏ hàng
              </Button>
              <Button size="large" icon={<HeartOutlined />}>
                Yêu thích
              </Button>
            </Space>
          </div>

          <Divider />
          <ShopInfo shop={getDataCurrentProduct?.shop} />
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
                      <span
                        className="text-blue-500 cursor-pointer hover:underline"
                        key={cat._id}
                      >
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
