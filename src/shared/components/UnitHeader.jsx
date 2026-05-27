import {
  Group,
  Stack,
  Text,
  ActionIcon,
  Menu,
  TextInput,
  Select,
  NumberInput,
} from "@mantine/core";
import { IconHome, IconDotsVertical, IconTrash } from "@tabler/icons-react";
import EditableField from "./EditableField";
import { UNIT_TYPES, getUnitConfig } from "../../features/residents/utils/constants";
import classes from "../styles/unit-header.module.css";

export default function UnitHeader({
  unit,
  onUpdate,
  onRemove,
  isReadOnly = false,
}) {
  const cfg = getUnitConfig(unit.type);
  const dynamicColor = `var(--mantine-color-${cfg.color}-filled)`;
  const Icon = cfg.icon || IconHome;

  return (
    <Group
      justify="space-between"
      align="flex-start"
      className={classes["header-root"]}
    >
      <Stack gap={0}>
        <Group gap={6}>
          <Icon size={16} color={dynamicColor} />
          <Group gap={4}>
            <Text fw={900} size="sm" className={classes["title-label"]}>
              Unit
            </Text>
            <EditableField
              value={unit.id}
              readOnly={isReadOnly}
              component={TextInput}
              onSave={(v) => onUpdate?.(unit.id, { id: v })}
              fw={900}
              size="sm"
              style={{ "--accent-color": dynamicColor }}
              className={classes["id-field"]}
            />
          </Group>
        </Group>

        {/* 1. Meta info (Type/Area) only shows when NOT read-only */}
        {!isReadOnly && (
          <Group gap={4} className="mono">
            <EditableField
              value={unit.type}
              component={Select}
              immediate
              data={Object.values(UNIT_TYPES).map((t) => ({
                value: t.value,
                label: t.label,
              }))}
              onSave={(v) => onUpdate?.(unit.id, { type: v })}
              renderDisplay={() => (
                <Text size="xs" className="color-muted">
                  {cfg.label}
                </Text>
              )}
              style={{ "--accent-color": dynamicColor }}
            />
            <Text size="xs" className="color-muted">
              •
            </Text>
            <EditableField
              value={unit.area}
              component={NumberInput}
              onSave={(v) => onUpdate?.(unit.id, { area: v })}
              renderDisplay={(v) => (
                <Text size="xs" className="color-muted">
                  {v}m²
                </Text>
              )}
              style={{ "--accent-color": dynamicColor }}
            />
          </Group>
        )}
      </Stack>

      <Group gap="xs">
        {/* 3. Actions only show when NOT read-only */}
        {!isReadOnly && (
          <Menu shadow="md" width={160} position="bottom-end">
            <Menu.Target>
              <ActionIcon variant="subtle">
                <IconDotsVertical size={14} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown className={classes["menu-dropdown"]}>
              <Menu.Item
                color="red"
                leftSection={<IconTrash size={14} />}
                onClick={() =>
                  window.confirm(`Delete ${unit.id}?`) && onRemove?.(unit.id)
                }
              >
                Delete Unit
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}
      </Group>
    </Group>
  );
}
