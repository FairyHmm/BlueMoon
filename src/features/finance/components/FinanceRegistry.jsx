import { useState } from "react";
import { SimpleGrid, Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSettingsPlus } from "@tabler/icons-react";
import DataRegistry from "../../../shared/components/DataRegistry";
import FinanceCard from "./FinanceCard";
import BillModal from "./BillModal";
import FeeTypeModal from "./FeeTypeModal";
import { useFinanceRegistry } from "../hooks/useFinanceRegistry";

import drClasses from "../../../shared/styles/data-registry.module.css";

export default function FinanceRegistry() {
  const [query, setQuery] = useState("");
  const [billOpened, billActions] = useDisclosure(false);
  const [feeOpened, feeActions] = useDisclosure(false);
  const [activeUnitId, setActiveUnitId] = useState(null);

  const { apartments, bills, feeTypes } = useFinanceRegistry(query);

  const handleOpenAddBill = (unitId) => {
    setActiveUnitId(unitId);
    billActions.open();
  };

  return (
    <DataRegistry
      title="Financial Management"
      searchQuery={query}
      setSearchQuery={(val) => setQuery(typeof val === "string" ? val : "")}
      rightSection={
        <Button
          leftSection={<IconSettingsPlus size={16} />}
          onClick={feeActions.open}
          color="blue"
        >
          Configure Fee Categories
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
            onOpenAddBill={handleOpenAddBill}
          />
        ))}
      </SimpleGrid>

      {/* Bill Dialog */}
      <Modal
        opened={billOpened}
        onClose={billActions.close}
        title={
          activeUnitId
            ? `Issue New Bill for Unit ${activeUnitId}`
            : "Issue New Bill"
        }
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
          initialData={{ apartment_id: activeUnitId }}
          onSave={billActions.close}
          onCancel={billActions.close}
        />
      </Modal>

      <FeeTypeModal
        opened={feeOpened}
        onClose={feeActions.close}
        feeTypes={feeTypes}
      />
    </DataRegistry>
  );
}
