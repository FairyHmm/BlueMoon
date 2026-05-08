import { SimpleGrid, Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCashBanknotePlus } from "@tabler/icons-react";
import DataRegistry from "../../ui/DataRegistry";
import FinanceCard from "./FinanceCard";
import BillRow from "./BillRow"; // New component for adding bills
import classes from "../../../styles/components/modules/residents/resident-registry.module.css";

export default function FinanceRegistry({
  query,
  setQuery,
  apartments,
  bills,
  feeTypes,
  onUpdateBill,
  onAddBill,
}) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <DataRegistry
      title="Financial Management"
      searchQuery={query}
      setSearchQuery={setQuery}
      rightSection={
        <Button
          leftSection={<IconCashBanknotePlus size={16} />}
          onClick={open}
          color="cyan"
          className={classes["add-unit-button"]}
        >
          Generate Bill
        </Button>
      }
    >
      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 3 }}
        spacing="var(--spacing-md)"
        className={classes["registry-grid"]}
      >
        {apartments.map((unit) => {
          const unitBills = bills.filter((b) => b.apartment_id === unit.id);

          return (
            <FinanceCard
              key={unit.id}
              unit={unit}
              bills={unitBills}
              feeTypes={feeTypes}
              onUpdateBill={onUpdateBill}
            />
          );
        })}
      </SimpleGrid>

      <Modal
        opened={opened}
        onClose={close}
        title="Issue New Bill"
        centered
        zIndex={1000}
        classNames={{
          content: classes["modal-content"],
          header: classes["modal-header"],
          title: classes["modal-title"],
          close: classes["modal-close"],
        }}
      >
        <BillRow
          feeTypes={feeTypes}
          apartments={apartments}
          onSave={(data) => {
            onAddBill(data);
            close();
          }}
        />
      </Modal>
    </DataRegistry>
  );
}
