'use client';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Button, Typography, Divider, message, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined, GithubOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Title, Text } = Typography;

interface LoginFormInputs {
  email: string;
  password: string;
  remember: boolean;
}

const Login = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    defaultValues: {
      email: '',
      password: '',
      remember: false
    }
  });

  const onSubmit = (data: LoginFormInputs) => {
    console.log('Success:', data);
    message.success('Đăng nhập thành công!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-gray-50">
      <div className="absolute inset-0 bg-[url('/static/grid-pattern.png')] opacity-10"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8 bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-xl relative z-10"
      >
        <motion.div 
          className="text-center"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-blue-100/50 rounded-full blur-xl"></div>
            <img
              src="/static/logo-short.png"
              alt="Logo"
              className="mx-auto h-14 w-auto relative"
            />
          </div>
          <Title level={2} className="mt-8 text-center !text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Đăng nhập vào hệ thống
          </Title>
          <Text className="mt-2 text-gray-600 block">
            Chào mừng bạn quay trở lại!
          </Text>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Vui lòng nhập email!',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email không hợp lệ!'
                }
              }}
              render={({ field }) => (
                <div className="space-y-1">
                  <Input
                    {...field}
                    prefix={<UserOutlined className="text-gray-400" />}
                    placeholder="Email"
                    status={errors.email ? 'error' : ''}
                    className="rounded-lg hover:border-blue-400 focus:border-blue-500"
                  />
                  {errors.email && (
                    <Text className="text-red-500 text-sm">{errors.email.message}</Text>
                  )}
                </div>
              )}
            />
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Controller
              name="password"
              control={control}
              rules={{ required: 'Vui lòng nhập mật khẩu!' }}
              render={({ field }) => (
                <div className="space-y-1">
                  <Input.Password
                    {...field}
                    prefix={<LockOutlined className="text-gray-400" />}
                    placeholder="Mật khẩu"
                    status={errors.password ? 'error' : ''}
                    className="rounded-lg hover:border-blue-400 focus:border-blue-500"
                  />
                  {errors.password && (
                    <Text className="text-red-500 text-sm">{errors.password.message}</Text>
                  )}
                </div>
              )}
            />
          </motion.div>

          <div className="flex items-center justify-between">
            <Controller
              name="remember"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Checkbox checked={value} onChange={onChange}>
                  Ghi nhớ đăng nhập
                </Checkbox>
              )}
            />
            <Text className="text-sm text-blue-600 hover:text-blue-500 cursor-pointer transition-colors">
              Quên mật khẩu?
            </Text>
          </div>

          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 h-12 text-lg rounded-lg"
            >
              Đăng nhập
            </Button>
          </motion.div>

          {/* <Divider className="!border-gray-200">
            <span className="text-gray-400">Hoặc đăng nhập với</span>
          </Divider>

          <div className="grid grid-cols-2 gap-4">
            <Button
              icon={<GoogleOutlined />}
              size="large"
              className="flex items-center justify-center hover:border-blue-400 hover:text-blue-600 rounded-lg"
            >
              Google
            </Button>
            <Button
              icon={<GithubOutlined />}
              size="large"
              className="flex items-center justify-center hover:border-blue-400 hover:text-blue-600 rounded-lg"
            >
              Github
            </Button>
          </div> */}

          <div className="text-center mt-6">
            <Text className="text-gray-600">
              Chưa có tài khoản?{' '}
              <motion.a 
                href="/register" 
                className="text-blue-600 hover:text-blue-700 font-medium"
                whileHover={{ scale: 1.05 }}
              >
                Đăng ký ngay
              </motion.a>
            </Text>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;