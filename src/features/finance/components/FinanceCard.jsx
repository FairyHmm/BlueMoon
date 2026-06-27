import { useMemo, useState } from "react";
import { Divider, Group, SegmentedControl, Text } from "@mantine/core";
import CardSection from "../../../shared/components/CardSection";
import UnitHeader from "../../../shared/components/UnitHeader";
import RecordHeader from "../../../shared/components/RecordHeader";
import BillRow from "./BillRow";
import { FILTER_OPTIONS } from "../utils/constants";
import { filterBills, getBalanceDue } from "../utils/billing";
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
    () => getBalanceDue(filteredBills),
    [filteredBills],
  );

  const feeTypeMap = useMemo(
    () => Object.fromEntries(feeTypes.map((fee) => [fee.id, fee])),
    [feeTypes],
  );

  const handleStatusUpdate = (billId, newStatus) => {
    financeActions.updateBillStatus(billId, newStatus);
  };

  const handleDelete = (billId) => {
    if (window.confirm("Bạn có chắc muốn xóa hóa đơn này?")) {
      financeActions.deleteBill(billId);
    }
  };

  return (
    <CardSection
      header={<UnitHeader unit={unit} isReadOnly />}
      footer={
        <>
          <Divider variant="dotted" mb="sm" />

          <Group justify="space-between" px={4}>
            <Text size="xs" fw={700} c="dimmed">
              TỔNG
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
              {totalAmount.toLocaleString()} ₫
            </Text>
          </Group>
        </>
      }
    >
      <RecordHeader
        title="Lịch sử hóa đơn"
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

      {filteredBills.map((bill) => (
        <BillRow
          key={bill.id}
          bill={bill}
          feeType={feeTypeMap[bill.fee_id]}
          onUpdate={handleStatusUpdate}
          onDelete={handleDelete}
        />
      ))}
    </CardSection>
  );
}
