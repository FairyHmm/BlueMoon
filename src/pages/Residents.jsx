import { useState, useMemo } from 'react';
import DataRegistry from '../components/DataRegistry';
import { useDataController } from '../hooks/useDataController';
import { RESIDENT_SCHEMA } from '../data/schemas';
import initialDb from '../data/mockData.json';

export default function Residents() {
  const { data, deleteItem } = useDataController('residents', initialDb.residents);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return data.filter(r => r.name.toLowerCase().includes(query.toLowerCase()));
  }, [data, query]);

  const columns = useMemo(() => RESIDENT_SCHEMA, []);

  return (
    <DataRegistry
      title="Resident_Registry"
      data={filtered}
      columns={columns}
      searchQuery={query}
      setSearchQuery={setQuery}
      onDelete={deleteItem}
      onAdd={() => {}}
    />
  );
}
