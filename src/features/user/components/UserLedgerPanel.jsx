import { useMemo, useState } from "react";
import {
  Paper,
  Title,
  SegmentedControl,
  Badge,
  Stack,
  Text,
  Group,
  Box,
} from "@mantine/core";
import { IconReceipt2 } from "@tabler/icons-react";
import { filterBills } from "../../finance/utils/billing";
import { FILTER_OPTIONS, BILL_STATUS } from "../../finance/utils/constants";
import scClasses from "../../../shared/styles/mantine/segmented-control.module.css";
import StatusMenu from "../../../shared/components/StatusMenu";

function BillItem({ bill, feeType }) {
  const isPaid = bill.status === "paid";
  return (
    <Paper p="sm" radius="md" withBorder>
      <Group justify="space-between" align="center" gap="sm">
        <Box>
          <Text size="sm" fw={700}>
            {feeType?.name || "Khoản phí chung"}
          </Text>
          <Group gap="xs" mt={2}>
            <Text size="xs" c="dimmed">
              Due: {bill.due_date}
            </Text>
            {isPaid && (
              <Text size="xs" c="teal">
                • Paid: {bill.paid_date || "—"}
              </Text>
            )}
          </Group>
        </Box>
        <Stack gap={2} align="flex-end">
          <Text size="md" fw={900} className="mono">
            ${bill.amount.toLocaleString()}
          </Text>
          <StatusMenu
            value={bill.status}
            options={BILL_STATUS}
            getConfig={(status) =>
              BILL_STATUS[status.toUpperCase()] || BILL_STATUS.WAIT
            }
            readOnly
          />
        </Stack>
      </Group>
    </Paper>
  );
}
export default function UserLedgerPanel({
  bills = [],
  feeTypes = [],
  balanceDue = 0,
}) {
  const [filter, setFilter] = useState("due");
  const filteredBills = useMemo(
    () => filterBills(bills, filter),
    [bills, filter],
  );
  const feeTypeMap = useMemo(
    () => Object.fromEntries(feeTypes.map((fee) => [fee.id, fee])),
    [feeTypes],
  );
  return (
    <Paper p="md" radius="md" withBorder>
      <Stack gap="md">
        <Group justify="space-between" align="center">
          <Title order={4}>Detailed bill list</Title>
          <Group gap="xs">
            <IconReceipt2 size={16} color="var(--color-danger)" />
            <Text size="xs" fw={700} c="var(--color-danger)">
              Total debt: ${balanceDue.toLocaleString()}
            </Text>
          </Group>
        </Group>
        <SegmentedControl
          size="xs"
          fullWidth
          value={filter}
          onChange={setFilter}
          data={FILTER_OPTIONS}
          classNames={{
            root: scClasses["base-control"],
            control: scClasses["control-item"],
            label: scClasses["control-label"],
            indicator: scClasses["control-indicator"],
          }}
        />
        <Stack gap="sm">
          {filteredBills.length > 0 ? (
            filteredBills.map((bill) => (
              <BillItem
                key={bill.id}
                bill={bill}
                feeType={feeTypeMap[bill.fee_id]}
              />
            ))
          ) : (
            <Text size="xs" c="dimmed" ta="center" py="xl">
              No record found.
            </Text>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
}
