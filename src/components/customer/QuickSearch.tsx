"use client";
import { useDebounce } from "use-debounce";
import React, { useState, useRef, useEffect } from "react";
import { Button, Image, Skeleton } from "antd";
import Search from "antd/es/input/Search";
import { SearchOutlined, ShopOutlined } from "@ant-design/icons";
import { useGetProductDetailBySlug, useQuickSearchProducts } from "@/src/utils/hooks";
import {
  queryGetProductBySlug,
  queryProducts,
} from "@/src/utils/graphql-queries";
import { IObj } from "@/src/types";
import EmptyData from "../EmptyData";
import { useRouter } from "next/navigation";

const QuickSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 500);
  const currentProduct = useGetProductDetailBySlug();
  const quickSearch = useQuickSearchProducts();
  const router = useRouter();
  const getProducts = quickSearch.data?.getProducts?.data as IObj[];
  const handleSearch = (value: string) => {
    quickSearch.query({
      query: queryProducts,
      variables: {
        input: {
          filter: {
            keywords: value,
          },
        },
      },
    });
  };
  useEffect(() => {
    if (value && isOpen) {
      handleSearch(value);
    }
  }, [value, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div
      className="relative flex-1 max-w-3xl flex items-center"
      ref={searchRef}
    >
      <Search
        placeholder="Tìm kiếm sản phẩm..."
        size="large"
        onFocus={() => setIsOpen(true)}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        enterButton={
          <Button
            type="primary"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 border-none hover:opacity-90"
          >
            <SearchOutlined />
          </Button>
        }
      />
      {isOpen && (
        <div className="absolute top-[100%] p-4 w-full bg-white shadow-xl rounded-lg border border-gray-100 overflow-hidden [&_*]:leading-none">
          {!quickSearch.isFetched && !getProducts ? (
            <div className="p-1 transition-colors mb-4">
              <p className="flex items-center gap-2 text-gray-700">
                <ShopOutlined className="text-indigo-600 text-[1.2rem]" />
                <span>Tìm kiếm sản phẩm cùng Shopping Mall</span>
              </p>
            </div>
          ) : (
            <div className="">
              {quickSearch.isPending ? (
                <Skeleton active />
              ) : quickSearch.isFetched && !getProducts?.length ? (
                <EmptyData description="Không có dữ liệu phù hợp" />
              ) : (
                <div className="flex flex-col gap-2">
                  <Button variant="solid" type="dashed">
                    Xem tất cả
                  </Button>
                  {getProducts?.map((product, idx) => {
                    return (
                      <div
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-50"
                        key={product?._id ?? idx}
                        onClick={() => {
                          router.push(`/${product.slug}`);
                          currentProduct.query({
                            query: queryGetProductBySlug,
                            variables: {
                              input: {
                                slug: product.slug,
                              },
                            },
                          });
                        }}
                      >
                        <Image
                          className="rounded-sm"
                          width={50}
                          height={50}
                          src={product.images[0]}
                          fallback="/static/fallback-img.png"
                        />
                        <strong>{product.name}</strong>
                        <sup>
                          <span>{product.shop.name}</span>
                        </sup>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuickSearch;
