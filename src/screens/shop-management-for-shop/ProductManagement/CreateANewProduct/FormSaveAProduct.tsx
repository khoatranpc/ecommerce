"use client";
import React, { useEffect, useState } from "react";
import Barcode from "react-barcode";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Card,
  Typography,
  Space,
  Tag,
  Segmented,
} from "antd";
import { PlusOutlined, SaveOutlined, DeleteOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import { mapStatusToStatusProductString, Status } from "@/src/types/enum";
import {
  useCreateAProduct,
  useCurrentUser,
  useGetShopDetailByOwnerId,
  useRequestRestApi,
  useUpdateProduct,
} from "@/src/utils/hooks";
import { generateSKU } from "@/src/utils";
import SelectCategories from "@/src/components/SelectCategories";
import { IObj } from "@/src/types";
import {
  queryCreateProduct,
  queryGetShopInfo,
  queryUpdateProductById,
} from "@/src/utils/graphql-queries";
import { toast } from "react-toastify";

const { Title, Text } = Typography;
const { TextArea } = Input;

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  stock: number;
  categories: string[];
  status: Status;
  sku: string;
  variants: {
    name: string;
    price: number;
    stock: number;
    sku: string;
    status: Status;
    attributes: {
      key: string;
      value: string;
    }[];
    imageIndex?: number;
  }[];
  keywords?: string;
  images: string[];
}
interface Props {
  isEdit?: boolean;
  defaultProduct?: IObj;
  hiddenTitle?: boolean;
}
const FormSaveAProduct = (props: Props) => {
  const [mainImages, setMainImages] = useState<UploadFile[]>(
    props.defaultProduct?.images?.map((item: string) => {
      return {
        thumbUrl: item,
        url: item,
        default: true,
      };
    }) ?? []
  );
  const uploadImage = useRequestRestApi();
  const currentShop = useGetShopDetailByOwnerId();
  const getShopInfo = currentShop.data?.getShopByOwnerId as IObj;
  const currentUser = useCurrentUser();
  const getCurrent = currentUser.data?.getCurrentUser as IObj;
  const createAProduct = useCreateAProduct();
  const updateProduct = useUpdateProduct();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setValue,
    reset,
  } = useForm<ProductFormData>({
    defaultValues: props.defaultProduct
      ? {
          ...props.defaultProduct,
          categories: (props.defaultProduct.categories as IObj[]).map(
            (cat: IObj) => cat._id as string
          ),
        }
      : {
          status: Status.active,
          variants: [],
          sku: generateSKU("PROD"),
        },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const onSubmit = async (data: ProductFormData) => {
    const payload = {
      ...data,
    };

    const formData = new FormData();
    if (mainImages.length) {
      let upload = null;
      mainImages.forEach((item) => {
        if (item.originFileObj) {
          formData.append("files", item.originFileObj as Blob);
        }
      });
      if (mainImages.find((img) => img.originFileObj)) {
        upload = await uploadImage.query("/upload/multiple", "post", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (upload?.data.files) {
          payload.images = [
            ...mainImages
              .filter((item: any) => item.default)
              .map((img) => img.url),
            ...((upload?.data.files as any[]).map((img) => img.url) ?? []),
          ];
        }
      }
    }
    if (!props.isEdit) {
      createAProduct.query(
        {
          query: queryCreateProduct,
          variables: {
            input: {
              ...payload,
              shop: getShopInfo?._id,
            },
          },
        },
        (dataSuccess, error) => {
          if (dataSuccess) {
            toast.success("Lưu thông tin sản phẩm thành công!");
          }
          if (error) {
            toast.error(`Lưu thông tin thất bại! ${error.message}!`);
          }
        }
      );
    } else {
      if (props.defaultProduct) {
        delete (payload as IObj)._id;
        delete (payload as IObj).createdAt;
        delete (payload as IObj).createdBy;
        delete (payload as IObj).updatedAt;
        delete (payload as IObj).slug;
        updateProduct.query(
          {
            query: queryUpdateProductById,
            variables: {
              input: {
                _id: props.defaultProduct?._id as string,
                data: {
                  ...payload,
                  shop: getShopInfo?._id,
                  updatedBy: getCurrent!._id as string,
                },
              },
            },
          },
          (data, error) => {
            if (data) {
              toast.success("Cập nhật sản phẩm thành công!");
            }
            if (error) {
              toast.error(`Thất bại! ${error.message}`);
            }
          }
        );
      }
    }
  };
  useEffect(() => {
    if (getCurrent && !getShopInfo) {
      currentShop.query({
        query: queryGetShopInfo,
        variables: {
          input: {
            ownerId: getCurrent._id as string,
          },
        },
      });
    }
  }, []);
  useEffect(() => {
    if (createAProduct.isSuccess) {
      createAProduct.clear?.();
      reset();
    }
    if (updateProduct.isSuccess) {
      updateProduct.clear?.();
      reset();
    }
  }, [createAProduct.isSuccess, updateProduct.isSuccess]);
  return (
    <div className="max-w-5xl mx-auto relative">
      <div className="flex items-center justify-between mb-8 sticky top-0 z-50 bg-white py-2">
        {!props.hiddenTitle && (
          <Title level={3} className="!mb-0">
            Thêm sản phẩm mới
          </Title>
        )}
        <Text type="danger" strong>
          {Object.keys(errors).length !== 0 &&
            "Hãy hoàn thiện thông tin cần thiết trước khi lưu!"}
        </Text>
        <Space>
          {!props.isEdit && (
            <Button
              onClick={() => {
                router.push("/shop-management/products");
              }}
            >
              Quay lại
            </Button>
          )}
          <Button
            type="primary"
            onClick={handleSubmit(onSubmit)}
            icon={<SaveOutlined />}
            disabled={
              !isValid ||
              createAProduct.isPending ||
              uploadImage.data.isPending ||
              updateProduct.isPending
            }
            loading={
              createAProduct.isPending ||
              uploadImage.data.isPending ||
              updateProduct.isPending
            }
          >
            Lưu sản phẩm
          </Button>
        </Space>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Card
          size="small"
          title={
            <Space>
              <span className="text-lg">Thông tin cơ bản</span>
              <Tag color="blue">Bắt buộc</Tag>
            </Space>
          }
          className="shadow-none border-dashed !mb-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Controller
              name="name"
              control={control}
              rules={{ required: "Vui lòng nhập tên sản phẩm" }}
              render={({ field }) => (
                <Form.Item
                  label="Tên sản phẩm"
                  validateStatus={errors.name ? "error" : ""}
                  help={errors.name?.message}
                  required
                  className="mb-0"
                  layout="vertical"
                >
                  <Input
                    {...field}
                    placeholder="Nhập tên sản phẩm"
                    size="middle"
                  />
                </Form.Item>
              )}
            />

            <Controller
              name="price"
              control={control}
              rules={{ required: "Vui lòng nhập giá", min: 0 }}
              render={({ field }) => (
                <Form.Item
                  label="Giá bán"
                  validateStatus={errors.price ? "error" : ""}
                  help={errors.price?.message}
                  required
                  className="mb-0"
                  layout="vertical"
                >
                  <InputNumber
                    {...field}
                    className="w-full"
                    size="middle"
                    min={0}
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    addonAfter="₫"
                  />
                </Form.Item>
              )}
            />
            <div className="flex col-span-full grid grid-cols-2 gap-4">
              <Controller
                name="keywords"
                control={control}
                render={({ field }) => (
                  <Form.Item
                    className="mb-0 flex-1"
                    label="Từ khoá tìm kiếm"
                    layout="vertical"
                  >
                    <Input
                      {...field}
                      placeholder="Nhập từ khoá tìm kiếm"
                      size="middle"
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="categories"
                rules={{
                  required: "Lựa chọn ít nhất một danh mục",
                }}
                control={control}
                render={({ field }) => (
                  <Form.Item
                    className="mb-0 flex-1"
                    label="Danh mục"
                    layout="vertical"
                    required
                  >
                    <SelectCategories
                      {...field}
                      size="middle"
                      shopId={getShopInfo?._id}
                    />
                  </Form.Item>
                )}
              />
            </div>
            <div className="flex col-span-full grid grid-cols-2">
              <Controller
                name="sku"
                rules={{ required: "Vui lòng nhập mã sản phẩm" }}
                control={control}
                render={({ field }) => (
                  <Form.Item
                    required
                    className="mb-0 flex-1"
                    label="SKU"
                    layout="vertical"
                    validateStatus={errors.sku ? "error" : ""}
                    help={errors.sku?.message}
                  >
                    <Input
                      required
                      {...field}
                      placeholder="Nhập mã sản phẩm"
                      size="middle"
                    />
                  </Form.Item>
                )}
              />
              <div className="flex justify-center">
                <Barcode
                  width={1}
                  height={50}
                  value={watch("sku")}
                  fontSize={10}
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <Controller
                name={`stock`}
                control={control}
                rules={{ required: "Vui lòng nhập số lượng", min: 0 }}
                render={({ field }) => (
                  <Form.Item
                    label="Số lượng"
                    validateStatus={errors?.stock ? "error" : ""}
                    help={errors.stock?.message}
                    required
                    className="mb-0"
                  >
                    <InputNumber {...field} className="w-full" min={0} />
                  </Form.Item>
                )}
              />
              <Controller
                name="status"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Form.Item
                    className="mb-0"
                    label="Trạng thái sản phẩm"
                    layout="vertical"
                  >
                    <Segmented
                      options={Object.keys(Status).map((status) => {
                        return {
                          label:
                            mapStatusToStatusProductString[status as Status],
                          value: status,
                        };
                      })}
                      value={value}
                      color="red"
                      onChange={(value) => {
                        onChange(value);
                      }}
                    />
                  </Form.Item>
                )}
              />
            </div>
            <div className="md:col-span-2">
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Form.Item label="Mô tả" className="mb-0">
                    <TextArea
                      {...field}
                      rows={4}
                      placeholder="Nhập mô tả sản phẩm"
                      size="middle"
                    />
                  </Form.Item>
                )}
              />
            </div>
          </div>
        </Card>

        <Card
          size="small"
          title="Hình ảnh sản phẩm"
          className="shadow-none border-dashed !mb-2"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              {mainImages.map((image, index) => (
                <div key={image.uid} className="relative group">
                  <img
                    src={image.url}
                    alt={`Product ${index + 1}`}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  <button
                    onClick={() => {
                      const newImages = [...mainImages];
                      newImages.splice(index, 1);
                      setMainImages(newImages);
                    }}
                    className="absolute top-2 right-2 w-6 h-6 cursor-pointer flex justify-center items-center rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <DeleteOutlined className="cursor-pointer" />
                  </button>
                </div>
              ))}
              <label className="border-2 border-dashed border-gray-300 rounded-lg aspect-square flex flex-col items-center justify-center cursor-pointer hover:border-[var(--primary)] transition-colors">
                <input
                  type="file"
                  multiple
                  accept=".jpeg,.jpg,.png,.gif,.webp"
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    const newImages = files.map((file) => ({
                      uid: `${file.name}-${Date.now()}`,
                      name: file.name,
                      status: "done",
                      url: URL.createObjectURL(file),
                      thumbUrl: URL.createObjectURL(file),
                      originFileObj: file,
                    })) as UploadFile[];
                    setMainImages([...mainImages, ...newImages]);
                    e.target.value = "";
                  }}
                />
                <PlusOutlined className="text-2xl text-gray-400" />
                <div className="mt-2 text-gray-500">Tải ảnh</div>
              </label>
            </div>
            <Text type="secondary">
              Hỗ trợ *.jpeg, *.jpg, *.png, *.gif, *.webp
              <br />
              Dung lượng tối đa 2MB mỗi ảnh
            </Text>
          </div>
        </Card>

        <Card
          size="small"
          title={
            <div className="flex items-center justify-between">
              <Space>
                <span className="text-lg">Phân loại sản phẩm</span>
                <Tag color="orange">Tùy chọn</Tag>
              </Space>
              <Button
                type="primary"
                ghost
                onClick={() =>
                  append({
                    name: "",
                    price: 0,
                    stock: 0,
                    sku: generateSKU(`PROD-V${fields.length + 1}`),
                    status: Status.active,
                    attributes: [],
                    imageIndex: 0,
                  })
                }
                icon={<PlusOutlined />}
              >
                Thêm phân loại
              </Button>
            </div>
          }
          className="shadow-none border-dashed !mb-2"
        >
          <div className="space-y-4">
            {fields.map((field, index) => (
              <Card
                key={field.id}
                size="small"
                className="bg-gray-50"
                extra={
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => remove(index)}
                  />
                }
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Form.Item label="Hình ảnh phân loại" className="mb-4">
                      <div className="flex gap-2 overflow-x-auto py-2">
                        {mainImages.map((image, idx) => {
                          return (
                            <Controller
                              key={image.uid}
                              name={`variants.${index}.imageIndex`}
                              control={control}
                              render={({ field: { value, onChange } }) => {
                                return (
                                  <div
                                    className={`relative cursor-pointer border-2 rounded-lg overflow-hidden ${
                                      value === idx
                                        ? "border-[var(--primary)]"
                                        : "border-[#d9d9d9]"
                                    }`}
                                    onClick={() => onChange(idx)}
                                  >
                                    <img
                                      src={image.thumbUrl}
                                      alt={`Variant ${idx + 1}`}
                                      className="w-20 h-20 object-cover"
                                    />
                                  </div>
                                );
                              }}
                            />
                          );
                        })}
                      </div>
                    </Form.Item>
                  </div>
                  <div>
                    <Controller
                      name={`variants.${index}.name`}
                      control={control}
                      rules={{ required: "Vui lòng nhập tên phân loại" }}
                      render={({ field }) => (
                        <Form.Item
                          label="Tên phân loại"
                          validateStatus={
                            errors.variants?.[index]?.name ? "error" : ""
                          }
                          help={errors.variants?.[index]?.name?.message}
                          required
                          className="mb-0"
                        >
                          <Input {...field} placeholder="VD: Màu đen, Size L" />
                        </Form.Item>
                      )}
                    />
                    <Controller
                      name={`variants.${index}.status`}
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <Form.Item
                          className="mb-0"
                          label="Trạng thái phân loại"
                          layout="vertical"
                        >
                          <Segmented
                            options={Object.keys(Status).map((status) => {
                              return {
                                label:
                                  mapStatusToStatusProductString[
                                    status as Status
                                  ],
                                value: status,
                              };
                            })}
                            value={value}
                            color="red"
                            onChange={(value) => {
                              onChange(value);
                            }}
                          />
                        </Form.Item>
                      )}
                    />
                  </div>
                  <div className="flex flex-col">
                    <Controller
                      name={`variants.${index}.sku`}
                      control={control}
                      rules={{ required: "Vui lòng nhập SKU" }}
                      render={({ field }) => (
                        <Form.Item
                          label="SKU"
                          validateStatus={
                            errors.variants?.[index]?.sku ? "error" : ""
                          }
                          help={errors.variants?.[index]?.sku?.message}
                          required
                          className="!mb-0 flex-1"
                        >
                          <Input {...field} placeholder="VD: SP001-DEN-L" />
                        </Form.Item>
                      )}
                    />
                    <div className="self-end">
                      <Barcode
                        value={field.sku}
                        width={1}
                        height={50}
                        fontSize={10}
                      />
                    </div>
                  </div>
                  <Controller
                    name={`variants.${index}.price`}
                    control={control}
                    rules={{ required: "Vui lòng nhập giá", min: 0 }}
                    render={({ field }) => (
                      <Form.Item
                        label="Giá bán"
                        validateStatus={
                          errors.variants?.[index]?.price ? "error" : ""
                        }
                        help={errors.variants?.[index]?.price?.message}
                        required
                        className="mb-0"
                      >
                        <InputNumber
                          {...field}
                          className="w-full"
                          min={0}
                          formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                          addonAfter="₫"
                        />
                      </Form.Item>
                    )}
                  />

                  <Controller
                    name={`variants.${index}.stock`}
                    control={control}
                    rules={{ required: "Vui lòng nhập số lượng", min: 0 }}
                    render={({ field }) => (
                      <Form.Item
                        label="Số lượng"
                        validateStatus={
                          errors.variants?.[index]?.stock ? "error" : ""
                        }
                        help={errors.variants?.[index]?.stock?.message}
                        required
                        className="mb-0"
                      >
                        <InputNumber {...field} className="w-full" min={0} />
                      </Form.Item>
                    )}
                  />

                  {/* Add this section for attributes */}
                  <div className="md:col-span-2">
                    <Form.Item label="Thuộc tính" className="mb-4">
                      <div className="space-y-4">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="text-left p-2 border border-gray-200">
                                Tên thuộc tính
                              </th>
                              <th className="text-left p-2 border border-gray-200">
                                Giá trị
                              </th>
                              <th className="w-20 p-2 border border-gray-200">
                                Thao tác
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {watch(`variants.${index}.attributes`).map(
                              (attr, attrIndex) => (
                                <tr
                                  key={attrIndex}
                                  className="border-b border-gray-200"
                                >
                                  <td className="p-2 border border-gray-200">
                                    <Input
                                      value={attr.key}
                                      onChange={(e) => {
                                        const newAttributes = [
                                          ...watch(
                                            `variants.${index}.attributes`
                                          ),
                                        ];
                                        newAttributes[attrIndex].key =
                                          e.target.value;
                                        setValue(
                                          `variants.${index}.attributes`,
                                          newAttributes
                                        );
                                      }}
                                      placeholder="Tên thuộc tính"
                                    />
                                  </td>
                                  <td className="p-2 border border-gray-200">
                                    <Controller
                                      name={`variants.${index}.attributes.${attrIndex}.value`}
                                      control={control}
                                      render={({ field }) => (
                                        <Input
                                          {...field}
                                          placeholder="Giá trị thuộc tính"
                                        />
                                      )}
                                    />
                                  </td>
                                  <td className="p-2 text-center border border-gray-200">
                                    <Button
                                      type="text"
                                      danger
                                      icon={<DeleteOutlined />}
                                      onClick={() => {
                                        const newAttributes = [
                                          ...watch(
                                            `variants.${index}.attributes`
                                          ),
                                        ];
                                        newAttributes.splice(attrIndex, 1);
                                        setValue(
                                          `variants.${index}.attributes`,
                                          newAttributes
                                        );
                                      }}
                                    />
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                        <Button
                          type="dashed"
                          block
                          icon={<PlusOutlined />}
                          onClick={() => {
                            const newAttributes = [
                              ...watch(`variants.${index}.attributes`),
                            ];
                            newAttributes.push({ key: "", value: "" });
                            setValue(
                              `variants.${index}.attributes`,
                              newAttributes
                            );
                          }}
                        >
                          Thêm thuộc tính
                        </Button>
                      </div>
                    </Form.Item>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </form>
    </div>
  );
};

export default FormSaveAProduct;
