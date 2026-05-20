import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { theme } from "./styles/theme";

/* Styles */
import "@mantine/core/styles.css";
import "./styles/theme.css";

/* Layout & Pages */
import MainShell from "./components/MainShell";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import Residents from "../pages/Residents";
import Finance from "../pages/Finance";
import Settings from "../pages/Settings";
import LoginForm from "../features/auth/components/LoginForm"; // Import Login Form

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {/* PUBLIC ROUTE: Login (No MainShell) */}
          <Route path="/login" element={<LoginForm />} />

          {/* PROTECTED ROUTES: Wrapped in ProtectedRoute */}
          <Route element={<ProtectedRoute> <MainShell /> </ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/residents" element={<Residents />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/settings" element={<Settings />} />

            {/* Redirect root "/" to "/dashboard" */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}
