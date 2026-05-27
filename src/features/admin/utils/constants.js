export const ROLES = {
  ADMIN: "admin",
  MANAGER: "manager",
  USER: "user",
};

export const USER_ROLES = {
  ADMIN: {
    value: ROLES.ADMIN,
    label: "Admin",
    color: "red",
  },

  MANAGER: {
    value: ROLES.MANAGER,
    label: "Manager",
    color: "teal",
  },

  USER: {
    value: ROLES.USER,
    label: "Resident",
    color: "blue",
  },
};

export const FILTER_OPTIONS = [
  {
    label: "All Accounts",
    value: "all",
  },
  {
    label: "Staff",
    value: "staff",
  },
  {
    label: "Residents",
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
