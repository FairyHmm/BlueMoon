import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { theme } from "./styles/theme";

/* Styles */
import "@mantine/core/styles.css";
import "./styles/theme.css";

/* Layout & Pages */
import MainShell from "./components/MainShell";
import Dashboard from "../pages/Dashboard";
import Residents from "../pages/Residents";
import Finance from "../pages/Finance";
import Settings from "../pages/Settings";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {/* MainShell acts as the persistent Layout wrapper */}
          <Route element={<MainShell />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/residents" element={<Residents />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/settings" element={<Settings />} />

            {/* Redirect root "/" to "/dashboard" */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Optional: Catch-all redirect for 404s */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}
