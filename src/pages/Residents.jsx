import { useState } from "react";
import { SimpleGrid, Loader, Center } from "@mantine/core";
import { useResidentActions } from "../hooks/useResidentActions";
import DataRegistry from "../components/ui/DataRegistry";
import ApartmentCard from "../components/modules/residents/ApartmentCard";

export default function Residents() {
  const [query, setQuery] = useState("");
  const { displayData, availableResidents, actions, isLoading } =
    useResidentActions(query);

  if (isLoading) {
    return (
      <Center h={400}>
        <Loader />
      </Center>
    );
  }

  return (
    <DataRegistry
      title="Resident Management"
      searchQuery={query}
      setSearchQuery={setQuery}
    >
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
        {displayData.map((unit) => (
          <ApartmentCard
            key={unit.id}
            unit={unit}
            availableResidents={availableResidents}
            onUpdateResident={actions.updateResident}
            onAddMember={actions.addMember}
            onRemoveMember={actions.removeMember}
          />
        ))}
      </SimpleGrid>
    </DataRegistry>
  );
}
