import { Group, Text, ActionIcon, Menu, Badge } from "@mantine/core";
import { IconUserStar, IconTrash, IconChevronDown } from "@tabler/icons-react";
import classes from "../../../styles/components/modules/residents/resident-row.module.css";

export default function ResidentRow({ res, onUpdate, onRemove }) {
  return (
    <Group wrap="nowrap" className={classes["resident-item"]} gap="xs">
      {/* 1. Name Section: Automatically shows Star if head */}
      <Group
        gap={4}
        wrap="nowrap"
        style={{ flexShrink: 1, overflow: "hidden" }}
      >
        <Text
          size="sm"
          fw={res.is_head ? 900 : 400}
          className={classes["resident-name"]}
        >
          {res.name}
        </Text>
      </Group>

      {/* 2. Actions Section: Replaced divs with Group */}
      <Group gap="sm" wrap="nowrap" className={classes["actions-container"]}>
        <Group gap={4} wrap="nowrap" className={classes["hover-actions"]}>
          {!res.is_head && (
            <ActionIcon
              variant="subtle"
              size="xs"
              onClick={() => onUpdate(res.id, { is_head: true })}
            >
              <IconUserStar size={12} />
            </ActionIcon>
          )}
          <ActionIcon
            variant="subtle"
            color="red"
            size="xs"
            onClick={() => onRemove(res.id)}
          >
            <IconTrash size={12} />
          </ActionIcon>
        </Group>

        <Menu
          position="bottom-end"
          withinPortal
          shadow="md"
          // This maps the library's internal elements to your CSS module
          classNames={{
            dropdown: classes.dropdown,
            item: classes.item,
          }}
        >
          <Menu.Target>
            <Badge
              size="xs"
              className={classes["status-badge"]}
              color={res.status === "active" ? "green" : "orange"}
              rightSection={<IconChevronDown size={10} />}
            >
              {res.status}
            </Badge>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => onUpdate(res.id, { status: "active" })}>
              Active
            </Menu.Item>
            <Menu.Item onClick={() => onUpdate(res.id, { status: "pending" })}>
              Pending
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  );
}
