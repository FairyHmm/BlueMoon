import { useState } from "react";
import { SimpleGrid, Button, Modal } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import DataRegistry from "../../../shared/components/DataRegistry";
import ApartmentCard from "./ApartmentCard";
import UnitModal from "./UnitModal";
import { useResidentRegistry } from "../hooks/useResidentRegistry";
import { residentActions } from "../store/residentActions";
import drClasses from "../../../shared/styles/data-registry.module.css";
import classes from "../styles/resident-registry.module.css";

export default function ResidentRegistry() {
  const [query, setQuery] = useState("");
  const [isAddingUnit, setIsAddingUnit] = useState(false);

  const { displayData } = useResidentRegistry(query);
  const { addApartment } = residentActions;

  return (
    <DataRegistry
      title="Quản lý cư dân"
      searchQuery={query}
      setSearchQuery={(val) => setQuery(typeof val === "string" ? val : "")}
      rightSection={
        <Button
          leftSection={<IconPlus size={16} />}
          onClick={() => setIsAddingUnit(true)}
          className={classes["add-unit-button"]}
          color="blue"
        >
          Thêm căn hộ
        </Button>
      }
    >
      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 3 }}
        spacing="var(--spacing-md)"
        className={drClasses["registry-grid"]}
      >
        {displayData.map((unit) => (
          <ApartmentCard key={unit.id} unit={unit} />
        ))}
      </SimpleGrid>

      <Modal
        opened={isAddingUnit}
        onClose={() => setIsAddingUnit(false)}
        title="Tạo căn hộ mới"
        centered
        zIndex={1000}
        classNames={{
          content: drClasses["modal-content"],
          header: drClasses["modal-header"],
          title: drClasses["modal-title"],
          close: drClasses["modal-close"],
        }}
      >
        <UnitModal
          onSave={(data) => {
            const result = addApartment(data);
            if (result?.success) setIsAddingUnit(false);
            return result;
          }}
        />
      </Modal>
    </DataRegistry>
  );
}
