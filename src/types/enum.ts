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
