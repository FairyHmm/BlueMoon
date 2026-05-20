import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../../shared/store/useAuthStore";

export default function ProtectedRoute({ allowedRoles, element }) {
  const { user, loading } = useAuthStore();
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  if (allowedRoles && !allowedRoles.includes(user.role))
    return <Navigate to="/dashboard" replace />;

  if (element) return element;

  return <Outlet />;
}
