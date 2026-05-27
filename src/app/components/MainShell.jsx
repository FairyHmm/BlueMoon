import { AppShell } from "@mantine/core";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import Navigation from "./Navigation";
import { useAuthStore } from "../../shared/store/useAuthStore";
import { getAllowedNavItems } from "../utils/navigationConfigs";

import classes from "../styles/main-shell.module.css";

export default function MainShell() {
  const { user } = useAuthStore();

  const navigate = useNavigate();
  const location = useLocation();

  const navItems = getAllowedNavItems(user?.role);

  const showNavigation = navItems.length > 1;

  const activeTab =
    location.pathname === "/" ? "/dashboard" : location.pathname;

  return (
    <AppShell
      header={{ height: "var(--bm-header-height)" }}
      navbar={
        showNavigation
          ? {
              width: "var(--bm-rail-width)",
              breakpoint: "md",
            }
          : undefined
      }
      classNames={{
        header: classes["shell-header"],
        navbar: classes["shell-navbar"],
        main: classes["shell-main"],
      }}
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      {showNavigation && (
        <AppShell.Navbar p={0}>
          <Navigation value={activeTab} onChange={navigate} />
        </AppShell.Navbar>
      )}

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
