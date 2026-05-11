import { SimpleGrid, Button, Modal } from "@mantine/core";
import { IconCashBanknotePlus } from "@tabler/icons-react";
import DataRegistry from "../../../shared/components/DataRegistry";
import FinanceCard from "./FinanceCard";
import BillModal from "./BillModal";

import drClasses from "../../../shared/styles/data-registry.module.css";
import classes from "../styles/finance-registry.module.css";

export default function FinanceRegistry({
  query,
  setQuery,
  apartments,
  bills,
  feeTypes,
  onUpdateBill,
  onAddBill,
  openBillModal,
  modalProps,
}) {
  return (
    <DataRegistry
      title="Financial Management"
      searchQuery={query}
      setSearchQuery={setQuery}
      rightSection={
        <Button
          leftSection={<IconCashBanknotePlus size={16} />}
          onClick={() => openBillModal()}
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
            onUpdateBill={onUpdateBill}
            onOpenAddBill={() => openBillModal({ apartment_id: unit.id })}
          />
        ))}
      </SimpleGrid>

      <Modal
        opened={modalProps.opened}
        onClose={modalProps.close}
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
          initialData={modalProps.activeDraft}
          onSave={onAddBill}
          onCancel={modalProps.close}
        />
      </Modal>
    </DataRegistry>
  );
}
