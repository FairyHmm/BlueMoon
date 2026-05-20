import { Title, Stack, Group, Paper, Text, SimpleGrid } from "@mantine/core";
import { IconChartBar, IconUsers, IconReceipt } from "@tabler/icons-react";

export default function AdminDashboard() {
  return (
    <Stack gap="lg">
      <Title order={2}>Admin Dashboard</Title>
      <Text c="dimmed">Global overview and management tools.</Text>

      <SimpleGrid cols={{ base: 1, sm: 3 }}>
        {/* Placeholder: Occupancy Stats */}
        <Paper p="md" withBorder>
          <Group gap="xs">
            <IconUsers size={24} color="blue" />
            <div>
              <Text size="xs" c="dimmed">
                Total Residents
              </Text>
              <Text size="xl" fw={700}>
                0
              </Text>
            </div>
          </Group>
        </Paper>

        {/* Placeholder: Financial Stats */}
        <Paper p="md" withBorder>
          <Group gap="xs">
            <IconReceipt size={24} color="cyan" />
            <div>
              <Text size="xs" c="dimmed">
                Monthly Revenue
              </Text>
              <Text size="xl" fw={700}>
                $0.00
              </Text>
            </div>
          </Group>
        </Paper>

        {/* Placeholder: Pending Actions */}
        <Paper p="md" withBorder>
          <Group gap="xs">
            <IconChartBar size={24} color="orange" />
            <div>
              <Text size="xs" c="dimmed">
                Pending Bills
              </Text>
              <Text size="xl" fw={700}>
                0
              </Text>
            </div>
          </Group>
        </Paper>
      </SimpleGrid>
    </Stack>
  );
}
