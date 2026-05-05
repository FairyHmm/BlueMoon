import { useState } from "react";
import DataRegistry from "../components/DataRegistry";
import { useDataController } from "../hooks/useDataController";
import { RESIDENT_SCHEMA } from "../data/schemas";
import initialDb from "../data/mockData.json";

export default function Residents() {
  const { data, deleteItem } = useDataController(
    "residents",
    initialDb.residents,
  );
  const [query, setQuery] = useState("");

  return (
    <DataRegistry
      title="Resident_Registry"
      data={data}
      columns={RESIDENT_SCHEMA}
      searchQuery={query}
      setSearchQuery={setQuery}
      onDelete={deleteItem}
      onAdd={() => {}}
    />
  );
}
