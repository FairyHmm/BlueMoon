import { Group, Text, Stack, ActionIcon, Tooltip } from "@mantine/core";
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
  const isOptional = bill.optional === true;

  const rawInterval = bill.interval || feeType?.interval || "monthly";
  const intervals = {
    one_time: "One-Time",
    yearly: "Yearly",
    monthly: "Monthly",
  };
  const readableInterval = intervals[rawInterval] || "Monthly";

  const amountColor = isOptional
    ? "var(--color-incomplete)"
    : displayStatus === "overdue"
      ? "var(--color-danger)"
      : displayStatus === "due"
        ? "var(--color-danger)"
        : undefined;

  return (
    <Group
      justify="space-between"
      wrap="nowrap"
      gap="xs"
    >
      <Tooltip
        label={`${isOptional ? "Optional" : "Mandatory"}. ${feeType?.description || ""}`}
        position="bottom-start"
        withArrow
        color="indigo.9"
      >
        <Stack gap={2}>
          <Text size="xs" fw={700} truncate>
            {feeType?.name || "Unknown"} • {readableInterval}
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
      </Tooltip>

      <Group gap="xs" wrap="nowrap" style={{ flexShrink: 0 }}>
        <Text size="sm" fw={900} className="mono" c={amountColor}>
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
