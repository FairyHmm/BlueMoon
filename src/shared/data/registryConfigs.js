import {
  IconSmartHome,
  IconHome,
  IconBuildingCommunity,
} from "@tabler/icons-react";

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

export const UNIT_TYPES = {
  STUDIO: {
    value: "studio",
    label: "Studio",
    color: "orange",
    icon: IconSmartHome,
  },
  STANDARD: {
    value: "standard",
    label: "Standard",
    color: "indigo",
    icon: IconHome,
  },
  DUPLEX: {
    value: "Duplex",
    label: "Duplex",
    color: "teal",
    icon: IconBuildingCommunity,
  },
};

export const getUnitConfig = (val) =>
  Object.values(UNIT_TYPES).find((u) => u.value === val) || UNIT_TYPES.STANDARD;

export const BILL_STATUS = {
  PAID: { value: "paid", label: "Paid", color: "teal" },
  DUE: { value: "due", label: "Due", color: "blue" },
  OVERDUE: { value: "overdue", label: "Overdue", color: "red" },
  WAIT: { value: "wait", label: "Wait", color: "gray" },
};

export const getBillStatusConfig = (status) =>
  Object.values(BILL_STATUS).find((s) => s.value === status) || BILL_STATUS.DUE;

export const filterBills = (bills, activeFilter) => {
  const now = new Date();
  return bills.filter((b) => {
    const isFuture = new Date(b.due_date) > now;

    switch (activeFilter) {
      case "paid":
        return b.status === "paid";
      case "due":
        return b.status === "due" || b.status === "overdue";
      case "all":
        return (
          b.status === "paid" || b.status === "due" || b.status === "overdue"
        );
      case "wait":
        return b.status === "wait" || isFuture;
      default:
        return true;
    }
  });
};
