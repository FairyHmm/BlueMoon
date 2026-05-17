import { useState } from "react";
import { SimpleGrid, Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCashBanknotePlus } from "@tabler/icons-react";
import DataRegistry from "../../../shared/components/DataRegistry";
import FinanceCard from "./FinanceCard";
import BillModal from "./BillModal";
import { useFinanceRegistry } from "../hooks/useFinanceRegistry";
import { financeActions } from "../store/financeActions";

import drClasses from "../../../shared/styles/data-registry.module.css";
import classes from "../styles/finance-registry.module.css";

export default function FinanceRegistry() {
  const [query, setQuery] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [activeDraft, setActiveDraft] = useState(null);

  const { apartments, bills, feeTypes } = useFinanceRegistry(query);
  const { addBill } = financeActions;

  const handleOpenModal = (initialData = null) => {
    setActiveDraft(initialData);
    open();
  };

  const handleSaveBill = (formData) => {
    addBill(formData);
    close();
  };

  return (
    <DataRegistry
      title="Financial Management"
      searchQuery={query}
      setSearchQuery={(val) => setQuery(typeof val === "string" ? val : "")}
      rightSection={
        <Button
          leftSection={<IconCashBanknotePlus size={16} />}
          onClick={() => handleOpenModal(null)}
          color="cyan"
          className={classes["finance-button"]}
        >
          Generate Bill
        </Button>
      }
    >
      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 3 }}
        spacing="var(--spacing-md)"
        className={drClasses["registry-grid"]}
      >
        {apartments.map((unit) => (
          <FinanceCard
            key={unit.id}
            unit={unit}
            bills={bills.filter((b) => b.apartment_id === unit.id)}
            feeTypes={feeTypes}
            onOpenAddBill={() => handleOpenModal({ apartment_id: unit.id })}
          />
        ))}
      </SimpleGrid>

      <Modal
        opened={opened}
        onClose={close}
        title="Issue New Bill"
        centered
        zIndex={1000}
        classNames={{
          content: drClasses["modal-content"],
          header: drClasses["modal-header"],
          title: drClasses["modal-title"],
          close: drClasses["modal-close"],
        }}
      >
        <BillModal
          feeTypes={feeTypes}
          apartments={apartments}
          initialData={activeDraft}
          onSave={handleSaveBill}
          onCancel={close}
        />
      </Modal>
    </DataRegistry>
  );
}
