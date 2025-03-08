"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Form,
  Input,
  Button,
  Upload,
  Space,
  Divider,
  Row,
  Col,
  Select,
} from "antd";
import {
  ShopOutlined,
  UploadOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  FacebookOutlined,
  InstagramOutlined,
  TikTokOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import SelectLocationVN from "@/src/components/SelectLocationVN";
import {
  useCreateShopInfo,
  useCurrentUser,
  useGetShopDetailByOwnerId,
} from "@/src/utils/hooks";
import {
  queryCreateShopInfo,
  queryGetShopInfo,
} from "@/src/utils/graphql-queries";
import { toast } from "react-toastify";
import { IObj } from "@/src/types";

const { Title, Text } = Typography;
const { TextArea } = Input;

const ShopInfo = () => {
  const createShopInfo = useCreateShopInfo();
  const currentShopInfo = useGetShopDetailByOwnerId();
  const getCurrentShopInfo = currentShopInfo.data?.getShopByOwnerId as IObj;
  const currUser = useCurrentUser();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const onFinish = (values: any) => {
    delete values._id;
    createShopInfo.query(
      {
        query: queryCreateShopInfo,
        variables: {
          input: {
            ...values,
            owner: currUser.data.getCurrentUser._id as string,
          },
        },
      },
      (dataSuccess, error) => {
        if (dataSuccess) {
          toast.success("Lưu thông tin thành công!");
        }
        if (error) {
          toast.error(`Thất bại! ${error.message}`);
        }
      }
    );
  };
  useEffect(() => {
    if (
      !currentShopInfo.data?.getShopByOwnerId &&
      !currentShopInfo.isFetched &&
      currUser.data?.getCurrentUser
    ) {
      currentShopInfo.query({
        query: queryGetShopInfo,
        variables: {
          input: {
            ownerId: currUser.data?.getCurrentUser?._id as string,
          },
        },
      });
    }
  }, [currUser.data]);
  return (
    <div className="mx-auto">
      <Title level={2} className="flex items-center gap-2 !mb-6">
        <ShopOutlined />
        Thông tin cửa hàng
      </Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={getCurrentShopInfo}
      >
        <Row gutter={[16, 0]}>
          <Col xs={24} md={8}>
            <Card className="text-center">
              <Form.Item name="logo" label="Logo cửa hàng">
                <Upload
                  action={"http://localhost:4000/upload/single"}
                  listType="picture-card"
                  onRemove={(file) => {
                    if (fileList.length) return true;
                  }}
                  maxCount={1}
                  fileList={
                    fileList.length
                      ? fileList
                      : [
                          {
                            name: "logo",
                            uid: "1",
                            url: (getCurrentShopInfo?.logo as string) ?? "",
                          },
                        ]
                  }
                  onChange={(info) => {
                    setFileList(info.fileList);
                    const getUrl = info.fileList[0]?.response?.url as string;
                    form.setFieldValue("logo", getUrl);
                  }}
                  className="!w-full [&_.ant-upload]:!w-full [&_.ant-upload-select]:!w-full [&_.ant-upload-list-item-container]:!w-full [&_.ant-upload-list-item-container]:!h-auto"
                >
                  {fileList.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-[200px]">
                      <UploadOutlined className="text-2xl" />
                      <div className="mt-2">Tải lên logo</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
            </Card>
          </Col>

          <Col xs={24} md={16}>
            <Form.Item
              label="Tên cửa hàng"
              name="name"
              rules={[
                { required: true, message: "Vui lòng nhập tên cửa hàng" },
              ]}
            >
              <Input
                prefix={<ShopOutlined />}
                placeholder="Nhập tên cửa hàng"
              />
            </Form.Item>

            <Space className="w-full gap-4">
              <Form.Item
                className="flex-1"
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email" },
                  { type: "email", message: "Email không hợp lệ" },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Email liên hệ" />
              </Form.Item>

              <Form.Item
                className="flex-1"
                label="Số điện thoại"
                name="phone"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại" },
                ]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="Số điện thoại" />
              </Form.Item>
            </Space>
            <Row>
              <Col span={24}>
                <Form.Item label="Mô tả của hàng" name="description">
                  <TextArea
                    placeholder="Mô tả về cửa hàng của bạn"
                    rows={4}
                    showCount
                    maxLength={500}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>

        <Divider />
        <Title level={4}>Địa chỉ</Title>
        <Space direction="vertical" className="w-full">
          <SelectLocationVN
            initialValue={getCurrentShopInfo?.address as any}
            onChange={(values) => {
              const currentAddress = form.getFieldValue("address") || {};
              form.setFieldValue("address", {
                ...currentAddress,
                province: values.province,
                district: values.district,
                ward: values.ward,
              });
            }}
          />
          <Form.Item label="Địa chỉ chi tiết" rules={[{ required: true }]}>
            <Input
              prefix={<EnvironmentOutlined />}
              placeholder="Số nhà, tên đường..."
              onChange={(e) => {
                const currentAddress = form.getFieldValue("address") || {};
                form.setFieldValue("address", {
                  ...currentAddress,
                  detail: e.target.value,
                });
              }}
            />
          </Form.Item>
        </Space>

        <Divider />

        <Title level={4}>Mạng xã hội</Title>
        <Space direction="vertical" className="w-full">
          <Form.Item name="facebook" label="Facebook">
            <Input
              prefix={<FacebookOutlined />}
              placeholder="Link Facebook của cửa hàng"
            />
          </Form.Item>

          <Form.Item name="instagram" label="Instagram">
            <Input
              prefix={<InstagramOutlined />}
              placeholder="Link Instagram của cửa hàng"
            />
          </Form.Item>
          <Form.Item name="tiktok" label="Tiktok">
            <Input
              prefix={<TikTokOutlined />}
              placeholder="Link Tiktok của cửa hàng"
            />
          </Form.Item>
          <Form.Item name="youtube" label="Youtube">
            <Input
              prefix={<YoutubeOutlined />}
              placeholder="Link Youtube của cửa hàng"
            />
          </Form.Item>
        </Space>

        <Form.Item className="text-right">
          <Space>
            <Button>Hủy</Button>
            <Button
              disabled={createShopInfo.isPending}
              loading={createShopInfo.isPending}
              type="primary"
              htmlType="submit"
            >
              Lưu thay đổi
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ShopInfo;
