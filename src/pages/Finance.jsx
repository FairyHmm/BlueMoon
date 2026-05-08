import { useState } from "react";
import { Center, Loader } from "@mantine/core";
import { useRegistry } from "../hooks/useRegistry";
import { useFinanceActions } from "../hooks/finance/useFinanceActions";
import FinanceRegistry from "../components/modules/finance/FinanceRegistry";
import mockDB from "../data/mockData.json";

export default function Finance() {
  const [query, setQuery] = useState("");
  const db = useRegistry(mockDB);

  const {
    apartments,
    bills,
    feeTypes,
    isLoading,
    updateBillStatus,
    addBill,
    openBillModal,
    modalProps,
  } = useFinanceActions(db);

  if (isLoading) {
    return (
      <Center h={400}>
        <Loader color="cyan" />
      </Center>
    );
  }

  // FIXED: Access 'id' instead of 'unit_number' and added safety checks
  const filteredApartments = apartments.filter((apt) =>
    apt.id?.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <FinanceRegistry
      query={query}
      setQuery={setQuery}
      apartments={filteredApartments}
      bills={bills}
      feeTypes={feeTypes}
      onUpdateBill={updateBillStatus}
      onAddBill={addBill}
      openBillModal={openBillModal}
      modalProps={modalProps}
    />
  );
}
