import {
  IconHome,
  IconReceipt,
  IconUsers,
} from "@tabler/icons-react";

import Dashboard from "../../pages/Dashboard";
import Finance from "../../pages/Finance";
import Residents from "../../pages/Residents";

export const NAV_ITEMS = [
  {
    path: "/dashboard",
    icon: IconHome,
    allowedRoles: ["admin", "manager", "user"],
    component: Dashboard,
  },
  {
    path: "/residents",
    icon: IconUsers,
    allowedRoles: ["manager"],
    component: Residents,
  },
  {
    path: "/finance",
    icon: IconReceipt,
    allowedRoles: ["manager"],
    component: Finance,
  },
];

export function getAllowedNavItems(role) {
  if (!role) return [];

  return NAV_ITEMS.filter((item) =>
    item.allowedRoles.includes(role),
  );
}
