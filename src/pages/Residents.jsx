import { useState } from "react";
import { Center, Loader } from "@mantine/core";
import { useRegistry } from "../hooks/useRegistry";
import { useResidentActions } from "../hooks/useResidentActions";
import { useApartmentActions } from "../hooks/useApartmentActions";
import ResidentRegistry from "../components/modules/residents/ResidentRegistry";
import mockDB from "../data/mockData.json";

export default function Residents() {
  const [query, setQuery] = useState("");
  const db = useRegistry(mockDB);

  // 1. Fetch Person Data
  const {
    displayData,
    availableResidents,
    actions: resActions,
    isLoading,
  } = useResidentActions(db);

  // 2. Fetch Unit Data
  const { actions: aptActions } = useApartmentActions(db);

  if (isLoading) {
    return (
      <Center h={400}>
        <Loader />
      </Center>
    );
  }

  // 3. Pass everything to the UI layer
  return (
    <ResidentRegistry
      query={query}
      setQuery={setQuery}
      displayData={displayData}
      availableResidents={availableResidents}
      resActions={resActions}
      aptActions={aptActions}
    />
  );
}
