import React, { useState } from "react";
import { Card, Rate, List, Avatar, Tag, Typography, Space, Select, Button, Input } from "antd";
import { UserOutlined, StarFilled, MessageOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Search } = Input;

const RateAndComment = () => {
  const [filter, setFilter] = useState("all");

  // Mock data
  const reviews = [
    {
      id: 1,
      user: "Khách hàng 1",
      avatar: null,
      rating: 5,
      comment: "Sản phẩm rất tốt, đóng gói cẩn thận",
      date: "2024-01-15",
      variant: "Đen - Size M",
      images: ["https://example.com/image1.jpg"],
      reply: "Cảm ơn bạn đã mua hàng và đánh giá!",
    },
    {
      id: 2,
      user: "Khách hàng 2",
      avatar: null,
      rating: 4,
      comment: "Chất lượng ổn, giao hàng hơi chậm",
      date: "2024-01-14",
      variant: "Trắng - Size L",
      images: [],
    },
  ];

  const statistics = {
    average: 4.5,
    total: 150,
    distribution: [
      { stars: 5, count: 80 },
      { stars: 4, count: 40 },
      { stars: 3, count: 20 },
      { stars: 2, count: 7 },
      { stars: 1, count: 3 },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <Title level={4}>Đánh giá sản phẩm</Title>

      <Card className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-[var(--primary)]">
              {statistics.average}
            </div>
            <Rate disabled defaultValue={statistics.average} />
            <div className="text-gray-500 mt-2">
              {statistics.total} đánh giá
            </div>
          </div>

          <div className="col-span-2">
            {statistics.distribution.map((item) => (
              <div key={item.stars} className="flex items-center mb-2">
                <span className="w-16">{item.stars} sao</span>
                <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[var(--primary)] h-2 rounded-full"
                    style={{
                      width: `${(item.count / statistics.total) * 100}%`,
                    }}
                  />
                </div>
                <span className="w-16 text-right">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="mb-4 flex gap-4">
        <Select
          defaultValue="all"
          style={{ width: 200 }}
          onChange={setFilter}
          options={[
            { value: "all", label: "Tất cả đánh giá" },
            { value: "5", label: "5 sao" },
            { value: "4", label: "4 sao" },
            { value: "3", label: "3 sao" },
            { value: "2", label: "2 sao" },
            { value: "1", label: "1 sao" },
            { value: "has_image", label: "Có hình ảnh" },
            { value: "has_comment", label: "Có bình luận" },
          ]}
        />
        <Search
          placeholder="Tìm kiếm trong đánh giá"
          style={{ width: 300 }}
        />
      </div>

      <List
        itemLayout="vertical"
        dataSource={reviews}
        renderItem={(item) => (
          <Card className="mb-4">
            <List.Item
              key={item.id}
              extra={
                item.images?.length > 0 && (
                  <div className="flex gap-2">
                    {item.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Review ${index + 1}`}
                        className="w-20 h-20 object-cover rounded"
                      />
                    ))}
                  </div>
                )
              }
            >
              <List.Item.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={
                  <Space>
                    <span>{item.user}</span>
                    <Tag>{item.variant}</Tag>
                  </Space>
                }
                description={
                  <Space direction="vertical">
                    <Rate disabled defaultValue={item.rating} />
                    <Text type="secondary">{item.date}</Text>
                  </Space>
                }
              />
              <div className="mt-2">{item.comment}</div>
              {item.reply && (
                <div className="mt-4 bg-gray-50 p-4 rounded">
                  <Space>
                    <Tag color="blue">Phản hồi của shop</Tag>
                    <span>{item.reply}</span>
                  </Space>
                </div>
              )}
              <div className="mt-4">
                <Button
                  type="default"
                  icon={<MessageOutlined />}
                >
                  Trả lời
                </Button>
              </div>
            </List.Item>
          </Card>
        )}
      />
    </div>
  );
};

export default RateAndComment;
