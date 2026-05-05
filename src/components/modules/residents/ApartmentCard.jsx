import {
  Text,
  Group,
  Stack,
  Badge,
  Divider,
  Button,
} from "@mantine/core";
import { IconUserPlus, IconHome } from "@tabler/icons-react";
import classes from "../../../styles/components/apartment-card.module.css";

export default function ApartmentCard({ unit, onAddMember }) {
  return (
    <Stack gap="xs" p="md" radius="md" className={classes.card}>
      <Group justify="space-between">
        <Stack gap={0}>
          <Group gap={6}>
            <IconHome size={16} color="var(--color-primary)" />
            <Text fw={900}>Unit {unit.id}</Text>
          </Group>
          <Text size="xs" c="dimmed" className="mono">
            {unit.type} • {unit.area}m²
          </Text>
        </Stack>
        {unit.hasUnpaidBills && (
          <Badge color="red" variant="dot" size="xs">
            DEBT
          </Badge>
        )}
      </Group>

      <Divider variant="dotted" />

      <Stack gap={2}>
        {unit.residents.map((res) => (
          <Group
            key={res.id}
            justify="space-between"
            className={classes["resident-item"]}
          >
            <Text size="sm" fw={res.is_head ? 700 : 400}>
              {res.name}
            </Text>
            <Badge
              size="xs"
              color={res.status === "active" ? "green" : "orange"}
            >
              {res.status}
            </Badge>
          </Group>
        ))}
      </Stack>

      <Button
        onClick={() => onAddMember(unit.id)}
        color={"var(--color-primary)"}
        variant="outline"
      >
        <IconUserPlus size={14} />
        <Text size="xs" fw={700} >
          Add members
        </Text>
      </Button>
    </Stack>
  );
}
