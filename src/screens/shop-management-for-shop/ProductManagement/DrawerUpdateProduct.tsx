import React, { useEffect, useState } from "react";
import { Button, Drawer } from "antd";
import { EditOutlined } from "@ant-design/icons";
import FormSaveAProduct from "./CreateANewProduct/FormSaveAProduct";
import { useGetProductDetailBySlug, useUpdateProduct } from "@/src/utils/hooks";
import { IObj } from "@/src/types";

const DrawerUpdateProduct = () => {
  const [open, setOpen] = useState(false);
  const productDetail = useGetProductDetailBySlug();
  const getProductDetail = productDetail.data?.getProductBySlug as IObj;
  const updateProduct = useUpdateProduct();
  const currentProduct = useGetProductDetailBySlug();
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (updateProduct.isSuccess) {
      currentProduct.refresh?.();
      setOpen(false);
    }
  }, [updateProduct.isSuccess]);
  return (
    <>
      <Button
        icon={<EditOutlined />}
        type="primary"
        onClick={() => showDrawer()}
      >
        Chỉnh sửa
      </Button>
      <Drawer
        title="Cập nhật thông tin sản phẩm"
        onClose={onClose}
        open={open}
        destroyOnClose
        size="large"
      >
        <FormSaveAProduct
          hiddenTitle
          isEdit
          defaultProduct={getProductDetail}
        />
      </Drawer>
    </>
  );
};

export default DrawerUpdateProduct;
