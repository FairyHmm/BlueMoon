import { Stack, Group, Text, TextInput, Box } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import classes from "../styles/data-registry.module.css";

export default function DataRegistry({
  title,
  searchQuery,
  setSearchQuery,
  rightSection,
  children,
}) {
  return (
    <Stack className={classes["registry-root"]} gap={0}>
      <Group
        justify="space-between"
        px="md"
        py="xs"
        className={classes["registry-header"]}
      >
        <Text size="xs" fw={900} c="var(--color-text-muted)">
          {title?.toUpperCase()}
        </Text>

        {/* 2. Group the search bar and the new button together */}
        <Group gap="sm">
          <TextInput
            placeholder="Filter..."
            size="xs"
            variant="filled"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            leftSection={<IconSearch size={14} />}
            style={{ width: "200px" }}
          />
          {rightSection}
        </Group>
      </Group>

      <Box className={classes["registry-content-area"]} p="md">
        {children}
      </Box>
    </Stack>
  );
}
