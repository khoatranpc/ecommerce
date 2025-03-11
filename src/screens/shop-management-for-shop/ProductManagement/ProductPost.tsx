"use client";
import React, { useEffect } from "react";
import { Card, Button, Form, Input, Space, Typography } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill-new";
import { Controller, useForm } from "react-hook-form";
import SelectStatus from "@/src/components/SelectStatus";
import {
  useCreateAPost,
  useGetShopDetailByOwnerId,
  usePostDetail,
} from "@/src/utils/hooks";
import { useParams } from "next/navigation";
import { queryCreateAPost, queryGetOnePost } from "@/src/utils/graphql-queries";
import { IObj } from "@/src/types";
import Loading from "@/src/components/Loading";
import SelectCategories from "@/src/components/SelectCategories";
import { toast } from "react-toastify";

const { Title } = Typography;

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "link",
  "image",
  "color",
  "background",
];

interface PostFormData {
  title: string;
  description: string;
  content: string;
  status: string;
  categories: string[];
}

const ProductPost = () => {
  const params = useParams();
  const currentShop = useGetShopDetailByOwnerId();
  const getCurrentShop = currentShop.data?.getShopByOwnerId as IObj;
  const currentPost = usePostDetail();
  const getCurrentPostData = currentPost.data?.getOnePost as IObj;
  const createPost = useCreateAPost();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PostFormData>({
    defaultValues: {
      title: getCurrentPostData?.title || "",
      description: getCurrentPostData?.description || "",
      content: getCurrentPostData?.content || "",
      status: getCurrentPostData?.status || "active",
      categories:
        getCurrentPostData?.categories?.map((cat: IObj) => cat._id) || [],
    },
  });

  const onSubmit = async (data: PostFormData) => {
    if (!getCurrentPostData) {
      console.log("Post Data:", data);
      createPost.query(
        {
          query: queryCreateAPost,
          variables: {
            input: {
              ...data,
              product: params.slug,
            },
          },
        },
        (dataSuccess, error) => {
          if (dataSuccess) {
            toast.success("Lưu bài viết thành công!");
          }
          if (error) {
            toast.error(`Thất bại! ${error.message ?? "Unknown error"}`);
          }
        }
      );
    }
    // Add your submit logic here
  };

  useEffect(() => {
    if (
      !currentPost.data?.getOnePost ||
      currentPost.data?.getOnePost?.product?._id !== params.slug
    ) {
      currentPost.query({
        query: queryGetOnePost(),
        variables: {
          input: {
            value: params.slug,
          },
        },
      });
    }
    return () => {
      createPost.clear?.();
    };
  }, []);

  useEffect(() => {
    if (getCurrentPostData) {
      reset({
        title: getCurrentPostData.title,
        description: getCurrentPostData.description,
        content: getCurrentPostData.content,
        status: getCurrentPostData.status,
        categories: getCurrentPostData.categories?.map((cat: IObj) => cat._id),
      });
    }
  }, [getCurrentPostData]);
  useEffect(() => {
    if (createPost.isFetched && createPost.isSuccess) {
      createPost.clear?.();
    }
  }, [createPost.data]);

  return (
    <div className="max-w-5xl mx-auto p-4 relative">
      {currentPost.isPending && <Loading className="absolute" />}
      <div className="flex justify-between items-center mb-6 sticky top-0 z-50 bg-white py-2">
        <Title level={4} className="!mb-0">
          Bài viết sản phẩm
        </Title>
        <Space>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={handleSubmit(onSubmit)}
            disabled={
              currentPost.isPending || isSubmitting || createPost.isPending
            }
            loading={isSubmitting || createPost.isPending}
          >
            Lưu bài viết
          </Button>
        </Space>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card className="shadow-sm !mb-4">
          <Controller
            name="title"
            control={control}
            rules={{ required: "Vui lòng nhập tiêu đề" }}
            render={({ field }) => (
              <Form.Item
                layout="vertical"
                label="Tiêu đề bài viết"
                validateStatus={errors.title ? "error" : ""}
                help={errors.title?.message}
                required
              >
                <Input {...field} placeholder="Nhập tiêu đề bài viết" />
              </Form.Item>
            )}
          />

          <Controller
            name="description"
            control={control}
            rules={{ required: "Vui lòng nhập tóm tắt bài viết" }}
            render={({ field }) => (
              <Form.Item
                layout="vertical"
                label="Tóm tắt bài viết"
                validateStatus={errors.description ? "error" : ""}
                help={errors.description?.message}
                required
              >
                <Input.TextArea
                  {...field}
                  placeholder="Nhập tóm tắt bài viết"
                  rows={3}
                />
              </Form.Item>
            )}
          />

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Form.Item label="Trạng thái bài viết" layout="vertical">
                <SelectStatus
                  {...field}
                  mode={undefined}
                  isNormalContentStatus
                />
              </Form.Item>
            )}
          />

          <Controller
            name="categories"
            control={control}
            render={({ field }) => (
              <Form.Item label="Danh mục" layout="vertical">
                <SelectCategories shopId={getCurrentShop?._id} {...field} />
              </Form.Item>
            )}
          />
        </Card>

        <Card className="shadow-sm">
          <Controller
            name="content"
            control={control}
            rules={{ required: "Vui lòng nhập nội dung" }}
            render={({ field }) => (
              <Form.Item
                label="Nội dung"
                validateStatus={errors.content ? "error" : ""}
                help={errors.content?.message}
                required
                layout="vertical"
              >
                <ReactQuill
                  theme="snow"
                  modules={modules}
                  formats={formats}
                  {...field}
                />
              </Form.Item>
            )}
          />
        </Card>
      </form>
    </div>
  );
};

export default ProductPost;
