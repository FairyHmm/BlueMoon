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
    useDbStore.getState().addRecord("bills", { ...billData, status });
  },
  addFeeType: (feeTypeData) => {
    useDbStore.getState().addRecord("fee_types", feeTypeData);
  },
};
