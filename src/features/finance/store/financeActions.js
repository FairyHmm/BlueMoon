import { useDbStore } from "../../../shared/store/useDbStore";

const determineInitialStatus = (dueDate) => {
  if (!dueDate) return "due";
  const today = new Date().setHours(0, 0, 0, 0);
  const target = new Date(dueDate).setHours(0, 0, 0, 0);
  return target < today ? "overdue" : "due";
};

export const financeActions = {
  addBill: (billData) => {
    const status = determineInitialStatus(billData.due_date);
    useDbStore.getState().addBills({ ...billData, status });
  },
  addFeeType: (feeTypeData) => {
    useDbStore.getState().addFeeTypes(feeTypeData);
  },

  updateBillStatus: (billId, newStatus) => {
    const updates = { status: newStatus };

    updates.paid_date =
      newStatus === "paid" ? new Date().toISOString().split("T")[0] : null;

    useDbStore.getState().updateBills(billId, updates);
  },
};
