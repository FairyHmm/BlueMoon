import {
  Stack,
  Text,
  TextInput,
  Select,
  NumberInput,
  Divider,
  Group,
  Button,
  Checkbox,
} from "@mantine/core";
import { useFeeTypeModalStore } from "../store/feeTypeModalStore";
import {
  CALC_METHOD_MAP,
  CALC_METHOD_OPTIONS,
  INTERVAL_OPTIONS,
  BILLING_INTERVALS,
} from "../utils/constants";

export function CategoryWorkspaceForm() {
  const { formData, updateField } = useFeeTypeModalStore();
  const isActive = formData.name !== "";

  const calcMethod =
    CALC_METHOD_MAP[formData.calc_method] ?? CALC_METHOD_MAP["fixed"];

  return (
    <Stack justify="space-between" style={{ height: "400px" }}>
      {isActive ? (
        <Stack>
          <Text size="sm" fw={700} tt="uppercase" c="dimmed">
            Configuration
          </Text>

          <Group align="flex-end">
            <TextInput
              label="Category Name"
              placeholder="e.g., Management"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              autoFocus
              required
              style={{ flex: 1 }}
            />
            <Checkbox
              label="Optional"
              checked={formData.optional}
              onChange={(e) => updateField("optional", e.currentTarget.checked)}
              mb="sm"
              variant="outline"
            />
          </Group>

          <TextInput
            label="Description"
            placeholder="e.g., Monthly building maintenance fee"
            value={formData.description}
            onChange={(e) => updateField("description", e.target.value)}
          />

          <Group grow>
            <Select
              label="Calculation Method"
              data={CALC_METHOD_OPTIONS}
              value={formData.calc_method}
              onChange={(val) => updateField("calc_method", val || "fixed")}
              comboboxProps={{ zIndex: 5000, withinPortal: true }}
            />
            <Select
              label="Billing Interval"
              data={INTERVAL_OPTIONS}
              value={formData.interval}
              onChange={(val) =>
                updateField("interval", val || BILLING_INTERVALS.MONTHLY)
              }
              comboboxProps={{ zIndex: 5000, withinPortal: true }}
            />
          </Group>

          <Group grow>
            <NumberInput
              label={calcMethod.priceLabel}
              prefix="$ "
              value={formData.price}
              onChange={(val) => updateField("price", val)}
              min={0}
              decimalScale={2}
              hideControls
              required
            />
            <NumberInput
              label="Late Fee"
              placeholder="0"
              value={formData.late_fee}
              onChange={(val) => updateField("late_fee", val)}
              min={0}
              decimalScale={2}
              hideControls
              prefix="$ "
            />
          </Group>
        </Stack>
      ) : (
        <Stack align="center" justify="center" style={{ flex: 1 }}>
          <Text size="sm" c="dimmed" ta="center">
            Select or create a fee category to edit its properties.
          </Text>
        </Stack>
      )}

      <Stack gap={0}>
        <Divider variant="dotted" mb="sm" />
        <Group justify="flex-end">
          <Button
            size="sm"
            onClick={() => useFeeTypeModalStore.getState().reset()}
          >
            Done
          </Button>
        </Group>
      </Stack>
    </Stack>
  );
}
