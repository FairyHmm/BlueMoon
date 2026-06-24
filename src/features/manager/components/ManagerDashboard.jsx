import { Stack, Title, Text } from "@mantine/core";
import { useManagerStats } from "../hooks/useManagerStats";
import OverviewCharts from "./OverviewCharts";
import KPIGrid from "./KPIGrid";
import RecentActivity from "./RecentActivity";

export default function ManagerDashboard() {
  const stats = useManagerStats();

  const sections = [
    { label: "Tổng quan", component: OverviewCharts },
    { label: "Chi tiết", component: KPIGrid },
    { label: "Hoạt động gần đây", component: RecentActivity },
  ];

  return (
    <Stack gap="xl">
      <Title order={2}>Bảng điều khiển quản lý</Title>

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
