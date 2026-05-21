import { Stack, Title, Text } from "@mantine/core";
import { useManagerStats } from "../hooks/useManagerStats";
import OverviewCharts from "./OverviewCharts";
import KPIGrid from "./KPIGrid";
import RecentActivity from "./RecentActivity";

export default function ManagerDashboard() {
  const stats = useManagerStats();

  const sections = [
    { label: "Overview", component: OverviewCharts },
    { label: "Details", component: KPIGrid },
    { label: "Recent Activities", component: RecentActivity },
  ];

  return (
    <Stack gap="xl">
      <Title order={2}>Manager Dashboard</Title>

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
