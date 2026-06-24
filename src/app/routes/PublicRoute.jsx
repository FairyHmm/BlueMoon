import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../shared/store/useAuthStore";

export default function PublicRoute({ element }) {
  const { user, ready } = useAuthStore();
  const location = useLocation();

  if (!ready) return null;

  if (user) {
    const from = location.state?.from?.pathname || "/dashboard";
    return <Navigate to={from} replace />;
  }

  return element;
}
