export enum Role {
  admin = "admin",
  shop = "shop",
  customer = "customer",
}
export enum Status {
  active = "active",
  inactive = "inactive",
  pending = "pending",
  deleted = "deleted",
}

export const mapStatusToString: Record<Status, string> = {
  active: "Hoạt động",
  deleted: "Đã xoá",
  inactive: "Ngừng hoạt động",
  pending: "Đợi duyệt",
};

export const mapStatusToStatusProductString: Record<Status, string> = {
  active: "Đang bán",
  deleted: "Đã xoá",
  inactive: "Ngừng bán",
  pending: "Đợi mở",
};


export const mapStatusProductToColor: Record<Status, string> = {
  active: "!bg-green-50 !text-green-600",
  deleted: "!bg-red-50 !text-red-600",
  inactive: "!bg-gray-50 !text-gray-600",
  pending: "!bg-yellow-50 !text-yellow-600",
};