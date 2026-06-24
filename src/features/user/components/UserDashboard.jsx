import { Title, Text, Grid, Stack, SimpleGrid } from "@mantine/core";

import { useUserDashboard } from "../hooks/useUserDashboard";

import HouseholdPanel from "./HouseholdPanel";
import VehiclePanel from "./VehiclePanel";
import LedgerPanel from "./LedgerPanel";

export default function UserDashboard() {
  const data = useUserDashboard();

  if (!data) {
    return (
      <Stack gap="md" p="md">
        <Title order={2}>Tài khoản đang chờ</Title>
        <Text size="sm" c="dimmed">
          Tài khoản của bạn đang chờ phê duyệt.
          Vui lòng liên hệ quản lý tòa nhà.
        </Text>
      </Stack>
    );
  }

  const {
    profile,
    apartment,
    bills,
    feeTypes,
    stats,
    household,
    absenceLogs,
    vehicles,
  } = data;

  return (
    <Stack gap="md" p="md">
      <Title order={2}>Chào mừng trở lại, {profile?.name || "Cư dân"}</Title>

      <Text size="sm">
        Căn hộ {apartment?.id || "—"} • {apartment?.type || "—"}
      </Text>

      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <LedgerPanel
            bills={bills}
            feeTypes={feeTypes}
            balanceDue={stats?.balanceDue || 0}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <SimpleGrid cols={{ base: 1, xs: 2, md: 1 }} spacing="md">
            <HouseholdPanel
              household={household}
              absenceLogs={absenceLogs}
              residentId={profile?.id}
            />

            <VehiclePanel vehicles={vehicles} apartmentId={apartment?.id} />
          </SimpleGrid>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
