import AdminDashboard from "../features/admin/components/AdminDashboard";
import UserDashboard from "../features/user/components/UserDashboard";
// import { useAuthStore } from "../shared/store/useAuthStore"; // Uncomment for Auth

export default function Dashboard() {
  // const { user } = useAuthStore();
  //
  // if (user?.role === "resident") {
  //   return <ResidentDashboard />;
  // }
  return <AdminDashboard />;
}
