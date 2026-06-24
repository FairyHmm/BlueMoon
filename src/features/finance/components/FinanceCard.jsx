import { useState, useMemo } from "react";
import { SegmentedControl, Stack, Divider, Text, Group } from "@mantine/core";
import UnitCard from "../../../shared/components/UnitCard";
import BillRow from "./BillRow";
import RecordHeader from "../../../shared/components/RecordHeader";
import { FILTER_OPTIONS } from "../utils/constants";
import {
  filterBills,
  getBillsTotal,
} from "../utils/billing";
import { financeActions } from "../store/financeActions";
import scClasses from "../../../shared/styles/mantine/segmented-control.module.css";

export default function FinanceCard({
  unit,
  bills = [],
  feeTypes = [],
  onOpenAddBill,
}) {
  const [filter, setFilter] = useState("due");

  const filteredBills = useMemo(
    () => filterBills(bills, filter),
    [bills, filter],
  );

  const totalAmount = useMemo(
    () => getBillsTotal(filteredBills),
    [filteredBills],
  );

  const feeTypeMap = useMemo(
    () => Object.fromEntries(feeTypes.map((f) => [f.id, f])),
    [feeTypes],
  );

  const handleStatusUpdate = (billId, newStatus) =>
    financeActions.updateBillStatus(billId, newStatus);

  const handleDelete = (billId) => {
    if (window.confirm("Are you sure you want to delete this bill?")) {
      financeActions.deleteBill(billId);
    }
  };

  return (
    <UnitCard
      unit={unit}
      isReadOnly
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
              c={
                filter === "due" && totalAmount > 0
                  ? "red"
                  : "var(--color-text)"
              }
            >
              ${totalAmount.toLocaleString()}
            </Text>
          </Group>
        </>
      }
    >
      <RecordHeader
        title="Billing Records"
        onAdd={() => onOpenAddBill(unit.id)}
        color="blue"
      />

      <SegmentedControl
        size="xs"
        fullWidth
        value={filter}
        onChange={setFilter}
        data={FILTER_OPTIONS}
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
              feeType={feeTypeMap[bill.fee_id]}
              onUpdate={handleStatusUpdate}
              onDelete={handleDelete}
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
