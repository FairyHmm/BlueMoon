import { useState, useEffect } from "react";
import {
  Stack,
  Select,
  NumberInput,
  Button,
  Group,
  TextInput,
  Box,
} from "@mantine/core";
import {
  IconReceipt,
  IconCalendar,
  IconUser,
  IconCoin,
} from "@tabler/icons-react";
import classes from "../../../styles/components/modules/finance/bill-modal.module.css";

export default function BillModal({
  feeTypes,
  apartments,
  initialData,
  onSave,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    apartment_id: "",
    fee_id: "",
    amount: 0,
    due_date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (initialData) setFormData((prev) => ({ ...prev, ...initialData }));
  }, [initialData]);

  const handleSubmit = () => {
    if (!formData.apartment_id || !formData.fee_id || formData.amount <= 0)
      return;
    onSave(formData);
  };

  return (
    <Box className={classes.wrapper}>
      <Stack gap="md">
        <Stack gap="xs">
          <Select
            label="Target Unit"
            placeholder="Select unit"
            leftSection={<IconUser size={16} stroke={1.5} />}
            data={apartments.map((a) => ({ value: a.id, label: a.id }))}
            value={formData.apartment_id}
            onChange={(val) => setFormData({ ...formData, apartment_id: val })}
            disabled={!!initialData?.apartment_id}
            variant="filled" // Uses theme background
            classNames={{ input: classes.inputField }}
          />

          <Select
            label="Fee Type"
            placeholder="Choose category"
            leftSection={<IconReceipt size={16} stroke={1.5} />}
            data={feeTypes.map((f) => ({ value: f.id, label: f.name }))}
            value={formData.fee_id}
            onChange={(val) => {
              const fee = feeTypes.find((f) => f.id === val);
              setFormData({
                ...formData,
                fee_id: val,
                amount: fee?.default_amount || 0,
              });
            }}
            variant="filled"
            classNames={{ input: classes.inputField }}
          />

          <Group grow align="flex-start">
            <NumberInput
              label="Amount"
              prefix="$ "
              leftSection={<IconCoin size={16} stroke={1.5} />}
              value={formData.amount}
              onChange={(val) => setFormData({ ...formData, amount: val })}
              variant="filled"
              hideControls
              classNames={{ input: classes.inputField }}
            />

            <TextInput
              label="Due Date"
              type="date"
              leftSection={<IconCalendar size={16} stroke={1.5} />}
              value={formData.due_date}
              onChange={(e) =>
                setFormData({ ...formData, due_date: e.target.value })
              }
              variant="filled"
              classNames={{ input: classes.inputField }}
            />
          </Group>
        </Stack>

        <Group justify="flex-end" gap="sm">
          <Button variant="subtle" color="gray" size="sm" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            variant="filled"
            color="cyan"
            size="sm"
            onClick={handleSubmit}
          >
            Generate Invoice
          </Button>
        </Group>
      </Stack>
    </Box>
  );
}
