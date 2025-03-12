import React from "react";
import { Card, Image, Rate, Space, Tag, Typography } from "antd";
import { CrownOutlined } from "@ant-design/icons";
const { Text } = Typography;

const ProductCardCustomer = () => {
  const product = {
    id: 1,
    name: "MacBook Pro M3 Max",
    price: 69900000,
    rating: 4.9,
    reviews: 128,
    image: "/static/fallback-img.png",
    tags: ["Mới", "Bán chạy"],
    shop: {
      name: "Apple Store",
      isOfficial: true,
    },
  };
  return (
    <Card
      cover={
        <div className="!flex justify-center [&_.ant-image]:!w-full p-1">
          <Image
            preview={false}
            alt={product.name}
            src={product.image}
            className="!w-full h-auto m-auto object-cover transition-transform group-hover:scale-105"
          />
        </div>
      }
      className="h-full rounded-sm cursor-pointer transition relative hover:shadow-sm hover:shadow-[#F5222D] hover:-translate-y-1"
    >
      <Space direction="vertical" className="w-full">
        <Text className="font-medium line-clamp-2 h-8">{product.name}</Text>
        <div className="flex gap-2">
          {product.tags.map((tag, idx) => (
            <Tag key={idx} color={idx === 0 ? "blue" : "red"}>
              {tag}
            </Tag>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Rate disabled defaultValue={product.rating} className="text-sm" />
          <Text type="secondary" className="text-sm">
            ({product.reviews})
          </Text>
        </div>

        <Text type="danger" className="text-lg font-semibold">
          {product.price.toLocaleString()}₫
        </Text>

        <div className="flex items-center gap-2">
          {product.shop.isOfficial && (
            <Tag color="blue" icon={<CrownOutlined />}>
              Official Store
            </Tag>
          )}
          <Text type="secondary" className="text-sm">
            {product.shop.name}
          </Text>
        </div>
      </Space>
    </Card>
  );
};

export default ProductCardCustomer;
