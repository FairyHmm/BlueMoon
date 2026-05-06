import { Group, Stack, Text, Badge } from "@mantine/core";
import { IconHome } from "@tabler/icons-react";
import { UNIT_TYPES, getUnitConfig } from "../../../data/registryConfigs";
import EditableField from "../../ui/EditableField";
import { TextInput, NumberInput, Select } from "@mantine/core";

export default function UnitHeader({ unit, onUpdate }) {
  const cfg = getUnitConfig(unit.type);
  const Icon = cfg.icon || IconHome;

  return (
    <Group justify="space-between" align="flex-start">
      <Stack gap={0}>
        <Group gap={6}>
          <Icon size={16} color={`var(--mantine-color-${cfg.color}-filled)`} />
          <Group gap={4}>
            <Text fw={900} size="sm">
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
              <Text size="xs" c="dimmed">
                {cfg.label}
              </Text>
            )}
          />
          <Text size="xs" c="dimmed">
            •
          </Text>
          <EditableField
            value={unit.area}
            component={NumberInput}
            decimalScale={2}
            onSave={(v) => onUpdate(unit.id, { area: v })}
            renderDisplay={(v) => (
              <Text size="xs" c="dimmed">
                {v}m²
              </Text>
            )}
          />
        </Group>
      </Stack>

      {unit.hasUnpaidBills && (
        <Badge color="red" variant="dot" size="xs">
          DEBT
        </Badge>
      )}
    </Group>
  );
}
