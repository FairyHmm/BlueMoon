import { Stack, Title } from "@mantine/core";
import { useAdminDashboard } from "../hooks/useAdminDashboard";
import OverviewGrid from "./OverviewGrid";
import AccountDirectoryPanel from "./AccountDirectoryPanel";

export default function AdminDashboard() {
  const dashboard = useAdminDashboard();

  return (
    <Stack gap="xl" py="xl">
      <Title order={2} fw={900}>
        Administrator Dashboard
      </Title>

      <OverviewGrid stats={dashboard.stats} />

      <AccountDirectoryPanel {...dashboard} />
    </Stack>
  );
}
