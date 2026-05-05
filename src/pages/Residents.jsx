import { useState, useMemo } from "react";
import { SimpleGrid } from "@mantine/core";
import DataRegistry from "../components/ui/DataRegistry";
import ApartmentCard from "../components/modules/residents/ApartmentCard";
import { useDataController } from "../hooks/useDataController";
import { getGroupedApartmentData } from "../utils/data-transformers";
import initialDb from "../data/mockData.json";

export default function Residents() {
  const { data: residents } = useDataController(
    "residents",
    initialDb.residents,
  );
  const { data: apartments } = useDataController(
    "apartments",
    initialDb.apartments,
  );
  const { data: bills } = useDataController("bills", initialDb.bills);
  const { data: vehicles } = useDataController("vehicles", initialDb.vehicles);

  const [query, setQuery] = useState("");

  const displayData = useMemo(
    () =>
      getGroupedApartmentData(apartments, residents, vehicles, bills, query),
    [apartments, residents, bills, vehicles, query],
  );

  return (
    <DataRegistry
      title="Resident Management"
      searchQuery={query}
      setSearchQuery={setQuery}
    >
      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 3 }}
        spacing="md"
        verticalSpacing="md"
      >
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
