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
        className="py-24 bg-gradient-to-br from-white via-blue-50/30 to-white"
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
              <span className="text-[var(--primary)] font-medium">Lý do lựa chọn</span>
            </div>
            <Title level={2} className="!text-3xl md:!text-4xl mb-4">
              Tại sao chọn <span className="text-[var(--primary)]">Ecommerce Solution</span>?
            </Title>
            <Paragraph className="text-gray-600 text-lg">
              Chúng tôi cung cấp giải pháp toàn diện cho doanh nghiệp của bạn
            </Paragraph>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Tiết kiệm chi phí",
                description: "Giảm thiểu chi phí vận hàng với giải pháp tự động hóa thông minh",
                icon: "💰"
              },
              {
                title: "Dễ dàng tích hợp",
                description: "Tích hợp linh hoạt với các nền tảng bán hàng phổ biến",
                icon: "🔄"
              },
              {
                title: "Hỗ trợ 24/7",
                description: "Đội ngũ hỗ trợ chuyên nghiệp, sẵn sàng giải đáp mọi thắc mắc",
                icon: "🎯"
              },
              {
                title: "Cập nhật liên tục",
                description: "Thường xuyên cập nhật tính năng mới theo xu hướng thị trường",
                icon: "⚡"
              },
              {
                title: "Bảo mật dữ liệu",
                description: "Hệ thống bảo mật đa lớp, đảm bảo an toàn thông tin",
                icon: "🔒"
              },
              {
                title: "Tùy chỉnh linh hoạt",
                description: "Dễ dàng tùy chỉnh theo nhu cầu riêng của doanh nghiệp",
                icon: "⚙️"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <Title level={4} className="!mb-2">
                  {item.title}
                </Title>
                <Paragraph className="text-gray-600 mb-0">
                  {item.description}
                </Paragraph>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        className="py-24 bg-gradient-to-br from-gray-50 to-white"
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
              <span className="text-[var(--primary)] font-medium">Sản phẩm</span>
            </div>
            <Title level={2} className="!text-3xl md:!text-4xl mb-4">
              Giải pháp <span className="text-[var(--primary)]">toàn diện</span> cho doanh nghiệp
            </Title>
            <Paragraph className="text-gray-600 text-lg">
              Khám phá các sản phẩm được thiết kế đặc biệt cho nhu cầu kinh doanh của bạn
            </Paragraph>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "E-commerce Platform",
                description: "Nền tảng thương mại điện tử tích hợp đầy đủ tính năng quản lý đơn hàng, kho hàng, và khách hàng",
                image: "/static/logo-short.png",
                features: ["Quản lý đơn hàng", "Quản lý kho", "Tích hợp thanh toán", "Báo cáo thống kê"]
              },
              {
                title: "POS System",
                description: "Hệ thống bán hàng tại quầy hiện đại, tích hợp seamless với nền tảng online",
                image: "/static/logo-short.png",
                features: ["Bán hàng đa kênh", "Quản lý thu chi", "Quản lý nhân viên", "Báo cáo doanh số"]
              },
              {
                title: "Mobile Commerce",
                description: "Ứng dụng di động cho doanh nghiệp, giúp quản lý bán hàng mọi lúc mọi nơi",
                image: "/static/logo-short.png",
                features: ["App bán hàng", "Thông báo realtime", "Quản lý từ xa", "Tương tác khách hàng"]
              }
            ].map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl flex flex-col shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <Image
                    src={product.image}
                    alt={product.title}
                    preview={false}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <Title level={3} className="!text-xl mb-3">
                    {product.title}
                  </Title>
                  <Paragraph className="text-gray-600 mb-4">
                    {product.description}
                  </Paragraph>
                  <div className="space-y-2">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-gray-600">
                        <div className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="px-6 pb-6 mt-auto">
                  <Button type="primary" className="w-full">
                    Tìm hiểu thêm
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      {/* ... Why Choose Us section ends ... */}

      <motion.div
        className="py-24 bg-gradient-to-b from-white to-blue-50/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-blue-100/30 rounded-[2rem] blur-3xl"></div>
              <div className="relative z-10">
                <Image
                  src="/static/logo.png"
                  alt="About Company"
                  preview={false}
                  className="rounded-2xl shadow-xl p-2"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="inline-block px-4 py-1 bg-blue-50 rounded-full">
                <span className="text-[var(--primary)] font-medium">Về chúng tôi</span>
              </div>

              <Title level={2} className="!text-3xl md:!text-4xl !leading-tight">
                Đối tác tin cậy trong hành trình <span className="text-[var(--primary)]">chuyển đổi số</span>
              </Title>

              <Paragraph className="text-lg text-gray-600">
                Với hơn 5 năm kinh nghiệm trong lĩnh vực công nghệ, chúng tôi tự hào là đơn vị tiên phong
                cung cấp giải pháp thương mại điện tử toàn diện tại Việt Nam.
              </Paragraph>

              <div className="space-y-4">
                {[
                  {
                    title: "Đội ngũ chuyên gia",
                    description: "Đội ngũ kỹ sư với hơn 50 chuyên gia công nghệ giàu kinh nghiệm"
                  },
                  {
                    title: "Công nghệ hiện đại",
                    description: "Ứng dụng các công nghệ mới nhất trong phát triển sản phẩm"
                  },
                  {
                    title: "Cam kết chất lượng",
                    description: "Đảm bảo chất lượng dịch vụ với quy trình kiểm soát chặt chẽ"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <div className="w-6 h-6 bg-[var(--primary)] rounded-full"></div>
                    </div>
                    <div>
                      <Title level={5} className="!mb-1">
                        {item.title}
                      </Title>
                      <Paragraph className="text-gray-600 mb-0">
                        {item.description}
                      </Paragraph>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ... Products section starts ... */}
      < motion.div
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
      </motion.div >
    </div >
  );
};

export default IntroScreen;
