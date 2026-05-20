import {
  IconHome,
  IconUsers,
  IconReceipt,
  IconSettings,
} from "@tabler/icons-react";
import Dashboard from "../../pages/Dashboard";
import Residents from "../../pages/Residents";
import Finance from "../../pages/Finance";
import Settings from "../../pages/Settings";

export const NAV_ITEMS = [
  {
    value: "dashboard",
    path: "/dashboard",
    icon: IconHome,
    allowedRoles: ["admin", "staff", "resident"],
    component: Dashboard,
  },
  {
    value: "residents",
    path: "/residents",
    icon: IconUsers,
    allowedRoles: ["admin"],
    component: Residents,
  },
  {
    value: "finance",
    path: "/finance",
    icon: IconReceipt,
    allowedRoles: ["admin", "staff"],
    component: Finance,
  },
  {
    value: "settings",
    path: "/settings",
    icon: IconSettings,
    allowedRoles: ["admin", "staff", "resident"],
    component: Settings,
  },
];
