import { Button, Card, Image, Space, Tag, Typography } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { IObj } from "../../types";

const { Text } = Typography;
const { Meta } = Card;
const ProductCard = ({ product }: { product: IObj }) => {
  return (
    <Card
      hoverable
      className="h-[350px] flex flex-col "
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

export default ProductCard;
