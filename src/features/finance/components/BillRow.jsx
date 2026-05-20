import { Group, Text, Stack, ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import StatusMenu from "../../../shared/components/StatusMenu";
import { BILL_STATUS } from "../utils/constants";
import {
  getBillStatusConfig,
  getBillDisplayStatus,
  formatDate,
} from "../utils/billing";
import { financeActions } from "../store/financeActions";

export default function BillRow({ bill, feeType }) {
  const handleStatusUpdate = (newStatus) => {
    financeActions.updateBillStatus(bill.id, newStatus);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this bill?")) {
      financeActions.deleteBill(bill.id);
    }
  };

  const displayStatus = getBillDisplayStatus(bill);

  const rawInterval = bill.interval || feeType?.interval || "monthly";
  const readableInterval =
    rawInterval === "one_time"
      ? "One-Time"
      : rawInterval === "yearly"
        ? "Yearly"
        : "Monthly";

  return (
    <Group justify="space-between" wrap="nowrap" gap="xs">
      <Stack gap={2} style={{ flexGrow: 1, minWidth: 0 }}>
        <Text size="xs" fw={700} truncate>
          {feeType?.name || "General Fee"}{" "}
          <Text component="span" fw={500} c="dimmed" size="xs">
            • {readableInterval}
          </Text>
        </Text>

        <Text size="xs" c="dimmed">
          Due: {formatDate(bill.due_date)}
        </Text>
        {bill.status === "paid" && (
          <Text size="xs" c="dimmed">
            Paid: {formatDate(bill.paid_date)}
          </Text>
        )}
      </Stack>

      <Group gap="xs" wrap="nowrap">
        <Text size="sm" fw={900} className="mono">
          ${bill.amount.toLocaleString()}
        </Text>

        <ActionIcon
          color="red"
          variant="subtle"
          size="xs"
          onClick={handleDelete}
        >
          <IconTrash size={14} />
        </ActionIcon>

        <StatusMenu
          value={displayStatus}
          options={BILL_STATUS}
          getConfig={getBillStatusConfig}
          onUpdate={handleStatusUpdate}
        />
      </Group>
    </Group>
  );
}
