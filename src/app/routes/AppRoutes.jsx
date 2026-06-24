import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainShell from "../components/MainShell";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import { NAV_ITEMS } from "../utils/navigationConfigs";
import LoginForm from "../../features/auth/components/LoginForm";
import RegisterForm from "../../features/auth/components/RegisterForm";
import { useAuthStore } from "../../shared/store/useAuthStore";

export default function AppRoutes() {
  const ready = useAuthStore((s) => s.ready);

  if (!ready) return null;

  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route
          path="/login"
          element={<PublicRoute element={<LoginForm />} />}
        />
        <Route
          path="/register"
          element={<PublicRoute element={<RegisterForm />} />}
        />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainShell />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {NAV_ITEMS.map(({ path, component: Component, allowedRoles }) => (
              <Route
                key={path}
                path={path}
                element={
                  <ProtectedRoute
                    element={<Component />}
                    allowedRoles={allowedRoles}
                  />
                }
              />
            ))}

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
