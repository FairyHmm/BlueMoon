import { Group, Text, Stack, ActionIcon, Tooltip } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import StatusMenu from "../../../shared/components/StatusMenu";
// Assuming these exist in your registryConfigs.js
import {
  BILL_STATUS,
  getBillStatusConfig,
} from "../../../shared/data/registryConfigs";

export default function BillRow({ bill, feeType, onUpdateStatus }) {
  return (
    <Group justify="space-between" wrap="nowrap" gap="xs">
      <Stack gap={0} style={{ flexGrow: 1 }}>
        <Text size="xs" fw={700} truncate>
          {feeType?.name || "General Fee"}
        </Text>
        <Text size="sx" c="dimmed">
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
          onUpdate={(newStatus) => onUpdateStatus(bill.id, newStatus)}
        />
      </Group>
    </Group>
  );
}
