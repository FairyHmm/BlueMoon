import { Group, Text, Stack, ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import StatusMenu from "../../../shared/components/StatusMenu";
import { BILL_STATUS } from "../utils/constants";
import {
  getBillStatusConfig,
  getBillDisplayStatus,
  formatDate,
} from "../utils/billing";

export default function BillRow({ bill, feeType, onUpdate, onDelete }) {
  const displayStatus = getBillDisplayStatus(bill);
  const isPaid = bill.status === "paid";

  const rawInterval = bill.interval || feeType?.interval || "monthly";
  const intervals = {
    one_time: "One-Time",
    yearly: "Yearly",
    monthly: "Monthly",
  };
  const readableInterval = intervals[rawInterval] || "Monthly";

  return (
    <Group justify="space-between" wrap="nowrap" gap="xs">
      <Stack gap={2} style={{ flexGrow: 1, minWidth: 0 }}>
        <Text size="xs" fw={700} truncate>
          {feeType.name} • {readableInterval}
        </Text>

        <Text size="xs" c="dimmed">
          Due: {formatDate(bill.due_date)}
        </Text>
        {isPaid && (
          <Text size="xs" c="teal">
            Paid: {formatDate(bill.paid_date) || "—"}
          </Text>
        )}
      </Stack>

      <Group gap="xs" wrap="nowrap">
        <Text size="sm" fw={900} className="mono">
          ${bill.amount.toLocaleString()}
        </Text>

        {onDelete && (
          <ActionIcon
            color="red"
            variant="subtle"
            size="xs"
            onClick={() => onDelete(bill.id)}
          >
            <IconTrash size={14} />
          </ActionIcon>
        )}

        <StatusMenu
          value={displayStatus}
          options={BILL_STATUS}
          getConfig={getBillStatusConfig}
          onUpdate={
            onUpdate ? (status) => onUpdate(bill.id, status) : undefined
          }
          readOnly={!onUpdate}
        />
      </Group>
    </Group>
  );
}
