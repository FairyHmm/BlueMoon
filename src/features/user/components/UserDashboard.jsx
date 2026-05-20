import { Title, Stack, Paper, Text, Group } from "@mantine/core";
import { IconHome, IconReceipt } from "@tabler/icons-react";

export default function ResidentDashboard() {
  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Title order={2}>My Home</Title>
      </Group>

      <Paper p="md" radius="md" withBorder>
        <Group gap="md">
          <IconHome size={32} color="blue" />
          <div>
            <Text size="lg" fw={600}>Unit 101</Text>
            <Text size="sm" c="dimmed">Welcome back, Alex</Text>
          </div>
        </Group>
      </Paper>

      <Stack gap="sm">
        <Title order={4}>My Bills</Title>
        <Paper p="md" withBorder ta="center" py="xl">
          <Text c="dimmed">Billing history will appear here.</Text>
          <IconReceipt size={48} color="gray.3" mt="md" />
        </Paper>
      </Stack>
    </Stack>
  );
}
