import { useMemo, useState } from "react";
import { Stack, Text, Group, Paper, SegmentedControl } from "@mantine/core";
import { IconReceipt2 } from "@tabler/icons-react";
import DashboardCard from "../../../shared/components/DashboardCard";
import BillRow from "../../finance/components/BillRow";
import { filterBills } from "../../finance/utils/billing";
import { FILTER_OPTIONS } from "../../finance/utils/constants";
import scClasses from "../../../shared/styles/mantine/segmented-control.module.css";

export default function LedgerPanel({
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
    () => Object.fromEntries(feeTypes.map((f) => [f.id, f])),
    [feeTypes],
  );

  return (
    <DashboardCard
      title="Detailed bill list"
      action={
        <Group gap="xs">
          <IconReceipt2 size={16} color="var(--color-danger)" />

          <Text size="xs" fw={700} c="var(--color-danger)">
            Total debt: ${balanceDue.toLocaleString()}
          </Text>
        </Group>
      }
    >
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
            <Paper
              key={bill.id}
              style={{
                background: "var(--color-bg-input)",
              }}
            >
              <BillRow bill={bill} feeType={feeTypeMap[bill.fee_id]} />
            </Paper>
          ))
        ) : (
          <Text size="xs" c="dimmed" ta="center" py="xl">
            No record found.
          </Text>
        )}
      </Stack>
    </DashboardCard>
  );
}
