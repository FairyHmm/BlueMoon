import { Title, Text, Grid, Stack, SimpleGrid } from "@mantine/core";

import { useUserDashboard } from "../hooks/useUserDashboard";

import UserHouseholdPanel from "./UserHouseholdPanel";
import UserVehiclePanel from "./UserVehiclePanel";
import UserLedgerPanel from "./UserLedgerPanel";

export default function UserDashboard() {
  const data = useUserDashboard();

  return (
    <Stack gap="md" p="md">
      <Title order={2}>Welcome back, {data?.profile?.name || "Cư dân"}</Title>

      <Text size="sm">
        Unit {data?.apartment?.id || "—"} • {data?.apartment?.type || "—"}
      </Text>

      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <UserLedgerPanel
            bills={data?.bills}
            feeTypes={data?.feeTypes}
            balanceDue={data?.stats?.balanceDue || 0}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <SimpleGrid cols={{ base: 2, md: 1 }}>
            <UserHouseholdPanel household={data?.household} />
            <UserVehiclePanel vehicles={data?.vehicles} />
          </SimpleGrid>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
