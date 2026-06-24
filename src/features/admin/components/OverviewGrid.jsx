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
      label: "Tổng số tài khoản",
      value: stats.totalAccounts,
      description: "Đăng nhập hệ thống đang hoạt động",
      icon: IconUsers,
      color: "var(--color-primary)",
    },
    {
      key: "management-staff",
      label: "Nhân viên quản lý",
      value: stats.totalStaff,
      description: "Quyền Quản trị & Quản lý",
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
