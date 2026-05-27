import { Title, Text, Grid, Stack, SimpleGrid } from "@mantine/core";

import { useUserDashboard } from "../hooks/useUserDashboard";

import HouseholdPanel from "./HouseholdPanel";
import VehiclePanel from "./VehiclePanel";
import LedgerPanel from "./LedgerPanel";

export default function UserDashboard() {
  const {
    profile,
    apartment,
    bills,
    feeTypes,
    stats,
    household,
    absenceLogs,
    vehicles,
  } = useUserDashboard();

  return (
    <Stack gap="md" p="md">
      <Title order={2}>Welcome back, {profile?.name || "Cư dân"}</Title>

      <Text size="sm">
        Unit {apartment?.id || "—"} • {apartment?.type || "—"}
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
          <SimpleGrid cols={{ base: 2, md: 1 }}>
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
