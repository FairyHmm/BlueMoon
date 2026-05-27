import { useMemo, useState } from "react";

import { useAuthStore } from "../../../shared/store/useAuthStore";
import { useDbStore } from "../../../shared/store/useDbStore";

const STAFF_ROLES = ["admin", "manager"];

export function useAdminDashboard() {
  const { user: currentUser } = useAuthStore();

  const { users = [], apartments = [], residents = [] } = useDbStore();

  const [filter, setFilter] = useState("all");

  const handleRoleUpdate = (userId, role) => {
    useDbStore.setState((state) => ({
      users: state.users.map((user) =>
        user.id === userId ? { ...user, role } : user,
      ),
    }));
  };

  const stats = useMemo(
    () => ({
      totalAccounts: users.length,
      totalStaff: users.filter((user) => STAFF_ROLES.includes(user.role))
        .length,
      totalUnits: apartments.length,
    }),
    [users, apartments],
  );

  const filteredUsers = useMemo(() => {
    switch (filter) {
      case "staff":
        return users.filter((user) => STAFF_ROLES.includes(user.role));

      case "all":
        return users;

      default:
        return users.filter((user) => user.role === filter);
    }
  }, [users, filter]);

  return {
    currentUser,
    residents,

    filter,
    setFilter,

    stats,
    filteredUsers,

    handleRoleUpdate,
  };
}
