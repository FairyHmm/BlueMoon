export const ROLES = {
  ADMIN: "admin",
  MANAGER: "manager",
  USER: "user",
};

export const USER_ROLES = {
  ADMIN: {
    value: ROLES.ADMIN,
    label: "Quản trị",
    color: "red",
  },

  MANAGER: {
    value: ROLES.MANAGER,
    label: "Quản lý",
    color: "teal",
  },

  USER: {
    value: ROLES.USER,
    label: "Cư dân",
    color: "blue",
  },
};

export const FILTER_OPTIONS = [
  {
    label: "Tất cả tài khoản",
    value: "all",
  },
  {
    label: "Nhân viên",
    value: "staff",
  },
  {
    label: "Cư dân",
    value: ROLES.USER,
  },
];

export function getRoleConfig(role) {
  return (
    USER_ROLES[role?.toUpperCase()] ?? {
      label: role,
      color: "gray",
    }
  );
}
