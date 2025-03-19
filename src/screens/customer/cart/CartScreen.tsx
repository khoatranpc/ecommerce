"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Card,
  Checkbox,
  Button,
  Image,
  Typography,
  InputNumber,
  Space,
  Divider,
  Tag,
  Select,
  Popconfirm,
} from "antd";
import { useRouter } from "next/navigation";
import {
  DeleteOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { IObj } from "@/src/types";
import { useCurrentUser, useGetCarts } from "@/src/utils/hooks";
import { queryGetCarts } from "@/src/utils/graphql-queries";
import { keyLocalStorage, setLocalStorage } from "@/src/utils";

const { Text, Title } = Typography;

const getCurrentVariant = (
  variantId?: string,
  product?: IObj
): IObj | undefined => {
  const currentVariant = (product?.variants as IObj[])?.find((variant) => {
    return variant._id === variantId;
  });
  return currentVariant;
};

const CartItem = React.memo(
  ({
    item,
    index,
    variant,
    productVariants,
    product,
    onUpdateVariant,
    onUpdateQuantity,
    onDelete,
    onSelectItem,
    selected,
  }: {
    item?: IObj;
    index: number;
    variant?: IObj;
    productVariants?: IObj[];
    product?: IObj;
    onUpdateVariant: (itemId: string, variantId: string) => void;
    onUpdateQuantity: (itemId: string, quantity: number) => void;
    onDelete: (itemId: string) => void;
    onSelectItem: (itemId: string, checked: boolean) => void;
    selected: boolean;
  }) => {
    const getOptionsForChangeVariants = productVariants?.map((item) => {
      return {
        value: item._id,
        label: item.name,
      };
    });
    return (
      <div
        className={`p-6 hover:bg-gray-50 transition-colors ${
          index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
        }`}
      >
        <div className="flex gap-6">
          <Checkbox
            checked={selected}
            onChange={(e) =>
              onSelectItem(item?._id as string, e.target.checked)
            }
          />
          <div className="relative group">
            <Image
              src={
                (item?.product?.images as string[])?.[
                  variant?.imageIndex as number
                ]
              }
              alt={variant?.name as string}
              width={100}
              height={100}
              className="object-cover rounded-lg border border-gray-200 group-hover:border-blue-300 transition-colors"
              fallback="/static/fallback-img.png"
            />
            {item?.selected && (
              <div className="absolute top-2 right-2">
                <Tag color="blue" className="border-0">
                  Đã chọn
                </Tag>
              </div>
            )}
          </div>
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex-1">
              <div className="flex justify-between gap-4">
                <Text
                  strong
                  className="text-lg hover:text-blue-500 block mb-2 truncate"
                >
                  {variant?.name}
                </Text>
                {variant && (
                  <Select
                    placeholder="Phân loại"
                    defaultValue={variant?._id}
                    popupClassName="!w-fit"
                    className="!w-fit"
                    options={getOptionsForChangeVariants}
                    onChange={(value) =>
                      onUpdateVariant(item?._id as string, value)
                    }
                    optionRender={(option) => {
                      const findVariant = getCurrentVariant(
                        option.value as string,
                        product
                      );
                      return (
                        <div className="flex gap-2 items-center">
                          <Image
                            preview={false}
                            src={
                              (product?.images as unknown as string[])[
                                findVariant?.imageIndex as number
                              ]
                            }
                            className="!w-6"
                            alt=""
                          />
                          {option.label}
                        </div>
                      );
                    }}
                  />
                )}
              </div>
              <Space className="flex flex-wrap gap-2">
                {variant &&
                  (variant?.attributes as IObj[])?.map((attr, i) => (
                    <Tag
                      key={i}
                      className="m-0 bg-gray-100 border-0 rounded-full text-gray-600"
                    >
                      {attr.key}: {attr.value}
                    </Tag>
                  ))}
              </Space>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <Text type="danger" strong className="text-xl">
                {(item?.price * item?.quantity).toLocaleString()}₫
              </Text>
              <Space size="large" className="items-center">
                <div className="flex items-center gap-2">
                  <Text type="secondary">Số lượng:</Text>
                  <InputNumber
                    min={1}
                    max={99}
                    defaultValue={item?.quantity}
                    onChange={(value) =>
                      onUpdateQuantity(item?._id as string, value || 1)
                    }
                    controls
                    className="w-20"
                  />
                </div>
                <Popconfirm
                  title="Xóa sản phẩm"
                  description="Bạn có chắc chắn muốn xóa sản phẩm này?"
                  okText="Xóa"
                  cancelText="Hủy"
                  okButtonProps={{ danger: true }}
                  onConfirm={() => onDelete(item?._id as string)}
                >
                  <Button
                    danger
                    type="text"
                    icon={<DeleteOutlined />}
                    className="hover:bg-red-50 flex items-center gap-1"
                  >
                    Xóa
                  </Button>
                </Popconfirm>
              </Space>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
CartItem.displayName = "CartItem";
const CartScreen = () => {
  const carts = useGetCarts();
  const [cartsState, setCartsState] = useState<IObj[]>([]);
  const user = useCurrentUser();
  const router = useRouter();
  const handleSelectShop = useCallback((shopId: string, checked: boolean) => {
    setCartsState((prev) =>
      prev.map((cart) =>
        cart.shop._id === shopId
          ? {
              ...cart,
              selected: checked,
              items: (cart.items as IObj[]).map((item) => ({
                ...item,
                selected: checked,
              })),
            }
          : cart
      )
    );
  }, []);
  const handleSelectItem = useCallback((itemId: string, checked: boolean) => {
    setCartsState((prev) =>
      prev.map((cart) => {
        const updatedItems = (cart.items as IObj[]).map((item) =>
          item._id === itemId ? { ...item, selected: checked } : item
        );
        return {
          ...cart,
          selected: updatedItems.every((item) => item.selected),
          items: updatedItems,
        };
      })
    );
  }, []);
  const calculateTotal: number = useMemo(() => {
    return cartsState.reduce((total, cart) => {
      return (
        total +
        (cart.items as IObj[]).reduce((shopTotal, item) => {
          return shopTotal + (item.selected ? item.price * item.quantity : 0);
        }, 0)
      );
    }, 0);
  }, [cartsState]);
  const selectedItemsCount = useMemo(() => {
    return cartsState.reduce((count, cart) => {
      return (
        count + (cart.items as IObj[]).filter((item) => item.selected).length
      );
    }, 0);
  }, [cartsState]);
  const handleUpdateVariant = useCallback(
    (itemId: string, newVariantId: string) => {
      setCartsState((prev) =>
        prev.map((cart) => ({
          ...cart,
          items: (cart.items as IObj[]).map((item) =>
            item._id === itemId ? { ...item, variant: newVariantId } : item
          ),
        }))
      );
    },
    []
  );

  const handleUpdateQuantity = useCallback(
    (itemId: string, newQuantity: number) => {
      setCartsState((prev) =>
        prev.map((cart) => ({
          ...cart,
          items: (cart.items as IObj[]).map((item) =>
            item._id === itemId ? { ...item, quantity: newQuantity } : item
          ),
        }))
      );
    },
    []
  );
  const handleDelete = useCallback((itemId: string) => {
    setCartsState((prev) =>
      prev
        .map((cart) => ({
          ...cart,
          items: (cart.items as IObj[]).filter((item) => item._id !== itemId),
        }))
        .filter((cart) => (cart.items as IObj[]).length > 0)
    );
  }, []);
  const handleCheckout = () => {
    const selectedItems = cartsState.reduce((items: IObj[], cart) => {
      const cartItems = (cart.items as IObj[])
        .filter((item) => item.selected)
        .map((item) => {
          return {
            cartId: cart.id,
            itemId: item._id,
            productId: item.product?._id,
            shopId: cart.shop?._id,
            shopName: cart.shop?.name,
            variant: getCurrentVariant(
              item.variant as string,
              item.product as IObj
            )?._id,
            quantity: item.quantity,
            price: item.price,
            totalPrice: item.price * item.quantity,
          };
        });
      return [...items, ...cartItems];
    }, [] as any[]);
  };
  useEffect(() => {
    if (user.isSuccess) {
      carts.query(
        {
          query: queryGetCarts,
        },
        (data) => {
          if (data) {
            setCartsState(data.getCarts as IObj[]);
          }
        }
      );
    }
  }, [user.data]);
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <Title level={3}>Giỏ hàng của bạn</Title>
        <Text type="secondary">{selectedItemsCount} sản phẩm đã chọn</Text>
      </div>

      {!cartsState.length ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <ShoppingCartOutlined className="text-6xl text-gray-300 mb-4" />
          <Title level={4} className="!mb-2">
            Giỏ hàng trống
          </Title>
          <Text type="secondary" className="block mb-6">
            Bạn chưa có sản phẩm nào trong giỏ hàng
          </Text>
          <Button
            type="primary"
            size="large"
            onClick={() => {
              router.push("/shopping");
            }}
          >
            Tiếp tục mua sắm
          </Button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {cartsState.map((cartItem) => (
              <div
                key={cartItem?.shop?._id}
                className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 border-b border-blue-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={cartItem.selected}
                        onChange={(e) =>
                          handleSelectShop(cartItem.shop._id, e.target.checked)
                        }
                      />
                      <div className="flex items-center gap-2">
                        <ShopOutlined className="text-blue-500 text-lg" />
                        <Text strong className="text-lg">
                          {cartItem?.shop?.name}
                        </Text>
                      </div>
                    </div>
                    <Tag color="blue" className="border-0 rounded-full px-4">
                      Cửa hàng chính thức
                    </Tag>
                  </div>
                </div>
                <div className="divide-y divide-gray-100">
                  {(cartItem?.items as IObj[])?.map((item, index) => {
                    const getVariant = getCurrentVariant(
                      item.variant as string,
                      item.product as IObj
                    );

                    return (
                      <CartItem
                        key={item._id}
                        item={item}
                        index={index}
                        variant={getVariant}
                        productVariants={item.product?.variants as IObj[]}
                        product={item.product}
                        onUpdateVariant={handleUpdateVariant}
                        onUpdateQuantity={handleUpdateQuantity}
                        onDelete={handleDelete}
                        onSelectItem={handleSelectItem}
                        selected={item.selected}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="w-full lg:w-[400px]">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <Title level={4} className="mb-6">
                Chi tiết thanh toán
              </Title>

              <div className="space-y-4">
                <div className="flex justify-between py-2">
                  <Text>Tạm tính</Text>
                  <Text strong>{calculateTotal.toLocaleString()}₫</Text>
                </div>
                <div className="flex justify-between py-2">
                  <Text>Giảm giá</Text>
                  <Text className="text-red-500">-0₫</Text>
                </div>

                <Divider />

                <div className="flex justify-between items-baseline">
                  <Text strong>Tổng tiền</Text>
                  <div className="text-right">
                    <Text strong className="text-2xl text-red-500 block">
                      {calculateTotal.toLocaleString()}₫
                    </Text>
                    <Text type="secondary" className="text-sm">
                      (Đã bao gồm VAT)
                    </Text>
                  </div>
                </div>
              </div>

              <Button
                type="primary"
                size="large"
                block
                className="mt-6 h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                disabled={selectedItemsCount === 0}
                onClick={handleCheckout}
              >
                Thanh toán ({selectedItemsCount})
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
