import { Group, Text, ActionIcon } from "@mantine/core";
import { IconUserStar, IconTrash } from "@tabler/icons-react";
import StatusMenu from "../../../shared/components/StatusMenu";
import {
  RESIDENT_STATUS,
  getStatusConfig,
} from "../../../shared/data/registryConfigs";
import classes from "../../../styles/components/modules/residents/resident-row.module.css";

export default function ResidentRow({ res, onUpdate, onRemove }) {
  return (
    <Group wrap="nowrap" className={classes["resident-item"]} gap="xs">
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

        <StatusMenu
          value={res.status}
          options={RESIDENT_STATUS}
          getConfig={getStatusConfig}
          onUpdate={(newStatus) => onUpdate(res.id, { status: newStatus })}
        />
      </Group>
    </Group>
  );
}
