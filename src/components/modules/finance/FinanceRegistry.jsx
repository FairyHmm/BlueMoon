import { SimpleGrid, Button, Modal } from "@mantine/core";
import { IconCashBanknotePlus } from "@tabler/icons-react";
import DataRegistry from "../../ui/DataRegistry";
import FinanceCard from "./FinanceCard";
import BillModal from "./BillModal";

import rClasses from "../../../styles/components/ui/registry.module.css";
import classes from "../../../styles/components/modules/finance/finance-registry.module.css";

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
        className={rClasses["registry-grid"]}
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
          content: rClasses["modal-content"],
          header: rClasses["modal-header"],
          title: rClasses["modal-title"],
          close: rClasses["modal-close"],
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
