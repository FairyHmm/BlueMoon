import { Stack, Text, Group, Paper } from "@mantine/core";
import { IconReceipt } from "@tabler/icons-react";

export default function AdminRecentActivity({ stats: { recentActivity } }) {
  return (
    <Paper bg="var(--color-bg-card)">
      <Group justify="space-between" mb="md">
        <Text fw={700} size="sm">
          Thanh toán gần đây
        </Text>
        <IconReceipt size={18} color="var(--color-text-muted)" />
      </Group>

      <Stack spacing="xs">
        {recentActivity.length > 0 ? (
          recentActivity.map((item) => (
            <Group
              key={item.id}
              justify="space-between"
              p="sm"
              bg="var(--color-bg-input)"
              radius="sm"
            >
              <Stack spacing={0}>
                <Text
                  size="sm"
                  fw={600}
                  ff="var(--font-family-mono)"
                >
                  Căn hộ {item.apt} • #{item.id}
                </Text>
                <Text size="xs" c="var(--color-text-muted)">
                  {item.date}
                </Text>
              </Stack>

              <Text size="sm" fw={700} c="var(--color-success)">
                +{item.amount.toLocaleString()} ₫
              </Text>
            </Group>
          ))
        ) : (
          <Text size="xs" c="var(--color-text-muted)" align="center" py="lg">
            Không có hoạt động gần đây.
          </Text>
        )}
      </Stack>
    </Paper>
  );
}
