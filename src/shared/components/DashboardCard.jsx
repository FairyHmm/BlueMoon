import { Paper, Stack, Group, Title, Text, ThemeIcon } from "@mantine/core";

export default function DashboardCard({
  title,
  action,
  footer,
  items,
  emptyMessage,
  renderItem,
  children,
}) {
  const isEmpty = items && renderItem && items.length === 0;

  return (
    <Paper p="md" radius="md" withBorder>
      <Stack gap="md">
        {(title || action) && (
          <Group justify="space-between">
            {title ? <Title order={4}>{title}</Title> : <div />}
            {action}
          </Group>
        )}

        {children}

        {items && renderItem && (
          <Stack gap="xs">
            {isEmpty ? (
              <Text size="xs" c="dimmed" ta="center" py="xl">
                {emptyMessage}
              </Text>
            ) : (
              items.map(renderItem)
            )}
          </Stack>
        )}

        {footer}
      </Stack>
    </Paper>
  );
}

export function DashboardRow({
  keyProp,
  icon: Icon,
  iconColor = "gray",
  label,
  description,
  badge,
  mono = false,
}) {
  return (
    <Group key={keyProp} justify="space-between" wrap="nowrap">
      <Group gap="sm">
        <ThemeIcon size="sm" radius="xl" color={iconColor}>
          <Icon size={14} />
        </ThemeIcon>

        <Text fw={500} className={mono ? "mono" : undefined}>
          {label}
        </Text>

        {description && (
          <Text size="xs" c="dimmed">
            {description}
          </Text>
        )}
      </Group>

      {badge}
    </Group>
  );
}
