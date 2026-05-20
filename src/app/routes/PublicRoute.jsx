import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../shared/store/useAuthStore";

export default function PublicRoute({ element }) {
  const { user, loading } = useAuthStore();
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  if (user) {
    const from = location.state?.from?.pathname || "/dashboard";
    return <Navigate to={from} replace />;
  }

  return element;
}
