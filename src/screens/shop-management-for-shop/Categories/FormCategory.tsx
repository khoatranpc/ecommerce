"use client";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Input, Button, Space, Typography, Radio } from "antd";
import { SaveOutlined, CloseOutlined } from "@ant-design/icons";
import { mapStatusToString, Status } from "@/src/types/enum";
import UploadImg from "@/src/components/Upload";
import {
  useCreateCategory,
  useGetCategories,
  useGetShopDetailByOwnerId,
} from "@/src/utils/hooks";
import { queryCreateCategory } from "@/src/utils/graphql-queries";
import { toast } from "react-toastify";
const { Title } = Typography;
const { TextArea } = Input;

interface CategoryFormData {
  name: string;
  slug: string;
  description: string;
  status: Status;
  imageUrl: string;
}

interface FormCategoryProps {
  onCancel: () => void;
  handleRefresh: () => void;
  initialValues?: Partial<CategoryFormData>;
  isEdit?: boolean;
}

const FormCategory: React.FC<FormCategoryProps> = ({
  onCancel,
  initialValues,
  isEdit = false,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
  } = useForm<CategoryFormData>({
    defaultValues: {
      name: initialValues?.name || "",
      slug: initialValues?.slug || "",
      description: initialValues?.description || "",
      status: initialValues?.status ?? Status.active,
      imageUrl: initialValues?.imageUrl ?? "",
    },
  });
  const createCategory = useCreateCategory();
  const listCategory = useGetCategories();
  const currentShop = useGetShopDetailByOwnerId();
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };
  const onSubmit = (data: CategoryFormData) => {
    if (!isEdit) {
      createCategory.query(
        {
          query: queryCreateCategory,
          variables: {
            input: {
              ...data,
              shop: currentShop.data!.getShopByOwnerId?._id as string,
            },
          },
        },
        (dataSuccess, error) => {
          if (dataSuccess) {
            toast.success("Lưu danh mục thành công!");
          }
          if (error) {
            toast.error(`Lưu thông tin thất bại! ${error.message ?? ""}`);
          }
        }
      );
    }
  };
  useEffect(() => {
    if (createCategory.isSuccess && createCategory.isFetched) {
      createCategory.clear?.();
      listCategory.refresh?.();
      onCancel();
    }
  }, [createCategory.isSuccess]);
  return (
    <div>
      <Title level={3} className="mb-6">
        {isEdit ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
      </Title>

      <Form
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <Form.Item label="Ảnh đại diện danh mục" className="">
          <UploadImg
            defaultFileList={
              getValues().imageUrl
                ? [
                    {
                      name: "imageUrl",
                      uid: "1",
                      url: getValues().imageUrl ?? "",
                    },
                  ]
                : undefined
            }
            getListUrl={(listUrl) => {
              setValue("imageUrl", listUrl?.[0] ?? getValues().imageUrl ?? "");
            }}
          />
        </Form.Item>
        <Controller
          name="name"
          control={control}
          rules={{ required: "Vui lòng nhập tên danh mục" }}
          render={({ field }) => (
            <Form.Item
              label="Tên danh mục"
              validateStatus={errors.name ? "error" : ""}
              help={errors.name?.message}
              required
            >
              <Input
                {...field}
                placeholder="Nhập tên danh mục"
                onChange={(e) => {
                  field.onChange(e);
                  const newSlug = generateSlug(e.target.value);
                  setValue("slug", newSlug);
                }}
              />
            </Form.Item>
          )}
        />

        <Controller
          name="slug"
          control={control}
          rules={{ required: "Vui lòng nhập slug" }}
          render={({ field }) => (
            <Form.Item
              label="Slug"
              validateStatus={errors.slug ? "error" : ""}
              help={errors.slug?.message}
              required
            >
              <Input {...field} placeholder="nhap-ten-danh-muc" />
            </Form.Item>
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Form.Item label="Mô tả">
              <TextArea
                {...field}
                placeholder="Nhập mô tả cho danh mục"
                rows={4}
                showCount
                maxLength={500}
              />
            </Form.Item>
          )}
        />

        <Controller
          name="status"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Form.Item label="Trạng thái">
              <Radio.Group defaultValue={value}>
                {Object.keys(Status).map((item) => {
                  return (
                    <Radio value={item} key={item}>
                      {mapStatusToString[item as Status]}
                    </Radio>
                  );
                })}
              </Radio.Group>
            </Form.Item>
          )}
        />

        <Form.Item className="flex justify-end">
          <Space>
            <Button icon={<CloseOutlined />} onClick={onCancel}>
              Hủy
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              loading={isSubmitting}
            >
              {isEdit ? "Cập nhật" : "Tạo mới"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormCategory;
