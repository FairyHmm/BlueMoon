import { Group, Text } from "@mantine/core";

export default function RecordRow({
  title,
  subtext,
  icon,
  badge,

  boldTitle = false,

  right,

  indented = false,
}) {
  return (
    <Group
      wrap="nowrap"
      gap="xs"
      style={{
        paddingLeft: indented ? "var(--spacing-md)" : 0,
      }}
    >
      <Group
        gap={6}
        wrap="nowrap"
        style={{
          flex: 1,
          minWidth: 0,
        }}
      >
        {icon}

        <div
          style={{
            overflow: "hidden",
            width: "100%",
          }}
        >
          <Group gap={4} wrap="nowrap">
            <Text size="sm" fw={boldTitle ? 900 : 400} truncate>
              {title}
            </Text>

            {badge}
          </Group>

          {subtext && (
            <Text size="10px" c="dimmed" lh={1} mt={1}>
              {subtext}
            </Text>
          )}
        </div>
      </Group>

      {right && (
        <Group gap="xs" wrap="nowrap">
          {right}
        </Group>
      )}
    </Group>
  );
}
