import React from "react";
import { Dropdown, Avatar, Space, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useCurrentUser } from "../utils/hooks";
import { IObj } from "../types";

const { Text } = Typography;

interface UserComponentProps {
  menuItems: MenuProps["items"];
  className?: string;
}

const UserComponent: React.FC<UserComponentProps> = ({
  menuItems,
  className = "",
}) => {
  const currentUser = useCurrentUser();
  const getCurrentUser = (currentUser.data?.getCurrentUser as IObj) ?? {};
  return (
    <Dropdown menu={{ items: menuItems }} trigger={["click"]} className="w-fit cursor-pointer mr-4">
      <div className="flex items-center">
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-medium"> {getCurrentUser?.name}</div>
            <div className="text-xs text-gray-500">
              {" "}
              {getCurrentUser?.email}
            </div>
          </div>
          <Avatar
            size="large"
            icon={<UserOutlined />}
            className="bg-[var(--primary)] flex items-center justify-center"
          />
        </div>
      </div>
    </Dropdown>
  );
};

export default UserComponent;
