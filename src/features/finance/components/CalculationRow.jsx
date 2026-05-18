import { Flex, NumberInput, Stack, Text } from "@mantine/core";
import { IconCoin } from "@tabler/icons-react";
import { normaliseNumber } from "../utils/billing";

export default function CalculationRow({
  selectedFee,
  formulaResult,
  labels,
  updateField,
  customRate,
}) {
  const inputBaseProps = {
    hideControls: true,
    variant: "filled",
    style: { minWidth: 80, flex: 1 },
  };

  return (
    <Stack gap="xs">
      <Flex gap="xs" justify="center" align="center">
        <NumberInput
          label={labels.quantityLabel}
          value={formulaResult.base}
          onChange={(v) =>
            !labels.quantityDisabled &&
            updateField("custom_quantity", normaliseNumber(v))
          }
          readOnly={labels.quantityDisabled}
          styles={{
            input: { cursor: labels.quantityDisabled ? "not-allowed" : "" },
          }}
          min={1}
          {...inputBaseProps}
        />

        <Text
          fw={700}
          c="dimmed"
          style={{ alignSelf: "flex-end", marginBottom: 8 }}
        >
          ×
        </Text>

        <NumberInput
          label={labels.rateLabel}
          value={customRate !== "" ? customRate : undefined}
          onChange={(v) => updateField("custom_rate", normaliseNumber(v))}
          min={0}
          leftSection={<IconCoin size={14} />}
          placeholder={String(selectedFee.price || 0)}
          {...inputBaseProps}
        />

        <Text
          fw={700}
          c="dimmed"
          style={{ alignSelf: "flex-end", marginBottom: 8 }}
        >
          =
        </Text>

        <NumberInput
          label="Total"
          value={formulaResult.total.toFixed(2)}
          readOnly
          styles={{
            input: {
              color: "var(--color-primary)",
              fontWeight: 800,
              cursor: "not-allowed",
            },
          }}
          {...inputBaseProps}
        />
      </Flex>

      <Text size="xs" c="dimmed">
        Billing Strategy:{" "}
        <Text span fw={600} c="white">
          {formulaResult.schedule}
        </Text>
      </Text>
    </Stack>
  );
}
