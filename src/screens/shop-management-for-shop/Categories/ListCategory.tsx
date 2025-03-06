"use client";
import React, { memo, useEffect, useMemo, useState } from "react";
import {
  Table,
  Input,
  Button,
  Space,
  Typography,
  Tag,
  Tooltip,
  Modal,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  ReloadOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useDebounce } from "use-debounce";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetCategories, useGetShopDetailByOwnerId } from "@/src/utils/hooks";
import { IObj, IQueryPaginate } from "@/src/types";
import { queryGetCategories } from "@/src/utils/graphql-queries";
import EmptyData from "@/src/components/EmptyData";
import FormCategory from "./FormCategory";
import { ColumnType } from "antd/es/table";

const { Title } = Typography;

const mapQuery = (
  shopId: string,
  keyword = "",
  paginate: IQueryPaginate = {
    limit: 10,
    page: 1,
  }
) => {
  return {
    query: queryGetCategories(),
    variables: {
      input: {
        filter: {
          shop: [shopId],
          keyword: keyword,
        },
        paginate: {
          limit: Number(paginate.limit),
          page: Number(paginate.page),
        },
      },
    },
  };
};
interface TableCategoriesProps {
  handleOpenModalFormCategory: (
    open: boolean,
    type: "create" | "edit",
    _idUpdate?: string
  ) => void;
}
const TableCategories = (props: TableCategoriesProps) => {
  const categories = useGetCategories();
  const searchParams = useSearchParams();
  const page =
    searchParams.get("page") ??
    categories.payloadQuery?.variables?.input?.paginate?.page ??
    1;
  const limit =
    searchParams.get("limit") ??
    categories.payloadQuery?.variables?.input?.paginate?.limit ??
    10;
  const router = useRouter();
  const getCategories = categories.data?.getCategories?.data as IObj[];
  const columns = useMemo((): ColumnType[] => {
    return [
      {
        title: "Danh mục",
        dataIndex: "name",
        key: "name",
        render(value, record) {
          return (
            <p className="flex gap-2 items-center">
              <img className="w-12 h-12" alt="Rỗng" src={record.imageUrl} />
              <span>{value}</span>
            </p>
          );
        },
        width: 250,
      },
      // {
      //   title: "Slug",
      //   dataIndex: "slug",
      //   key: "slug",
      // },
      {
        title: "Mô tả",
        dataIndex: "description",
        key: "description",
        ellipsis: true,
        width: 300,
        render(value) {
          return <Tooltip title={value}>{value}</Tooltip>;
        },
      },
      {
        title: "Số sản phẩm",
        dataIndex: "productsCount",
        key: "productsCount",
        render: (count: number) => <Tag color="blue">{count} sản phẩm</Tag>,
        width: 100,
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        render: (status: string) => (
          <Tag color={status === "active" ? "success" : "error"}>
            {status === "active" ? "Hoạt động" : "Không hoạt động"}
          </Tag>
        ),
        width: 100,
      },
      {
        title: "Ngày tạo",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (date: string) => new Date(date).toLocaleDateString("vi-VN"),
        width: 100,
      },
      {
        title: "Thao tác",
        key: "actions",
        render: (_: any, record: any) => (
          <Space>
            <Tooltip title="Chỉnh sửa">
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => console.log("Edit:", record)}
              />
            </Tooltip>
            <Tooltip title="Xóa">
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => console.log("Delete:", record)}
              />
            </Tooltip>
          </Space>
        ),
        width: 150,
      },
    ];
  }, []);
  return (
    <Table
      locale={{
        emptyText() {
          return (
            <EmptyData
              renderAction={
                <Button
                  type="primary"
                  onClick={() =>
                    props.handleOpenModalFormCategory(true, "create")
                  }
                >
                  <PlusOutlined /> Tạo mới
                </Button>
              }
            />
          );
        },
      }}
      columns={columns}
      dataSource={getCategories}
      rowKey="id"
      loading={categories.isPending}
      pagination={{
        total: (categories.data?.getCategories?.paginate?.total as number) ?? 0,
        showSizeChanger: true,
        showTotal: (total) => `Tổng ${total} danh mục`,
        current: Number(page) ?? 1,
        pageSize: Number(limit) ?? 10,
        onChange(page, pageSize) {
          router.push(`?page=${page}&limit=${pageSize}`);
        },
      }}
      scroll={{ x: true }}
    />
  );
};
const MemoTableCategories = memo(TableCategories, () => {
  return true;
});
const ListCategory = () => {
  const [searchText, setSearchText] = useState("");
  const [keyword] = useDebounce(searchText, 1000);
  const categories = useGetCategories();
  const currentShop = useGetShopDetailByOwnerId();
  const getCurrentShop = currentShop.data?.getShopByOwnerId as IObj;
  const searchParams = useSearchParams();
  const page =
    searchParams.get("page") ??
    categories.payloadQuery?.variables?.input?.paginate?.page ??
    1;
  const limit =
    searchParams.get("limit") ??
    categories.payloadQuery?.variables?.input?.paginate?.limit ??
    10;
  const queryParams = useMemo(() => {
    return {
      page: Number(page),
      limit: Number(limit),
    } as IQueryPaginate;
  }, [page, limit]);
  const [openForm, setOpenForm] = useState<{
    open: boolean;
    type: "edit" | "create";
    _idUpdate?: string;
  }>({
    open: false,
    type: "create",
    _idUpdate: "",
  });

  const handleRefresh = () => {
    categories.query(
      mapQuery(getCurrentShop?._id as string, keyword, queryParams)
    );
  };

  const handleOpenModalFormCategory = (
    open: boolean,
    type: "edit" | "create",
    _idUpdate?: string
  ) => {
    setOpenForm({
      open: open,
      type: type,
      _idUpdate: _idUpdate,
    });
  };
  useEffect(() => {
    if (getCurrentShop && !categories.isPending) {
      categories.query(
        mapQuery(getCurrentShop?._id as string, keyword, queryParams)
      );
    }
  }, [getCurrentShop, keyword, queryParams]);
  return (
    <div className="space-y-4">
      <div className="mb-6 flex flex-wrap gap-4 justify-between items-center">
        <Title level={3} className="!mb-0">
          Danh sách danh mục (
          {categories.data?.getCategories?.paginate?.total ?? 0})
        </Title>
        <Space>
          <Button icon={<ReloadOutlined />} onClick={handleRefresh}>
            Làm mới
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => handleOpenModalFormCategory(true, "create")}
          >
            Thêm danh mục
          </Button>
        </Space>
      </div>

      <Space className="w-full mb-4">
        <Input
          placeholder="Tìm kiếm danh mục..."
          prefix={<SearchOutlined />}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          className="max-w-md"
          allowClear
        />
      </Space>
      <MemoTableCategories
        handleOpenModalFormCategory={handleOpenModalFormCategory}
      />
      <Modal
        open={openForm.open}
        footer={<></>}
        onCancel={() => handleOpenModalFormCategory(false, "create", "")}
        destroyOnClose
      >
        <FormCategory
          handleRefresh={() => handleRefresh()}
          onCancel={() => {
            handleOpenModalFormCategory(false, "create", "");
          }}
        />
      </Modal>
    </div>
  );
};

export default ListCategory;
