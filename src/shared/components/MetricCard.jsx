import { Paper, Group, Text, Box, ActionIcon } from "@mantine/core";

export default function MetricCard({ label, value, description, icon }) {
  return (
    <Paper p="md" radius="md" withBorder>
      <Group gap="md" noWrap align="center">
        <ActionIcon variant="transparent">{icon}</ActionIcon>

        <Box>
          <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
            {label}
          </Text>

          <Text size="xl" fw={700}>
            {typeof value === "number" ? value.toLocaleString() : value}
          </Text>

          {description && (
            <Text size="xs" c="dimmed">
              {description}
            </Text>
          )}
        </Box>
      </Group>
    </Paper>
  );
}
