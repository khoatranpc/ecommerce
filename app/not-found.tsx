'use client';
import React from 'react';
import { Button, Typography } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import Link from 'next/link';

const { Title, Text } = Typography;

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-gray-50 p-4">
      <div className="text-center space-y-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Title className="!text-9xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            404
          </Title>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <Title level={2} className="!text-3xl">
            Oops! Trang không tồn tại
          </Title>
          <Text className="text-gray-600 block text-lg">
            Trang bạn đang tìm kiếm có thể đã bị xóa hoặc không tồn tại
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/">
            <Button 
              type="primary"
              size="large"
              icon={<HomeOutlined />}
              className="bg-blue-600 hover:bg-blue-700 h-12 px-8 text-lg"
            >
              Về trang chủ
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;