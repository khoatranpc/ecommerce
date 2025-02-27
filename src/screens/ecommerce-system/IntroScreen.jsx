"use client";
import React from "react";
import { Button, Card, Typography, Image } from "antd";
import {
  ShoppingCartOutlined,
  RocketOutlined,
  SecurityScanOutlined,
  GlobalOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";

const { Title, Paragraph } = Typography;

const IntroScreen = () => {
  const features = [
    {
      icon: <ShoppingCartOutlined className="text-4xl text-blue-600" />,
      title: "Quản lý bán hàng toàn diện",
      description:
        "Giải pháp quản lý đơn hàng, kho hàng và khách hàng một cách hiệu quả",
    },
    {
      icon: <RocketOutlined className="text-4xl text-blue-600" />,
      title: "Tối ưu hiệu suất",
      description:
        "Tăng tốc quy trình bán hàng và cải thiện trải nghiệm người dùng",
    },
    {
      icon: <SecurityScanOutlined className="text-4xl text-blue-600" />,
      title: "Bảo mật tối đa",
      description: "Đảm bảo an toàn thông tin và giao dịch cho doanh nghiệp",
    },
    {
      icon: <GlobalOutlined className="text-4xl text-blue-600" />,
      title: "Tích hợp đa nền tảng",
      description: "Kết nối và đồng bộ dữ liệu trên nhiều kênh bán hàng",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-100 to-white"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50"></div>

        <div className="container mx-auto px-4 py-16">
          <motion.div 
            className="grid grid-cols-12 gap-8 items-center relative z-10"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="col-span-12 lg:col-span-5 space-y-8">
              <motion.div variants={itemVariants}>
                <Image src="/static/logo.png" alt="Logo" preview={false} width={150} />
              </motion.div>

              <motion.div className="space-y-6" variants={itemVariants}>
                <div className="inline-block px-4 py-1 bg-blue-50 rounded-full">
                  <span className="text-blue-600 font-medium">
                    Nền tảng thương mại điện tử #1
                  </span>
                </div>

                <Title
                  level={1}
                  className="!text-4xl md:!text-5xl !leading-tight"
                >
                  Xây dựng{" "}
                  <span className="text-[var(--primary)]">cửa hàng online</span>{" "}
                  của bạn trong vài phút
                </Title>

                <Paragraph className="text-lg text-gray-600">
                  Giải pháp toàn diện giúp doanh nghiệp của bạn vận hành hiệu
                  quả với công nghệ hiện đại nhất
                </Paragraph>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="primary"
                  size="large"
                  className="h-12 px-8 flex items-center justify-center"
                >
                  Bắt đầu ngay
                </Button>
                <Button
                  size="large"
                  className="h-12 px-8 border-2 flex items-center justify-center"
                  icon={<PlayCircleOutlined />}
                >
                  Xem demo
                </Button>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center gap-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">1000+</div>
                  <div className="text-gray-600">Khách hàng</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">99%</div>
                  <div className="text-gray-600">Hài lòng</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">24/7</div>
                  <div className="text-gray-600">Hỗ trợ</div>
                </div>
              </motion.div>
            </div>

            <motion.div 
              className="col-span-12 lg:col-span-7 relative"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-blue-100/30 rounded-[2rem] blur-3xl"></div>
                <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl">
                  <Image
                    src="/static/ecommerce.png"
                    alt="E-commerce Platform"
                    preview={false}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="py-24 bg-gradient-to-b from-gray-50 to-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block px-4 py-1 bg-blue-50 rounded-full mb-4">
              <span className="text-[var(--primary)] font-medium">Tính năng</span>
            </div>
            <Title level={2} className="!text-3xl md:!text-4xl mb-4">
              Tính năng <span className="text-[var(--primary)]">nổi bật</span>
            </Title>
            <Paragraph className="text-gray-600 text-lg">
              Khám phá các tính năng mạnh mẽ giúp doanh nghiệp của bạn phát
              triển
            </Paragraph>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-100 hover:-translate-y-1 overflow-hidden">
                  <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto">
                      {React.cloneElement(feature.icon, {
                        className: "text-3xl text-blue-600",
                      })}
                    </div>
                  </div>
                  <Title
                    level={4}
                    className="!text-xl mb-4 group-hover:text-blue-600 transition-colors"
                  >
                    {feature.title}
                  </Title>
                  <Paragraph className="text-gray-500 mb-0">
                    {feature.description}
                  </Paragraph>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="py-16 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 text-center">
          <Title level={2} className="mb-6">
            Sẵn sàng để bắt đầu?
          </Title>
          <Paragraph className="text-lg text-gray-600 mb-8">
            Hãy để chúng tôi giúp bạn xây dựng và phát triển doanh nghiệp trực
            tuyến
          </Paragraph>
          <Button type="primary" size="middle">
            Liên hệ ngay
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default IntroScreen;
