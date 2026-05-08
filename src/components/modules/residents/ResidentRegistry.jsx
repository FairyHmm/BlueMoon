import { SimpleGrid, Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import DataRegistry from "../../ui/DataRegistry";
import ApartmentCard from "./ApartmentCard";
import UnitModal from "./UnitModal";
import rClasses from "../../../styles/components/ui/registry.module.css";
import classes from "../../../styles/components/modules/residents/resident-registry.module.css";

export default function ResidentRegistry({
  query,
  setQuery,
  displayData,
  availableResidents,
  resActions,
  aptActions,
}) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <DataRegistry
      title="Resident Management"
      searchQuery={query}
      setSearchQuery={setQuery}
      rightSection={
        <Button
          leftSection={<IconPlus size={16} />}
          onClick={open}
          className={classes["add-unit-button"]}
          color="blue"
        >
          Add Unit
        </Button>
      }
    >
      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 3 }}
        spacing="var(--spacing-md)"
        className={rClasses["registry-grid"]} // Using shared grid spacing
      >
        {displayData.map((unit) => (
          <ApartmentCard
            key={unit.id}
            unit={unit}
            availableResidents={availableResidents}
            onUpdateResident={resActions.updateResident}
            onAddMember={resActions.addMember}
            onRemoveMember={resActions.removeMember}
            onUpdateUnit={aptActions.updateApartment}
            onRemoveUnit={aptActions.removeApartment}
          />
        ))}
      </SimpleGrid>

      <Modal
        opened={opened}
        onClose={close}
        title="Create New Unit"
        centered
        zIndex={1000}
        classNames={{
          content: rClasses["modal-content"], // Shared Slate aesthetic
          header: rClasses["modal-header"],
          title: rClasses["modal-title"],
          close: rClasses["modal-close"],
        }}
      >
        <UnitModal
          onSave={(data) => {
            const result = aptActions.addApartment(data);
            if (result.success) close();
            return result;
          }}
        />
      </Modal>
    </DataRegistry>
  );
}
