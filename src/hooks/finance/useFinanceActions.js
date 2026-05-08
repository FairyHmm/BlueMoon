import { useState } from "react";
import { useDisclosure } from "@mantine/hooks"; // Import this here

export function useFinanceActions(db) {
  const { apartments, bills, feeTypes, setBills, loading } = db;

  // 1. Move Disclosure inside the hook
  const [opened, { open, close }] = useDisclosure(false);
  const [activeDraft, setActiveDraft] = useState(null);

  const openBillModal = (initialData = null) => {
    setActiveDraft(initialData);
    open(); // Now 'open' is a stable reference from this hook
  };

  const updateBillStatus = (billId, newStatus) => {
    setBills((prev) =>
      prev.map((bill) =>
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
  };

  const addBill = (billData) => {
    const newBill = {
      id: crypto.randomUUID(),
      ...billData,
      status: billData.status || "due",
    };
    setBills((prev) => [...prev, newBill]);
    close(); // Automatically close modal after adding
  };

  return {
    apartments,
    bills,
    feeTypes,
    isLoading: loading,
    updateBillStatus,
    addBill,
    openBillModal,
    modalProps: { opened, close, activeDraft },
  };
}
