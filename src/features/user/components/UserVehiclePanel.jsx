import { Stack, Paper, Title, Text, Group, ThemeIcon } from "@mantine/core";
import { VEHICLE_CONFIG } from "../utils/constants";
import { IconCarGarage } from "@tabler/icons-react";

export default function UserVehiclePanel({ vehicles = [] }) {
  return (
    <Paper>
      <Group gap="xs" mb="md">
        <IconCarGarage size={18} />
        <Title order={4}>Registered Vehicles</Title>
      </Group>

      {vehicles.length > 0 ? (
        <Stack gap="xs">
          {vehicles.map((v) => {
            const { icon: Icon, color } = VEHICLE_CONFIG[v.type];

            return (
              <Group key={v.plate_number}>
                <ThemeIcon color={color}>
                  <Icon size={14} />
                </ThemeIcon>

                <Text fw={700} className="mono">
                  {v.plate_number}
                </Text>
              </Group>
            );
          })}
        </Stack>
      ) : (
        <Text size="xs" c="dimmed" ta="center" py="xs">
          No registered vehicles.
        </Text>
      )}
    </Paper>
  );
}
