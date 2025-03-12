import React, { useState, useRef, useEffect } from "react";
import { Button, Skeleton } from "antd";
import Search from "antd/es/input/Search";
import { SearchOutlined, ShopOutlined } from "@ant-design/icons";

const QuickSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

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
          <div className="p-1 transition-colors mb-4">
            <p className="flex items-center gap-2 text-gray-700">
              <ShopOutlined className="text-indigo-600 text-[1.2rem]" />
              <span>Tìm kiếm sản phẩm cùng Shopping Mall</span>
            </p>
          </div>
          <div className="">
            {/* <Skeleton active /> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickSearch;
