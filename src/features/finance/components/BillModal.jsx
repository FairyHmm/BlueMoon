import { Button, Flex, Select, Stack, TextInput } from "@mantine/core";
import { IconCalendar, IconReceipt } from "@tabler/icons-react";
import { useBillForm } from "../hooks/useBillForm";
import { CALC_METHOD_MAP } from "../utils/constants";
import CalculationRow from "./CalculationRow";

export default function BillModal({ initialData, onSave, onCancel }) {
  const {
    formData,
    feeTypes,
    selectedFee,
    formulaResult,
    updateField,
    submitForm,
  } = useBillForm(initialData, onSave);

  const methodConfig =
    CALC_METHOD_MAP[selectedFee?.calc_method] || CALC_METHOD_MAP["fixed"];

  const labels = {
    quantityDisabled: methodConfig.quantityDisabled,
    quantityLabel: methodConfig.quantityLabel,
    rateLabel: methodConfig.priceLabel,
  };

  return (
    <Stack spacing="sm">
      <Flex gap="xs" justify="center" align="center">
        <Select
          label="Loại phí"
          placeholder="Chọn loại phí"
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
          label="Ngày đến hạn"
          leftSection={<IconCalendar size={16} />}
          value={formData.due_date}
          onChange={(e) => updateField("due_date", e.target.value)}
          variant="filled"
          w={150}
        />
      </Flex>

      {selectedFee && (
        <CalculationRow
          selectedFee={selectedFee}
          formulaResult={formulaResult}
          labels={labels}
          updateField={updateField}
          customQuantity={formData.custom_quantity}
          customRate={formData.custom_rate}
        />
      )}

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
          Tạo hóa đơn
        </Button>
      </Flex>
    </Stack>
  );
}
