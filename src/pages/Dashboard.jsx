import { useAuthStore } from "../shared/store/useAuthStore";
import { Navigate } from "react-router-dom";
import AdminDashboard from "../features/admin/components/AdminDashboard";
import UserDashboard from "../features/user/components/UserDashboard";

export default function Dashboard() {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "resident") {
    return <UserDashboard />;
  }

  return <AdminDashboard />;
}
