import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import dynamic from "next/dynamic";
import Loading from "@/src/components/Loading";
import 'react-quill-new/dist/quill.snow.css';
import "./globals.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ECommerce Solution",
  description:
    "Cung cấp hệ thống, nền tảng thương mại điện tử, phù hợp cho các cửa hàng kinh doanh",
  icons: "/static/logo-short.png",
};
const StoreProvider = dynamic(() => import("@/src/store/StoreProvider"));
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AntdRegistry>
          <ConfigProvider
            componentSize="small"
            spin={{
              indicator: <Loading />,
            }}
            theme={{
              token: {
                fontSize: 10,
                colorPrimary: "#F37F2C",
              },
            }}
          >
            <StoreProvider>{children}</StoreProvider>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
