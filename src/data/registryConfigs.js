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
