export const RESIDENT_STATUS = {
  ACTIVE: {
    value: "active",
    label: "Active",
    color: "green",
  },
  PENDING: {
    value: "pending",
    label: "Pending",
    color: "orange",
  },
  INACTIVE: {
    value: "inactive",
    label: "Inactive",
    color: "red",
  },
};

export const getStatusConfig = (statusValue) =>
  Object.values(RESIDENT_STATUS).find((s) => s.value === statusValue) ||
  RESIDENT_STATUS.PENDING;
