import { useState, useMemo } from "react";
import {
  SegmentedControl,
  Stack,
  Divider,
  Text,
  Group,
  ActionIcon,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import UnitCard from "../../../shared/components/UnitCard";
import BillRow from "./BillRow";
// Import BILL_STATUS instead of FINANCE_FILTERS
import { BILL_STATUS, filterBills } from "../../../shared/data/registryConfigs";
import scClasses from "../../../shared/styles/mantine/segmented-control.module.css";

export default function FinanceCard({
  unit,
  bills,
  feeTypes,
  onUpdateBill,
  onOpenAddBill,
}) {
  const [filter, setFilter] = useState("due");

  // Derive SegmentedControl data directly from BILL_STATUS
  const filterOptions = useMemo(
    () => [
      { label: BILL_STATUS.PAID.label, value: "paid" },
      { label: BILL_STATUS.DUE.label, value: "due" },
      { label: "All", value: "all" }, // Manually added logical filter
      { label: BILL_STATUS.WAIT.label, value: "wait" },
    ],
    [],
  );

  const filteredBills = useMemo(
    () => filterBills(bills, filter),
    [bills, filter],
  );

  const totalAmount = useMemo(
    () => filteredBills.reduce((sum, b) => sum + b.amount, 0),
    [filteredBills],
  );

  return (
    <UnitCard unit={unit} isReadOnly={true}>
      <Group justify="space-between" mb="xs">
        <Text size="xs" fw={700} c="dimmed">
          BILLING RECORDS
        </Text>
        <ActionIcon size="sm" color="blue" onClick={onOpenAddBill}>
          <IconPlus size={12} />
        </ActionIcon>
      </Group>

      <SegmentedControl
        size="xs"
        fullWidth
        value={filter}
        onChange={setFilter}
        data={filterOptions} // Using the derived options
        mb="xs"
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
            <BillRow
              key={bill.id}
              bill={bill}
              feeType={feeTypes.find((f) => f.id === bill.fee_id)}
              onUpdateStatus={onUpdateBill}
            />
          ))
        ) : (
          <Text size="xs" c="dimmed" ta="center" py="sm">
            No records found
          </Text>
        )}
      </Stack>

      <Divider variant="dotted" mt="sm" />
      <Group justify="space-between" px={4} pt={4}>
        <Text size="xs" fw={700} c="dimmed">
          TOTAL
        </Text>
        <Text
          size="xs"
          fw={900}
          c={filter === "due" && totalAmount > 0 ? "red" : "var(--color-text)"}
        >
          ${totalAmount.toLocaleString()}
        </Text>
      </Group>
    </UnitCard>
  );
}
