"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Typography } from "antd";
import { UserOutlined, LockOutlined, HomeFilled } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useVerifyAccount } from "@/src/utils/hooks";
import { queryUserLogin } from "@/src/utils/graphql-queries";
import Loading from "@/src/components/Loading";
import Alert from "antd/es/alert/Alert";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

interface LoginFormInputs {
  email: string;
  password: string;
  remember: boolean;
}

const Login = () => {
  const verifyAccount = useVerifyAccount();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormInputs) => {
    verifyAccount.query(
      {
        query: queryUserLogin,
        variables: {
          input: {
            ...data,
          },
        },
      },
      (dataSuccess, error) => {
        if (dataSuccess) {
          localStorage.setItem(
            "access_token",
            dataSuccess.userLogin.access_token as string
          );
          router.push("/");
        }
      }
    );
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
          <Title
            level={2}
            className="mt-8 text-center !text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
          >
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
                required: "Vui lòng nhập email!",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email không hợp lệ!",
                },
              }}
              render={({ field }) => (
                <div className="space-y-1">
                  <Input
                    {...field}
                    prefix={<UserOutlined className="text-gray-400" />}
                    placeholder="Email"
                    status={errors.email ? "error" : ""}
                    className="rounded-lg hover:border-blue-400 focus:border-blue-500"
                  />
                  {errors.email && (
                    <Text className="!text-red-500 text-sm">
                      {errors.email.message}
                    </Text>
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
              rules={{ required: "Vui lòng nhập mật khẩu!" }}
              render={({ field }) => (
                <div className="space-y-1">
                  <Input.Password
                    {...field}
                    prefix={<LockOutlined className="text-gray-400" />}
                    placeholder="Mật khẩu"
                    status={errors.password ? "error" : ""}
                    className="rounded-lg hover:border-blue-400 focus:border-blue-500"
                  />
                  {errors.password && (
                    <Text className="!text-red-500 text-sm">
                      {errors.password.message}
                    </Text>
                  )}
                </div>
              )}
            />
          </motion.div>
          {verifyAccount.isFetched && verifyAccount.error && (
            <Alert
              message={verifyAccount.error?.message}
              type="error"
              className="!mb-2"
            />
          )}
          <div className="flex items-center justify-end">
            <Text className="text-sm text-blue-600 hover:text-blue-500 cursor-pointer transition-colors">
              Quên mật khẩu?
            </Text>
          </div>
          {verifyAccount.isFetched && verifyAccount.isSuccess && (
            <div className="max-w-full text-center justify-center flex items-center gap-4">
              <Loading className="w-[2rem]" />
              <span className="text-[var(--primary)]">
                Hệ thống đang điều hướng
              </span>
            </div>
          )}
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 h-12 text-lg rounded-lg"
              loading={verifyAccount.isPending}
              disabled={verifyAccount.isFetched && verifyAccount.isSuccess}
            >
              Đăng nhập
            </Button>
            <Button
              type="primary"
              icon={<HomeFilled />}
              className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 h-12 text-lg rounded-lg"
              onClick={() => {
                router.push("/introduction");
              }}
            >
              Khám phá
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
              Chưa có tài khoản?{" "}
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
