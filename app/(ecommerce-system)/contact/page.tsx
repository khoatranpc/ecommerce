'use client';
import React from 'react';
import { Button, Form, Input, Typography, message } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, GlobalOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const ContactPage = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Form values:', values);
    message.success('Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất!');
    form.resetFields();
  };

  return (
    <div className="min-h-screen py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <Title level={1} className="!text-4xl md:!text-5xl mb-4">
            Liên hệ <span className="text-[var(--primary)]">với chúng tôi</span>
          </Title>
          <Paragraph className="text-gray-600 text-lg">
            Hãy để lại thông tin, chúng tôi sẽ liên hệ với bạn sớm nhất có thể
          </Paragraph>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                className="space-y-4"
              >
                <Form.Item
                  name="name"
                  label="Họ và tên"
                  rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                >
                  <Input size="large" className="rounded-lg" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Vui lòng nhập email!' },
                    { type: 'email', message: 'Email không hợp lệ!' }
                  ]}
                >
                  <Input size="large" className="rounded-lg" />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Số điện thoại"
                  rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                >
                  <Input size="large" className="rounded-lg" />
                </Form.Item>

                <Form.Item
                  name="message"
                  label="Nội dung"
                  rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
                >
                  <TextArea rows={4} className="rounded-lg" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" size="large" className="w-full">
                    Gửi tin nhắn
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <Title level={2} className="!text-3xl mb-6">
                Thông tin liên hệ
              </Title>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <PhoneOutlined className="text-xl text-[var(--primary)]" />
                  </div>
                  <div>
                    <Text strong className="block mb-1">Điện thoại</Text>
                    <Text className="text-gray-600">+84 123 456 789</Text>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <MailOutlined className="text-xl text-[var(--primary)]" />
                  </div>
                  <div>
                    <Text strong className="block mb-1">Email</Text>
                    <Text className="text-gray-600">contact@example.com</Text>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <EnvironmentOutlined className="text-xl text-[var(--primary)]" />
                  </div>
                  <div>
                    <Text strong className="block mb-1">Địa chỉ</Text>
                    <Text className="text-gray-600">
                      123 Đường ABC, Quận XYZ, TP.HCM
                    </Text>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <GlobalOutlined className="text-xl text-[var(--primary)]" />
                  </div>
                  <div>
                    <Text strong className="block mb-1">Website</Text>
                    <Text className="text-gray-600">www.example.com</Text>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4241674197956!2d106.69843!3d10.776969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ2JzM3LjEiTiAxMDbCsDQxJzU0LjMiRQ!5e0!3m2!1sen!2s!4v1635764293727!5m2!1sen!2s"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;