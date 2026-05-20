import { useState, useMemo } from "react";
import { SegmentedControl, Stack, Divider, Text, Group } from "@mantine/core";
import UnitCard from "../../../shared/components/UnitCard";
import BillRow from "./BillRow";
import RecordHeader from "../../../shared/components/RecordHeader";
import { BILL_STATUS } from "../utils/constants";
import { filterBills } from "../utils/billing";
import scClasses from "../../../shared/styles/mantine/segmented-control.module.css";

export default function FinanceCard({
  unit,
  bills,
  feeTypes,
  onOpenAddBill,
}) {
  const [filter, setFilter] = useState("due");

  const filterOptions = useMemo(
    () => [
      { label: BILL_STATUS.PAID.label, value: "paid" },
      { label: BILL_STATUS.DUE.label, value: "due" },
      { label: "All", value: "all" },
      { label: BILL_STATUS.WAIT.label, value: "wait" },
    ],
    []
  );

  const filteredBills = useMemo(
    () => filterBills(bills, filter),
    [bills, filter]
  );

  const totalAmount = useMemo(
    () => filteredBills.reduce((sum, b) => sum + b.amount, 0),
    [filteredBills]
  );

  return (
    <UnitCard
      unit={unit}
      isReadOnly={true}
      footer={
        <>
          <Divider variant="dotted" mb="sm" />
          <Group justify="space-between" px={4}>
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
        </>
      }
    >
      <RecordHeader
        title="Billing Records"
        // FIX: Pass the ID, not the object
        onAdd={() => onOpenAddBill(unit.id)}
        color="blue"
      />

      <SegmentedControl
        size="xs"
        fullWidth
        value={filter}
        onChange={setFilter}
        data={filterOptions}
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
              feeType={feeTypes.find((f) => f.id == bill.fee_id)}
            />
          ))
        ) : (
          <Text size="xs" c="dimmed" ta="center" py="sm">
            No records found
          </Text>
        )}
      </Stack>
    </UnitCard>
  );
}
