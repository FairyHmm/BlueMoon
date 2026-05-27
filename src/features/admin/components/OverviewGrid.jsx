import { Grid } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { IconUsers, IconShield } from "@tabler/icons-react";
import MetricCard from "../../../shared/components/MetricCard";

export default function OverviewGrid({ stats }) {
  const { width } = useViewportSize();

  const getSpan = () => {
    if (width >= 1100) return 4;
    if (width >= 768) return 6;
    return 12;
  };

  const kpiCards = [
    {
      key: "total-accounts",
      label: "Total System Accounts",
      value: stats.totalAccounts,
      description: "Active system logins",
      icon: IconUsers,
      color: "var(--color-primary)",
    },
    {
      key: "management-staff",
      label: "Management Staff",
      value: stats.totalStaff,
      description: "Admin & Manager privileges",
      icon: IconShield,
      color: "var(--color-success)",
    },
  ];

  return (
    <Grid grow mb="xl">
      {kpiCards.map(
        ({ key, label, value, description, icon: IconComponent, color }) => (
          <Grid.Col key={key} span={getSpan()}>
            <MetricCard
              label={label}
              value={value}
              description={description}
              icon={<IconComponent size={24} color={color} />}
            />
          </Grid.Col>
        ),
      )}
    </Grid>
  );
}
