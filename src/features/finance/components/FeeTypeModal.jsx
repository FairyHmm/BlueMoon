import { useState } from "react";
import {
  Stack,
  TextInput,
  Select,
  NumberInput,
  Button,
  Group,
} from "@mantine/core";
import { CALC_METHODS } from "../utils/constants";
import { financeActions } from "../store/financeActions";

export default function FeeTypeModal({ onSaveSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    calc_method: "fixed",
    price: "",
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.price) return;

    financeActions.addFeeType({
      name: formData.name,
      calc_method: formData.calc_method,
      price: Number(formData.price),
    });

    if (onSaveSuccess) onSaveSuccess();
  };

  return (
    <Stack gap="md">
      <TextInput
        label="Fee Category Name"
        placeholder="e.g., Management, Water Meter"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />

      <Select
        label="Calculation Strategy"
        data={Object.values(CALC_METHODS)}
        comboboxProps={{ zIndex: 5000, withinPortal: true }}
        value={formData.calc_method}
        onChange={(val) =>
          setFormData({ ...formData, calc_method: val || "fixed" })
        }
      />

      <NumberInput
        label={
          formData.calc_method === "per_m2"
            ? "Price Rate per Square Meter"
            : "Flat Rate Base Cost"
        }
        prefix="$ "
        value={formData.price}
        onChange={(val) =>
          setFormData({ ...formData, price: val !== "" ? Number(val) : "" })
        }
        min={0}
        decimalScale={2}
        hideControls
        required
      />

      <Group justify="flex-end" gap="sm" mt="xs">
        <Button variant="subtle" color="gray" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="filled" color="blue" size="sm" onClick={handleSubmit}>
          Create Category
        </Button>
      </Group>
    </Stack>
  );
}
