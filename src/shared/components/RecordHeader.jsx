import { Group, Text, ActionIcon } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

export default function RecordHeader({ title, onAdd, color = "blue" }) {
  return (
    <Group justify="space-between" mb="xs">
      <Text size="xs" fw={700} c="dimmed">
        {title.toUpperCase()}
      </Text>
      {onAdd && (
        <ActionIcon size="sm" color={color} onClick={onAdd}>
          <IconPlus size={12} />
        </ActionIcon>
      )}
    </Group>
  );
}
