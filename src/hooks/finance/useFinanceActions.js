export function useFinanceActions(db) {
  const { apartments, bills, feeTypes, setBills, loading } = db;

  const updateBillStatus = (billId, newStatus) => {
    setBills((prev) =>
      prev.map((bill) =>
        bill.id === billId
          ? {
              ...bill,
              status: newStatus,
              paid_date: newStatus === 'paid' ? new Date().toISOString().split('T')[0] : bill.paid_date
            }
          : bill
      )
    );
  };

  const addBill = (billData) => {
    const newBill = {
      id: crypto.randomUUID(),
      ...billData,
      status: billData.status || "due",
    };
    setBills((prev) => [...prev, newBill]);
  };

  return {
    apartments,
    bills,
    feeTypes,
    isLoading: loading,
    updateBillStatus,
    addBill
  };
}
