import { Group, Text, Stack } from "@mantine/core";
import StatusMenu from "../../../shared/components/StatusMenu";
import { BILL_STATUS, getBillStatusConfig } from "../utils/constants";
import { financeActions } from "../store/financeActions";

export default function BillRow({ bill, feeType }) {
  const handleStatusUpdate = (newStatus) => {
    financeActions.updateBillStatus(bill.id, newStatus);
  };

  return (
    <Group justify="space-between" wrap="nowrap" gap="xs">
      <Stack gap={0} style={{ flexGrow: 1 }}>
        <Text size="xs" fw={700} truncate>
          {feeType?.name || "General Fee"}
        </Text>
        <Text size="xs" c="dimmed">
          {bill.status === "paid"
            ? `Paid: ${bill.paid_date}`
            : `Due: ${bill.due_date}`}
        </Text>
      </Stack>

      <Group gap="xs" wrap="nowrap">
        <Text size="sm" fw={900} className="mono">
          ${bill.amount.toLocaleString()}
        </Text>

        <StatusMenu
          value={bill.status}
          options={BILL_STATUS}
          getConfig={getBillStatusConfig}
          onUpdate={handleStatusUpdate}
        />
      </Group>
    </Group>
  );
}
