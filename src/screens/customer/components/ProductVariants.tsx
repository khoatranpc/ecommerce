import React from "react";
import { Button, Space, Typography, Image } from "antd";
import { IObj } from "@/src/types";

const { Text } = Typography;

interface ProductVariantsProps {
  mapKeyOptions: IObj;
  variantsHasKey: IObj[];
  keysSelected: IObj[];
  setKeysSelected: (fn: (prev: IObj[]) => IObj[]) => void;
  getVariants: IObj[];
  selectedVariantId: string;
  setSelectedVariantId: (fn: (prev: string) => string) => void;
  productImages: string[];
}

const ProductVariants = ({
  mapKeyOptions,
  variantsHasKey,
  keysSelected,
  setKeysSelected,
  getVariants,
  selectedVariantId,
  setSelectedVariantId,
  productImages,
}: ProductVariantsProps) => {
  if (Object.keys(mapKeyOptions).length > 0) {
    return (
      <div className="space-y-6">
        {Object.keys(mapKeyOptions).map((key: keyof typeof mapKeyOptions) => {
          const uniqueValues: string[] = Array.from(
            new Set(mapKeyOptions[key].map((opt: IObj) => opt.attribute))
          );
          return (
            <div key={key} className="grid grid-cols-5">
              <Text
                strong
                className="min-w-[100px] capitalize !text-[0.8rem] col-span-1"
              >
                {key}:
              </Text>
              <div className="col-span-4">
                <Space size={[8, 16]} wrap>
                  {uniqueValues.map((val: string, idx: number) => {
                    const checkCurrentAttri = variantsHasKey.filter((variant) =>
                      (variant.attributes as IObj[]).find(
                        (attri) =>
                          String(attri.key).toLowerCase().trim() === key &&
                          String(attri.value).toLowerCase().trim() === val
                      )
                    );
                    const isSelected = keysSelected.find(
                      (item) => item.key === key && item.value === val
                    );
                    return (
                      <Button
                        key={idx}
                        size="large"
                        type={isSelected ? "primary" : "default"}
                        className="min-w-[80px] capitalize hover:!text-[var(--primary)] hover:!border-[var(--primary)]"
                        disabled={
                          isSelected
                            ? false
                            : !!keysSelected.length && !checkCurrentAttri.length
                        }
                        onClick={() => {
                          setKeysSelected((prev) => {
                            const existIndexKey = prev.findIndex(
                              (attribute) =>
                                attribute.key === key && attribute.value === val
                            );
                            if (existIndexKey > -1)
                              prev.splice(existIndexKey, 1);
                            else prev.push({ key, value: val });
                            return [...prev];
                          });
                        }}
                      >
                        {val}
                      </Button>
                    );
                  })}
                </Space>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-5">
      <Text
        strong
        className="min-w-[100px] capitalize !text-[0.8rem] col-span-1"
      >
        Loại:
      </Text>
      <div className="col-span-4 flex flex-wrap gap-4">
        {getVariants.map((variant) => (
          <Button
            key={variant._id}
            size="large"
            disabled={!!selectedVariantId && selectedVariantId !== variant._id}
            type={selectedVariantId === variant._id ? "primary" : "default"}
            className="min-w-[80px] capitalize hover:!text-[var(--primary)] hover:!border-[var(--primary)]"
            onClick={() => {
              setSelectedVariantId((prev) =>
                prev === variant._id ? "" : variant._id
              );
            }}
          >
            <Image
              src={productImages?.[variant.imageIndex as number]}
              fallback="/static/fallback-image.png"
              className="!w-4"
            />
            <span>{variant.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ProductVariants;
