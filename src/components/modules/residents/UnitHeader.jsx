import { Group, Stack, Text, Badge } from "@mantine/core";
import { IconHome } from "@tabler/icons-react";

export default function UnitHeader({ unit }) {
  return (
    <Group justify="space-between" align="flex-start">
      <Stack gap={0}>
        <Group gap={6}>
          <IconHome size={16} color="var(--color-primary)" />
          <Text fw={900}>Unit {unit.id}</Text>
        </Group>
        <Text size="xs" c="dimmed" className="mono">
          {unit.type} • {unit.area}m²
        </Text>
      </Stack>
      {unit.hasUnpaidBills && (
        <Badge color="red" variant="dot" size="xs">
          DEBT
        </Badge>
      )}
    </Group>
  );
}
