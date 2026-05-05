import { useState, useMemo } from "react";
import { SimpleGrid } from "@mantine/core";
import DataRegistry from "../components/ui/DataRegistry";
import ApartmentCard from "../components/modules/residents/ApartmentCard";
import { useRegistry } from "../hooks/useRegistry";
import { getResidentRegistry } from "../utils/queries/residentQueries";

export default function Residents() {
  const [query, setQuery] = useState("");
  const db = useRegistry();
  const displayData = useMemo(
    () => getResidentRegistry(db, query),
    [db, query],
  );

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
            onAddMember={(id) => console.log("Target Unit:", id)}
          />
        ))}
      </SimpleGrid>
    </DataRegistry>
  );
}
