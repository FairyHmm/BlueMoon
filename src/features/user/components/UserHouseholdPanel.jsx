import { Group, Paper, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { IconHome, IconUser } from "@tabler/icons-react";

export default function UserHouseholdPanel({ household = [] }) {
  return (
    <Paper p="md" radius="md" withBorder>
      <Stack gap="sm">
        <Group gap="xs">
          <IconHome size={18} />
          <Title order={4}>Members</Title>
        </Group>

        {household?.length > 0 ? (
          <Stack gap="xs">
            {household.map((member) => (
              <Group key={member.id} wrap="nowrap" gap="sm">
                <ThemeIcon
                  size="sm"
                  radius="xl"
                  color={member.is_head ? "blue" : "gray"}
                >
                  <IconUser size={14} />
                </ThemeIcon>

                <Text fw={500}>{member.name}</Text>
              </Group>
            ))}
          </Stack>
        ) : (
          <Text size="xs" c="dimmed" ta="center">
            No members.
          </Text>
        )}
      </Stack>
    </Paper>
  );
}
