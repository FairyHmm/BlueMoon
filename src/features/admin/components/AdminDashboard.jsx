import { Stack, Title, Text } from "@mantine/core";
import { useAdminStats } from "../hooks/useAdminStats";
import AdminOverviewCharts from "./AdminOverviewCharts";
import AdminKPIGrid from "./AdminKPIGrid";
import AdminRecentActivity from "./AdminRecentActivity";

export default function AdminDashboard() {
  const stats = useAdminStats();

  const sections = [
    { label: "Overview", component: AdminOverviewCharts },
    { label: "Details", component: AdminKPIGrid },
    { label: "Recent Activities", component: AdminRecentActivity },
  ];

  return (
    <Stack gap="xl">
      <Title order={2}>Admin Dashboard</Title>

      {sections.map(({ label, component: SectionComponent }) => (
        <Stack key={label}>
          <Text size="sm" fw={600} c="dimmed" tt="uppercase" lts="0.05em">
            {label}
          </Text>
          <SectionComponent stats={stats} />
        </Stack>
      ))}
    </Stack>
  );
}
