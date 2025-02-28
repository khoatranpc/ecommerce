import axios from "axios";

const instanceAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_API,
});

instanceAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    config.headers.Authorization = token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instanceAxios.interceptors.response.use(
  (value) => {
    if (value.data.errors) {
      const getErrorMessages = ((value.data.errors as any[]) ?? [])
        .map((err) => {
          return err.message as string;
        })
        .toString();
      throw new Error(
        getErrorMessages ??
          "Đã xảy ra lỗi, không xác định vui lòng thử lại sau!"
      );
    }
    return value;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instanceAxios;
