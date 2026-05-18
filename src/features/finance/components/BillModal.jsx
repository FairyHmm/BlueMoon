import { Button, Flex, Select, Stack, TextInput } from "@mantine/core";
import { IconCalendar, IconReceipt } from "@tabler/icons-react";
import { useBillForm } from "../hooks/useBillForm";
import { getBillingLabels } from "../utils/constants";
import CalculationRow from "./CalculationRow";

export default function BillModal({ initialData, onSave, onCancel }) {
  // 1. Delegate all logic to the hook
  const {
    formData,
    feeTypes,
    selectedFee,
    formulaResult,
    updateField,
    submitForm,
  } = useBillForm(initialData, onSave);

  const labels = getBillingLabels(selectedFee?.calc_method);

  return (
    <Stack spacing="sm">
      {/* --- Header (Inline) --- */}
      <Flex gap="xs" justify="center" align="center">
        <Select
          label="Fee Category"
          placeholder="Choose category"
          leftSection={<IconReceipt size={16} />}
          data={feeTypes.map((f) => ({
            value: String(f.id),
            label: f.name,
          }))}
          value={formData.fee_id}
          onChange={(v) => updateField("fee_id", v || "")}
          variant="filled"
          comboboxProps={{ zIndex: 5000, withinPortal: true }}
        />
        <TextInput
          type="date"
          label="Due Date"
          leftSection={<IconCalendar size={16} />}
          value={formData.due_date}
          onChange={(e) => updateField("due_date", e.target.value)}
          variant="filled"
          w={150}
        />
      </Flex>

      {/* --- Calculation Row (Delegated Component) --- */}
      {selectedFee && (
        <CalculationRow
          selectedFee={selectedFee}
          formulaResult={formulaResult}
          labels={labels}
          updateField={updateField}
          customRate={formData.custom_rate}
        />
      )}

      {/* --- Footer (Inline) --- */}
      <Flex gap="xs" justify="flex-end">
        <Button color="gray" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          color="blue"
          size="sm"
          disabled={!formData.fee_id}
          onClick={submitForm}
        >
          Generate Invoice
        </Button>
      </Flex>
    </Stack>
  );
}
