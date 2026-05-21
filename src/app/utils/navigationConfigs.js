import {
  IconHome,
  IconUsers,
  IconReceipt,
  IconShieldLock,
  IconSettings,
} from "@tabler/icons-react";
import Dashboard from "../../pages/Dashboard";
import Residents from "../../pages/Residents";
import Finance from "../../pages/Finance";
import Settings from "../../pages/Settings";
// import AdminTools from "../../pages/AdminTools";

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
  {
    path: "/settings",
    icon: IconSettings,
    allowedRoles: ["admin", "manager", "user"],
    component: Settings,
  },
  // {
  //   path: "/admin-tools",
  //   icon: IconShieldLock,
  //   allowedRoles: ["admin"],
  //   component: AdminTools,
  // },
];
