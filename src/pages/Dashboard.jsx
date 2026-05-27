import { useAuthStore } from "../shared/store/useAuthStore";
import { Navigate } from "react-router-dom";
import ManagerDashboard from "../features/manager/components/ManagerDashboard";
import AdminDashboard from "../features/admin/components/AdminDashboard";
import UserDashboard from "../features/user/components/UserDashboard";

export default function Dashboard() {
  const { user } = useAuthStore();

  if (!user)
    return <Navigate to="/login" replace />;

  switch (user.role) {
    case "user":
      return <UserDashboard />;

    case "manager":
      return <ManagerDashboard />;

    case "admin":
      return <AdminDashboard />;

    default:
      console.warn(`Unauthorized role access attempted: ${user.role}`);
      return <Navigate to="/login" replace />;
  }
}
