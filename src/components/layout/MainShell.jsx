import { AppShell } from "@mantine/core";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import Navigation from "./Navigation";
import classes from "../../styles/components/shell.module.css";

export default function MainShell() {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = location.pathname.split("/")[1] || "dashboard";

  const handleTabChange = (value) => {
    navigate(`/${value}`);
  };

  return (
    <AppShell
      header={{ height: "var(--bm-header-height)" }}
      navbar={{
        width: "var(--bm-rail-width)",
        breakpoint: "md",
      }}
      classNames={{
        header: classes["shell-header"],
        navbar: classes["shell-navbar"],
        main: classes["shell-main"],
      }}
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Navbar p={0}>
        <Navigation value={activeTab} onChange={handleTabChange} />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
