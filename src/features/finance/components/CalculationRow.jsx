import { Flex, NumberInput, Stack, Text } from "@mantine/core";
import { IconCoin } from "@tabler/icons-react";
import { normaliseNumber } from "../utils/billing";

export default function CalculationRow({
  selectedFee,
  formulaResult,
  labels,
  updateField,
  customQuantity,
  customRate,
}) {
  const rateSuffix =
    selectedFee?.interval === "one_time"
      ? "(một lần)"
      : `(/ ${selectedFee?.interval === "yearly" ? "năm" : "th"})`;

  const inputStyle = { minWidth: 80, flex: 1 };

  return (
    <Stack gap="xs">
      <Flex gap="xs" justify="center" align="center">
        <NumberInput
          label={labels.quantityLabel}
          hideControls
          variant="filled"
          style={inputStyle}
          value={customQuantity !== "" ? customQuantity : formulaResult.base}
          onChange={(v) =>
            !labels.quantityDisabled &&
            updateField("custom_quantity", normaliseNumber(v))
          }
          readOnly={labels.quantityDisabled}
          styles={{
            input: { cursor: labels.quantityDisabled ? "not-allowed" : "" },
          }}
          min={1}
        />

        <Text
          fw={700}
          c="dimmed"
          style={{ alignSelf: "flex-end", marginBottom: 8 }}
        >
          ×
        </Text>

        <NumberInput
          label={`Đơn giá ${rateSuffix}`}
          hideControls
          variant="filled"
          style={inputStyle}
          value={customRate !== "" ? customRate : undefined}
          onChange={(v) => updateField("custom_rate", normaliseNumber(v))}
          min={0}
          leftSection={<IconCoin size={14} />}
          placeholder={String(selectedFee?.price || 0)}
        />

        <Text
          fw={700}
          c="dimmed"
          style={{ alignSelf: "flex-end", marginBottom: 8 }}
        >
          =
        </Text>

        <NumberInput
          label="Tổng"
          hideControls
          variant="filled"
          style={inputStyle}
          value={formulaResult.total.toFixed(2)}
          readOnly
          styles={{
            input: {
              color: "var(--color-primary)",
              fontWeight: 800,
              cursor: "not-allowed",
            },
          }}
        />
      </Flex>
    </Stack>
  );
}
