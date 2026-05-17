import { useDbStore } from "../../../shared/store/useDbStore";

export const financeActions = {
  updateBillStatus: (billId, newStatus) => {
    const { bills, setBills } = useDbStore.getState();

    setBills(
      bills.map((bill) =>
        bill.id === billId
          ? {
              ...bill,
              status: newStatus,
              paid_date:
                newStatus === "paid"
                  ? new Date().toISOString().split("T")[0]
                  : bill.paid_date,
            }
          : bill,
      ),
    );
  },

  addBill: (billData) => {
    const { bills, setBills } = useDbStore.getState();

    const newBill = {
      id: crypto.randomUUID(),
      ...billData,
      status: billData.status || "due",
    };

    setBills([...bills, newBill]);
  },
};
