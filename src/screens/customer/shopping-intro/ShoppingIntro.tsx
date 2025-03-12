"use client";
import React from "react";
import {
  Layout,
  Typography,
  Row,
  Col,
  Card,
  Button,
  Statistic,
  Space,
  Image,
  Tag,
  Rate,
  Badge,
  Avatar,
  Carousel,
  Divider,
} from "antd";
import { ThunderboltOutlined, CrownOutlined } from "@ant-design/icons";
import ProductCartSale from "@/src/components/ProductCartSale";
const { Title, Text, Paragraph } = Typography;
const ShoppingIntro = () => {
  const banners = [
    {
      title: "Summer Collection 2024",
      subtitle: "Giảm đến 50%",
      description: "Khám phá bộ sưu tập mới nhất với hàng ngàn ưu đãi hấp dẫn",
      image: "/static/banner1.jpg",
      gradient: "from-blue-600 to-violet-600",
    },
    {
      title: "Summer Collection 2024",
      subtitle: "Giảm đến 50%",
      description: "Khám phá bộ sưu tập mới nhất với hàng ngàn ưu đãi hấp dẫn",
      image: "/static/banner1.jpg",
      gradient: "from-blue-600 to-violet-600",
    },
    {
      title: "Summer Collection 2024",
      subtitle: "Giảm đến 50%",
      description: "Khám phá bộ sưu tập mới nhất với hàng ngàn ưu đãi hấp dẫn",
      image: "/static/banner1.jpg",
      gradient: "from-blue-600 to-violet-600",
    },
  ];

  const flashDeals = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      price: 27900000,
      originalPrice: 34900000,
      discount: 20,
      image: "/static/iphone.jpg",
      timeLeft: "02:45:30",
      sold: 89,
      total: 100,
    },
    {
      id: 2,
      name: "iPhone 15 Pro Max",
      price: 27900000,
      originalPrice: 34900000,
      discount: 20,
      image: "/static/iphone.jpg",
      timeLeft: "02:45:30",
      sold: 89,
      total: 100,
    },
    {
      id: 3,
      name: "iPhone 15 Pro Max",
      price: 27900000,
      originalPrice: 34900000,
      discount: 20,
      image: "/static/iphone.jpg",
      timeLeft: "02:45:30",
      sold: 89,
      total: 100,
    },
    {
      id: 4,
      name: "iPhone 15 Pro Max",
      price: 27900000,
      originalPrice: 34900000,
      discount: 20,
      image: "/static/iphone.jpg",
      timeLeft: "02:45:30",
      sold: 89,
      total: 100,
    },
    {
      id: 5,
      name: "iPhone 15 Pro Max",
      price: 27900000,
      originalPrice: 34900000,
      discount: 20,
      image: "/static/iphone.jpg",
      timeLeft: "02:45:30",
      sold: 89,
      total: 100,
    },
    {
      id: 6,
      name: "iPhone 15 Pro Max",
      price: 27900000,
      originalPrice: 34900000,
      discount: 20,
      image: "/static/iphone.jpg",
      timeLeft: "02:45:30",
      sold: 89,
      total: 100,
    },
    {
      id: 7,
      name: "iPhone 15 Pro Max",
      price: 27900000,
      originalPrice: 34900000,
      discount: 20,
      image: "/static/iphone.jpg",
      timeLeft: "02:45:30",
      sold: 89,
      total: 100,
    },
    {
      id: 8,
      name: "iPhone 15 Pro Max",
      price: 27900000,
      originalPrice: 34900000,
      discount: 20,
      image: "/static/iphone.jpg",
      timeLeft: "02:45:30",
      sold: 89,
      total: 100,
    },
    // Add more flash deals...
  ];

  const categories = [
    {
      name: "Thời Trang Nam",
      icon: <CrownOutlined className="text-3xl text-blue-500" />,
      image: "/static/fashion-men.jpg",
      stats: {
        shops: 1200,
        products: 50000,
        rating: 4.8,
      },
      featured: ["Áo polo", "Quần jean", "Giày thể thao"],
    },
    {
      name: "Thời Trang Nam",
      icon: <CrownOutlined className="text-3xl text-blue-500" />,
      image: "/static/fashion-men.jpg",
      stats: {
        shops: 1200,
        products: 50000,
        rating: 4.8,
      },
      featured: ["Áo polo", "Quần jean", "Giày thể thao"],
    },
    {
      name: "Thời Trang Nam",
      icon: <CrownOutlined className="text-3xl text-blue-500" />,
      image: "/static/fashion-men.jpg",
      stats: {
        shops: 1200,
        products: 50000,
        rating: 4.8,
      },
      featured: ["Áo polo", "Quần jean", "Giày thể thao"],
    },
    {
      name: "Thời Trang Nam",
      icon: <CrownOutlined className="text-3xl text-blue-500" />,
      image: "/static/fashion-men.jpg",
      stats: {
        shops: 1200,
        products: 50000,
        rating: 4.8,
      },
      featured: ["Áo polo", "Quần jean", "Giày thể thao"],
    },
    // Add more categories...
  ];
  // Add this to your existing data constants
  const topShops = [
    {
      id: 1,
      name: "Fashion Trends",
      logo: "/static/shop-logo1.jpg",
      coverImage: "/static/shop-cover1.jpg",
      rating: 4.9,
      totalSales: 150000,
      monthlyRevenue: 2500000000,
      responseRate: 98,
      tags: ["Premium", "Mall", "Yêu thích+"],
      bestSellers: [
        { name: "Áo sơ mi", image: "/static/product1.jpg", price: 299000 },
        { name: "Quần jean", image: "/static/product2.jpg", price: 499000 },
        { name: "Giày sneaker", image: "/static/product3.jpg", price: 899000 },
      ],
      achievements: ["Top 10 Shop", "Bán chạy nhất tháng", "Phản hồi tốt"],
    },
    {
      id: 2,
      name: "Fashion Trends",
      logo: "/static/shop-logo1.jpg",
      coverImage: "/static/shop-cover1.jpg",
      rating: 4.9,
      totalSales: 150000,
      monthlyRevenue: 2500000000,
      responseRate: 98,
      tags: ["Premium", "Mall", "Yêu thích+"],
      bestSellers: [
        { name: "Áo sơ mi", image: "/static/product1.jpg", price: 299000 },
        { name: "Quần jean", image: "/static/product2.jpg", price: 499000 },
        { name: "Giày sneaker", image: "/static/product3.jpg", price: 899000 },
      ],
      achievements: ["Top 10 Shop", "Bán chạy nhất tháng", "Phản hồi tốt"],
    },
  ];

  return (
    <div>
      <div className="relative h-[600px] overflow-hidden">
        <Carousel autoplay effect="scrollx" className="h-full" draggable>
          {banners.map((banner, index) => (
            <div key={index}>
              <div
                className={`h-[600px] bg-gradient-to-r ${banner.gradient} relative`}
              >
                <div className="absolute inset-0 bg-black/30" />
                <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
                  <div className="relative z-10 space-y-6 max-w-2xl">
                    <Badge.Ribbon text={banner.subtitle} color="red">
                      <Title className="!text-white !text-6xl !mb-0">
                        {banner.title}
                      </Title>
                    </Badge.Ribbon>
                    <Paragraph className="text-xl text-gray-100">
                      {banner.description}
                    </Paragraph>
                    <Space size="large">
                      <Button type="primary" size="large">
                        Mua ngay
                      </Button>
                      <Button ghost size="large" className="text-white">
                        Xem thêm
                      </Button>
                    </Space>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <Space>
              <ThunderboltOutlined className="text-4xl !text-[var(--primary)]" />
              <Title level={2} className="!mb-0 !text-[var(--primary)]">
                Flash Sale
              </Title>
            </Space>
            <Button
              type="primary"
              size="large"
              variant="outlined"
              color="primary"
            >
              Xem tất cả
            </Button>
          </div>
          <Carousel
            arrows
            slidesToShow={5}
            slidesToScroll={1}
            className="[&_.slick-track]:!flex [&_.slick-track]:!py-2 [&_.slick-track]:!gap-4 [&_.slick-next]:translate-x-[2rem] [&_.slick-prev]:translate-x-[-2rem]  [&_.slick-arrow]:!text-[var(--primary)]"
            dots={false}
          >
            {flashDeals.map((deal, idx) => {
              return <ProductCartSale key={idx} />;
            })}
          </Carousel>
        </div>
      </div>
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Title level={2} className="text-center mb-12">
            Danh Mục Nổi Bật
          </Title>
          <Row gutter={[24, 24]}>
            {categories.map((category, index) => (
              <Col key={index} xs={24} sm={12} md={8}>
                <Card
                  hoverable
                  cover={
                    <div className="relative h-48">
                      <Image
                        alt={category.name}
                        src={category.image}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <Space align="center">
                          {category.icon}
                          <Title level={4} className="!mb-0 !text-white">
                            {category.name}
                          </Title>
                        </Space>
                      </div>
                    </div>
                  }
                >
                  <Space direction="vertical" className="w-full">
                    <Row gutter={16}>
                      <Col span={8}>
                        <Statistic
                          title="Cửa hàng"
                          value={category.stats.shops}
                          className="!text-sm"
                        />
                      </Col>
                      <Col span={8}>
                        <Statistic
                          title="Sản phẩm"
                          value={category.stats.products}
                          className="!text-sm"
                        />
                      </Col>
                      <Col span={8}>
                        <Statistic
                          title="Đánh giá"
                          value={category.stats.rating}
                          suffix="/5"
                          className="!text-sm"
                        />
                      </Col>
                    </Row>
                    <div className="mt-4">
                      <Text type="secondary">Nổi bật:</Text>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {category.featured.map((item) => (
                          <Tag key={item} color="blue">
                            {item}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <Space>
              <CrownOutlined className="text-4xl text-yellow-500" />
              <Title level={2} className="!mb-0">
                Cửa Hàng Nổi Bật
              </Title>
            </Space>
            <Button type="primary" size="large">
              Xem tất cả
            </Button>
          </div>

          <Row gutter={[24, 24]}>
            {topShops.map((shop) => (
              <Col key={shop.id} xs={24} md={12}>
                <Card
                  hoverable
                  className="overflow-hidden"
                  cover={
                    <div className="relative h-48">
                      <Image
                        alt={shop.name}
                        src={shop.coverImage}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex items-center gap-4">
                          <Avatar size={64} src={shop.logo} />
                          <div className="text-white">
                            <Title level={4} className="!mb-0 !text-white">
                              {shop.name}
                            </Title>
                            <Space>
                              <Rate
                                disabled
                                defaultValue={shop.rating}
                                className="text-sm"
                              />
                              <Text className="text-white">{shop.rating}</Text>
                            </Space>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                >
                  <Space direction="vertical" className="w-full">
                    <Row gutter={16}>
                      <Col span={8}>
                        <Statistic
                          title="Đơn hàng"
                          value={shop.totalSales}
                          className="!text-sm"
                          suffix="+"
                        />
                      </Col>
                      <Col span={8}>
                        <Statistic
                          title="Phản hồi"
                          value={shop.responseRate}
                          className="!text-sm"
                          suffix="%"
                        />
                      </Col>
                    </Row>

                    <div className="flex flex-wrap gap-2 my-3">
                      {shop.tags.map((tag) => (
                        <Tag key={tag} color="gold">
                          {tag}
                        </Tag>
                      ))}
                    </div>

                    <Divider className="!my-3" />

                    <div className="grid grid-cols-3 gap-2">
                      {shop.bestSellers.map((product, idx) => (
                        <Card
                          key={idx}
                          size="small"
                          hoverable
                          cover={
                            <Image
                              alt={product.name}
                              src={product.image}
                              className="h-24 object-cover"
                            />
                          }
                        >
                          <Text className="block truncate text-xs">
                            {product.name}
                          </Text>
                          <Text type="danger" className="text-sm">
                            {product.price.toLocaleString()}₫
                          </Text>
                        </Card>
                      ))}
                    </div>

                    <Divider className="!my-3" />

                    <div className="flex flex-wrap gap-2">
                      {shop.achievements.map((achievement) => (
                        <Tag
                          key={achievement}
                          color="blue"
                          icon={<CrownOutlined />}
                        >
                          {achievement}
                        </Tag>
                      ))}
                    </div>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ShoppingIntro;
