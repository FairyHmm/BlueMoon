import { useEffect, useState } from 'react';
import { Container, Table, TextInput, Text, Stack, Group, Loader, Center } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { dataService } from '../services/dataService';

export default function Residents() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    dataService.getResidents().then(res => {
      setData(res);
      setLoading(false);
    });
  }, []);

  const filtered = data.filter(r =>
    r.name.toLowerCase().includes(query.toLowerCase()) || r.apartment_id.includes(query)
  );

  if (loading) return <Center h="100vh"><Loader size="sm" /></Center>;

  return (
    <Container fluid p="sm">
      <Stack gap="xs">
        <Group justify="space-between">
          <Text fw={700} size="xl">RESIDENT_DATA</Text>
          <TextInput
            placeholder="Filter..."
            size="xs"
            leftSection={<IconSearch size={14} />}
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
          />
        </Group>

        <Table withTableBorder withColumnBorders verticalSpacing="xs">
          <Table.Thead bg="var(--color-bg-card)">
            <Table.Tr>
              <Table.Th style={{ fontSize: '10px' }}>ID</Table.Th>
              <Table.Th>NAME</Table.Th>
              <Table.Th>APT_ID</Table.Th>
              <Table.Th>HEAD</Table.Th>
              <Table.Th>STATUS</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {filtered.map((res) => (
              <Table.Tr key={res.id}>
                <Table.Td style={{ fontFamily: 'monospace' }}>{res.id}</Table.Td>
                <Table.Td fw={500}>{res.name}</Table.Td>
                <Table.Td>{res.apartment_id}</Table.Td>
                <Table.Td>{res.is_head ? 'Y' : 'N'}</Table.Td>
                <Table.Td>{res.status.toUpperCase()}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Stack>
    </Container>
  );
}
