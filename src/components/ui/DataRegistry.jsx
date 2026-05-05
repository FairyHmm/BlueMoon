import { Stack, Group, Text, TextInput, Box } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import classes from "../../styles/components/data-registry.module.css";

export default function DataRegistry({
  title,
  searchQuery,
  setSearchQuery,
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
        <TextInput
          placeholder="Filter..."
          size="xs"
          variant="filled"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          leftSection={<IconSearch size={14} />}
          style={{ width: "200px" }}
        />
      </Group>

      <Box className={classes["registry-content-area"]} p="md">
        {children}
      </Box>
    </Stack>
  );
}
