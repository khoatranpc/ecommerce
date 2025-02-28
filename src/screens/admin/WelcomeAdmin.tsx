'use client';
import React from 'react';
import { Typography, Card, Row, Col, Statistic } from 'antd';
import {
  ShoppingCartOutlined,
  UserOutlined,
  DollarOutlined,
  RiseOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Title, Paragraph } = Typography;

const WelcomeAdmin = () => {
  const stats = [
    {
      title: 'Tổng đơn hàng',
      value: 1234,
      icon: <ShoppingCartOutlined />,
      color: '#1677ff',
    },
    {
      title: 'Khách hàng',
      value: 892,
      icon: <UserOutlined />,
      color: '#52c41a',
    },
    {
      title: 'Doanh thu',
      value: 45600000,
      prefix: '₫',
      icon: <DollarOutlined />,
      color: '#722ed1',
    },
    {
      title: 'Tăng trưởng',
      value: 25.8,
      suffix: '%',
      icon: <RiseOutlined />,
      color: '#faad14',
    },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[var(--primary)] to-blue-600 rounded-2xl p-8 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/static/pattern.png')] opacity-10"></div>
        <div className="relative z-10">
          <Title level={2} className="!text-white !mb-2">
            Chào mừng trở lại, Admin!
          </Title>
          <Paragraph className="!text-white/80 !mb-0 text-lg">
            Đây là tổng quan hoạt động của doanh nghiệp hôm nay
          </Paragraph>
        </div>
      </motion.div>

      <Row gutter={[16, 16]}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className="hover:shadow-lg transition-all duration-300 border-2 hover:border-[var(--primary)]"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-gray-500 font-medium">{stat.title}</span>
                    <Statistic
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      valueStyle={{ 
                        color: 'var(--primary)',
                        fontSize: '28px',
                        fontWeight: 600 
                      }}
                    />
                  </div>
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `var(--primary)20` }}
                  >
                    <span className="text-2xl text-[var(--primary)]">
                      {stat.icon}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card 
              title="Hoạt động gần đây" 
              className="h-full hover:shadow-lg transition-all duration-300"
              headStyle={{ 
                borderBottom: '2px solid var(--primary)',
                color: 'var(--primary)'
              }}
            >
              <div className="space-y-4">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-300 cursor-pointer group">
                    <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center group-hover:bg-[var(--primary)] transition-colors duration-300">
                      <ShoppingCartOutlined className="text-[var(--primary)] text-xl group-hover:text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">Đơn hàng mới #{1000 + index}</div>
                      <div className="text-sm text-gray-500">2 phút trước</div>
                    </div>
                    <div className="text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Xem chi tiết →
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </Col>
        
        <Col xs={24} lg={8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card 
              title="Thông báo" 
              className="h-full hover:shadow-lg transition-all duration-300"
              headStyle={{ 
                borderBottom: '2px solid var(--primary)',
                color: 'var(--primary)'
              }}
            >
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="p-4 bg-[var(--primary)]/5 rounded-xl hover:bg-[var(--primary)]/10 transition-colors duration-300 cursor-pointer">
                    <div className="font-medium text-[var(--primary)]">Cập nhật hệ thống</div>
                    <div className="text-sm text-gray-600 mt-1">Phiên bản mới đã sẵn sàng</div>
                    <div className="text-xs text-gray-400 mt-2">1 giờ trước</div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </div>
  );
};

export default WelcomeAdmin;