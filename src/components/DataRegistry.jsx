import {
  Stack,
  Group,
  Text,
  TextInput,
  Button,
  Paper,
  Box,
  Table,
  ActionIcon,
} from "@mantine/core";
import {
  IconSearch,
  IconPlus,
  IconTrash,
  IconCheck,
  IconMinus,
  IconCircleFilled,
} from "@tabler/icons-react";
import drClasses from "../styles/components/data-registry.module.css";

const renderCell = (col, row) => {
  const value = row[col.key];

  if (col.render) return col.render(value, row);

  if (col.type === "boolean") {
    return value ? (
      <IconCheck size={14} color="var(--color-primary)" />
    ) : (
      <IconMinus size={12} />
    );
  }

  if (col.type === "status") {
    const statusColor =
      value === "active" ? "var(--color-success)" : "var(--color-warning)";
    return (
      <Group gap={6}>
        <IconCircleFilled size={8} color={statusColor} />
        <Text size="xs" fw={700} c="var(--color-text-muted)">
          {value.toUpperCase()}
        </Text>
      </Group>
    );
  }

  return value;
};

export default function DataRegistry({
  title,
  data,
  columns,
  onAdd,
  onDelete,
  searchQuery,
  setSearchQuery,
}) {
  return (
    <Stack className={drClasses["registry-root"]}>
      {/* Header with Search */}
      <Group justify="space-between" px="md" py="xs" align="center">
        <Text size="xs" fw={900} c="var(--color-text-muted)">
          {title?.toUpperCase()}
        </Text>
        <TextInput
          placeholder="SCAN_DB..."
          size="xs"
          variant="filled"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          leftSection={<IconSearch size={14} />}
          style={{ width: "180px" }}
        />
      </Group>

      <Paper className={drClasses["registry-paper"]} radius={0}>
        <Table className={drClasses["registry-table"]} highlightOnHover>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.label} style={{ textAlign: col.align }}>
                  {col.label}
                </th>
              ))}
              <th />
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                {columns.map((col) => (
                  <td
                    key={col.label}
                    className={col.className}
                    style={{ textAlign: col.align }}
                  >
                    {renderCell(col, row)}
                  </td>
                ))}
                <td align="right">
                  <ActionIcon
                    variant="subtle"
                    color="red"
                    size="sm"
                    onClick={() => onDelete(row.id)}
                  >
                    <IconTrash size={14} />
                  </ActionIcon>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Box p="md">
          <Button
            fullWidth
            size="xs"
            leftSection={<IconPlus size={16} />}
            onClick={onAdd}
            color="blue"
          >
            Add new
          </Button>
        </Box>
      </Paper>
    </Stack>
  );
}
