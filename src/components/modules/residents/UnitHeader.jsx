import {
  Group,
  Stack,
  Text,
  Badge,
  ActionIcon,
  Menu,
  TextInput,
  NumberInput,
  Select,
} from "@mantine/core";
import { IconHome, IconDotsVertical, IconTrash } from "@tabler/icons-react";
import EditableField from "../../ui/EditableField";
import { UNIT_TYPES, getUnitConfig } from "../../../data/registryConfigs";
import classes from "../../../styles/components/modules/residents/unit-header.module.css";

export default function UnitHeader({ unit, onUpdate, onRemove }) {
  const cfg = getUnitConfig(unit.type);
  const Icon = cfg.icon || IconHome;

  return (
    <Group
      justify="space-between"
      align="flex-start"
      className={classes["header-root"]}
    >
      <Stack gap={0}>
        <Group gap={6}>
          {/* Using brand primary variable for the icon */}
          <Icon size={16} style={{ color: "var(--color-primary)" }} />
          <Group gap={4}>
            <Text fw={900} size="sm" className={classes["title-label"]}>
              Unit
            </Text>
            <EditableField
              value={unit.id}
              component={TextInput}
              onSave={(v) => onUpdate(unit.id, { id: v })}
              fw={900}
              size="sm"
            />
          </Group>
        </Group>

        <Group gap={4} className="mono">
          <EditableField
            value={unit.type}
            component={Select}
            immediate
            data={Object.values(UNIT_TYPES).map((t) => ({
              value: t.value,
              label: t.label,
            }))}
            onSave={(v) => onUpdate(unit.id, { type: v })}
            renderDisplay={() => (
              <Text size="xs" className="color-muted">
                {cfg.label}
              </Text>
            )}
            comboboxProps={{ zIndex: 2000, withinPortal: true }}
          />
          <Text size="xs" className="color-muted">
            •
          </Text>
          <EditableField
            value={unit.area}
            component={NumberInput}
            decimalScale={2}
            onSave={(v) => onUpdate(unit.id, { area: v })}
            renderDisplay={(v) => (
              <Text size="xs" className="color-muted">
                {v}m²
              </Text>
            )}
          />
        </Group>
      </Stack>

      <Group gap="xs">
        {unit.hasUnpaidBills && (
          <Badge variant="dot" size="xs" className={classes["debt-badge"]}>
            DEBT
          </Badge>
        )}

        <Menu shadow="md" width={160} position="bottom-end">
          <Menu.Target>
            <ActionIcon variant="subtle" className={classes["action-trigger"]}>
              <IconDotsVertical size={14} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown className={classes["menu-dropdown"]}>
            <Menu.Item
              color="var(--color-danger)"
              leftSection={<IconTrash size={14} />}
              onClick={() => {
                if (
                  window.confirm(
                    `Delete unit ${unit.id} and unlink all residents?`,
                  )
                ) {
                  onRemove(unit.id); // Triggers cascading update
                }
              }}
            >
              Delete Unit
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  );
}
