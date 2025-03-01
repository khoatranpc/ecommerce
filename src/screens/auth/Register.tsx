"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Typography, DatePicker, message, Alert } from "antd";
import {
  UserOutlined,
  MailOutlined,
  HomeOutlined,
  PhoneOutlined,
  CheckCircleFilled,
  CloseOutlined,
  CloseCircleFilled,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import TextArea from "antd/es/input/TextArea";
import { IObj } from "@/src/types";
import { useUserRegister } from "@/src/utils/hooks";
import { queryUserRegister } from "@/src/utils/graphql-queries";

const { Title, Text } = Typography;

interface RegisterFormInputs {
  name: string;
  email: string;
  phoneNumber: string;
  dob: Date;
  address: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormInputs>();
  const password = watch("password");

  const userRegister = useUserRegister();

  const onSubmit = (data: RegisterFormInputs) => {
    const getPayloadRegister: IObj = data;
    delete getPayloadRegister.confirmPassword;
    getPayloadRegister.dob = new Date(data.dob).getTime();
    userRegister.query({
      query: queryUserRegister,
      variables: {
        input: getPayloadRegister,
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-gray-50 py-12">
      <div className="absolute inset-0 bg-[url('/static/grid-pattern.png')] opacity-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full space-y-8 bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-xl relative z-10 mx-4"
      >
        <motion.div
          className="text-center"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative mb-6">
            <div className="absolute -inset-1 bg-blue-100/50 rounded-full blur-xl"></div>
            <img
              src="/static/logo-short.png"
              alt="Logo"
              className="mx-auto h-14 w-auto relative"
            />
          </div>
          <Title
            level={2}
            className="!text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
          >
            Đăng ký tài khoản
          </Title>
          <p className="text-gray-600">
            Tạo tài khoản để trải nghiệm dịch vụ của chúng tôi
          </p>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Controller
              name="name"
              control={control}
              rules={{ required: "Vui lòng nhập họ tên!" }}
              render={({ field }) => (
                <div>
                  <Input
                    {...field}
                    prefix={<UserOutlined className="text-gray-400" />}
                    placeholder="Họ và tên"
                    size="large"
                    status={errors.name ? "error" : ""}
                    className="rounded-lg"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="email"
              control={control}
              rules={{
                required: "Vui lòng nhập email!",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email không hợp lệ!",
                },
              }}
              render={({ field }) => (
                <div>
                  <Input
                    {...field}
                    prefix={<MailOutlined className="text-gray-400" />}
                    placeholder="Email"
                    size="large"
                    status={errors.email ? "error" : ""}
                    className="rounded-lg"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="phoneNumber"
              control={control}
              rules={{
                required: "Vui lòng nhập số điện thoại!",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Số điện thoại không hợp lệ!",
                },
              }}
              render={({ field }) => (
                <div>
                  <Input
                    {...field}
                    prefix={<PhoneOutlined className="text-gray-400" />}
                    placeholder="Số điện thoại"
                    size="large"
                    status={errors.phoneNumber ? "error" : ""}
                    className="rounded-lg"
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="dob"
              control={control}
              rules={{ required: "Vui lòng chọn ngày sinh!" }}
              render={({ field }) => (
                <div>
                  <DatePicker
                    {...field}
                    placeholder="Ngày sinh"
                    size="large"
                    className="w-full rounded-lg"
                    status={errors.dob ? "error" : ""}
                    format="DD/MM/YYYY"
                  />
                  {errors.dob && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.dob.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <Controller
            name="address"
            control={control}
            rules={{ required: "Vui lòng nhập địa chỉ!" }}
            render={({ field }) => (
              <div>
                <TextArea
                  {...field}
                  placeholder="Địa chỉ"
                  status={errors.address ? "error" : ""}
                  className="rounded-lg"
                  rows={3}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Vui lòng nhập mật khẩu!",
                minLength: {
                  value: 6,
                  message: "Mật khẩu phải có ít nhất 6 ký tự!",
                },
              }}
              render={({ field }) => (
                <div>
                  <Input.Password
                    {...field}
                    placeholder="Mật khẩu"
                    size="large"
                    status={errors.password ? "error" : ""}
                    className="rounded-lg"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Vui lòng xác nhận mật khẩu!",
                validate: (value) =>
                  value === password || "Mật khẩu không khớp!",
              }}
              render={({ field }) => (
                <div>
                  <Input.Password
                    {...field}
                    placeholder="Xác nhận mật khẩu"
                    size="large"
                    status={errors.confirmPassword ? "error" : ""}
                    className="rounded-lg"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
          {userRegister.isFetched && (
            <Alert
              className="!mb-4"
              description={
                <p className="text-sm">
                  {userRegister.isFetched && userRegister.isSuccess ? (
                    <CheckCircleFilled
                      style={{
                        color: "var(--primary)",
                      }}
                      className="mr-2"
                    />
                  ) : (
                    <CloseCircleFilled
                      style={{
                        color: "red",
                      }}
                      className="mr-2"
                    />
                  )}
                  {userRegister.isFetched && userRegister.isSuccess
                    ? "Đăng ký tài khoản thành công!"
                    : `Đăng ký thất bại! ${
                        (userRegister.error?.message as string) ?? ""
                      }`}
                </p>
              }
              type={
                userRegister.isFetched && userRegister.isSuccess
                  ? "success"
                  : "error"
              }
            />
          )}
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 h-12 text-lg rounded-lg"
              loading={userRegister.isPending}
              disabled={userRegister.isFetched && userRegister.isSuccess}
            >
              Đăng ký
            </Button>
          </motion.div>

          <div className="text-center">
            <p className="text-gray-600">
              Đã có tài khoản?{" "}
              <motion.a
                href="/login"
                className="text-blue-600 hover:text-blue-700 font-medium"
                whileHover={{ scale: 1.05 }}
              >
                Đăng nhập ngay
              </motion.a>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
