import { useDbStore } from "../../../shared/store/useDbStore";
import { BILLING_INTERVALS } from "../utils/constants";
import { isDateFuture } from "../utils/billing";

// Helper to calculate the next date
const getNextDueDate = (currentDateStr, interval) => {
  const date = new Date(currentDateStr);

  if (interval === BILLING_INTERVALS.MONTHLY)
    date.setMonth(date.getMonth() + 1);
  else if (interval === BILLING_INTERVALS.YEARLY)
    date.setFullYear(date.getFullYear() + 1);

  return date.toISOString().split("T")[0];
};

export const financeActions = {
  addBill: (billData) => {
    const {
      apartments,
      residents,
      fee_types,
      bills,
      vehicles,
      users,
      absence_logs,
      ...safeData
    } = billData;

    const status = isDateFuture(safeData.due_date) ? "wait" : "due";
    useDbStore.getState().addBills({ ...safeData, status });
  },

  addFeeType: (feeTypeData) => {
    useDbStore.getState().addFeeTypes(feeTypeData);
  },

  updateFeeType: ({ id, ...updates }) => {
    useDbStore.getState().updateFeeTypes(id, updates);
  },

  deleteFeeType: (id) => {
    useDbStore.getState().deleteFeeTypes(id);
  },

  updateBillStatus: (billId, newStatus) => {
    const { bills, fee_types, updateBills, addBills } = useDbStore.getState();

    const bill = bills.find((b) => b.id === billId);
    if (!bill) return;

    const updates = { status: newStatus };
    updates.paid_date =
      newStatus === "paid" ? new Date().toISOString().split("T")[0] : null;

    // Auto-Generation Logic
    if (
      newStatus === "paid" &&
      (bill.status === "due" || bill.status === "overdue")
    ) {
      const fee = fee_types.find((f) => f.id == bill.fee_id);

      if (
        fee &&
        (fee.interval === BILLING_INTERVALS.MONTHLY ||
          fee.interval === BILLING_INTERVALS.YEARLY)
      ) {
        const nextDueDate = getNextDueDate(bill.due_date, fee.interval);

        const exists = bills.some(
          (b) =>
            b.apartment_id === bill.apartment_id &&
            b.fee_id == bill.fee_id &&
            b.due_date === nextDueDate,
        );

        if (!exists) {
          addBills({
            apartment_id: bill.apartment_id,
            fee_id: bill.fee_id,
            amount: bill.amount,
            due_date: nextDueDate,
            interval: fee.interval,
            status: "wait",
          });
        }
      }
    }

    // Execute the update once at the end
    updateBills(billId, updates);
  },

  deleteBill: (id) => {
    const { deleteBills } = useDbStore.getState();
    deleteBills(id);
  },
};

export const useFeeTypes = () => {
  return useDbStore((state) => state.fee_types || []);
};
