import { Group, Stack, Text, Title, Divider } from "@mantine/core";
import classes from "../styles/card-section.module.css";

export default function CardSection({
  header,
  title,
  action,

  items,
  renderItem,
  emptyMessage = "No records found.",

  children,
  footer,
}) {
  const hasHeader = header || title || action;
  const hasItems = items && renderItem;

  return (
    <Stack gap="xs" p="md" radius="md" className={classes.card}>
      {hasHeader && (
        <>
          {header ? (
            header
          ) : (
            <Group justify="space-between">
              {title && <Title order={4}>{title}</Title>}

              {action}
            </Group>
          )}

          <Divider variant="dotted" />
        </>
      )}

      <Stack gap="xs" style={{ flexGrow: 1 }}>
        {children}

        {hasItems &&
          (items.length === 0 ? (
            <Text size="xs" c="dimmed" ta="center" py="xl">
              {emptyMessage}
            </Text>
          ) : (
            items.map(renderItem)
          ))}
      </Stack>

      {footer && (
        <Stack mt="auto" pt="sm">
          {footer}
        </Stack>
      )}
    </Stack>
  );
}
