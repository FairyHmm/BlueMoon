import { memo } from "react";
import {
  Stack,
  Text,
  ScrollArea,
  UnstyledButton,
  Group,
  ThemeIcon,
  ActionIcon,
  Button,
  Divider,
} from "@mantine/core";
import { IconTrash, IconChevronRight, IconPlus } from "@tabler/icons-react";
import { INTERVAL_MAP, BILLING_INTERVALS } from "../utils/constants";
import { useFeeTypeModalStore } from "../store/feeTypeModalStore";

export function CategoryList({ items, onDelete }) {
  const { selectedId, addNew } = useFeeTypeModalStore();

  return (
    <Stack style={{ height: "400px" }}>
      <Stack gap="xs" style={{ flex: 1, minHeight: 0 }}>
        <Text size="sm" fw={700} tt="uppercase" c="dimmed">
          Danh mục
        </Text>
        <ScrollArea offsetScrollbars>
          <Stack gap={4} pr="xs">
            {items.map((item) => (
              <CategoryItem
                key={item.id}
                item={item}
                isSelected={selectedId === item.id}
                onDelete={onDelete}
              />
            ))}
          </Stack>
        </ScrollArea>
      </Stack>

      <Stack gap={0}>
        <Divider variant="dotted" mb="sm" />
        <Button
          size="sm"
          fullWidth
          rightSection={<IconPlus size={14} />}
          onClick={() => addNew(items.length)}
        >
            Thêm danh mục
        </Button>
      </Stack>
    </Stack>
  );
}

const CategoryItem = memo(({ item, isSelected, onDelete }) => {
  const { selectItem } = useFeeTypeModalStore();

  const interval =
    INTERVAL_MAP[item.interval] ?? INTERVAL_MAP[BILLING_INTERVALS.MONTHLY];
  const price = `${Number(item.price || 0).toLocaleString()} ₫`;

  return (
    <UnstyledButton
      onClick={() => selectItem(item.id)}
      p="xs"
      style={{
        borderRadius: "var(--radius-md)",
        border: `1px solid ${isSelected ? "var(--color-primary)" : "transparent"}`,
        display: "flex",
      }}
    >
      <Group gap="sm" wrap="nowrap" style={{ overflow: "hidden" }}>
        <ThemeIcon color={interval.color} size="sm">
          <interval.icon size={14} />
        </ThemeIcon>
        <Group gap="0" style={{ overflow: "hidden" }}>
          <Text size="sm" fw={isSelected ? 600 : 500} truncate>
            {item.name || "Quy tắc chưa đặt tên"}
          </Text>
          <Text size="xs" c="dimmed">
            {price} • {interval.label}
          </Text>
        </Group>
      </Group>
      <Group gap={4} wrap="nowrap">
        <ActionIcon
          variant="subtle"
          color="red"
          size="xs"
          onClick={(e) => {
            e.stopPropagation();
            if (onDelete) onDelete(item.id);
          }}
        >
          <IconTrash size={14} />
        </ActionIcon>
        <IconChevronRight size={14} style={{ opacity: isSelected ? 1 : 0.2 }} />
      </Group>
    </UnstyledButton>
  );
});
