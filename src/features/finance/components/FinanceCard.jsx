import { useState, useMemo } from "react";
import { SegmentedControl, Stack, Divider, Text, Group } from "@mantine/core";
import UnitCard from "../../../shared/components/UnitCard";
import BillRow from "./BillRow";
import RecordHeader from "../../../shared/components/RecordHeader";
import { BILL_STATUS } from "../utils/constants";
import { filterBills } from "../utils/billing";
import { financeActions } from "../store/financeActions";
import scClasses from "../../../shared/styles/mantine/segmented-control.module.css";

export default function FinanceCard({
  unit,
  bills = [],
  feeTypes = [],
  onOpenAddBill,
}) {
  const [filter, setFilter] = useState("due");

  const filterOptions = [
    { label: BILL_STATUS.PAID.label, value: "paid" },
    { label: BILL_STATUS.DUE.label, value: "due" },
    { label: "All", value: "all" },
    { label: BILL_STATUS.WAIT.label, value: "wait" },
  ];

  const filteredBills = useMemo(
    () => filterBills(bills, filter),
    [bills, filter],
  );
  const totalAmount = useMemo(
    () => filteredBills.reduce((sum, b) => sum + b.amount, 0),
    [filteredBills],
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
