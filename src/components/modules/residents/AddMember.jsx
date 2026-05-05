import { Button, Select, Text } from "@mantine/core";
import { IconUserPlus } from "@tabler/icons-react";
import classes from "../../../styles/components/modules/residents/add-member.module.css";

export default function AddMember({
  unitId,
  isAdding,
  setIsAdding,
  availableResidents,
  onAdd,
}) {
  if (!isAdding) {
    return (
      <Button
        onClick={() => setIsAdding(true)}
        color="var(--color-primary)"
        variant="outline"
        fullWidth
      >
        <IconUserPlus size={14} />
        <Text size="xs" fw={700} ml={6}>
          Add members
        </Text>
      </Button>
    );
  }

  return (
    <Select
      autoFocus
      placeholder="Search..."
      data={availableResidents.map((r) => ({
        value: String(r.id),
        label: r.name,
      }))}
      searchable
      size="xs"
      onDropdownClose={() => setIsAdding(false)}
      onChange={(val) => {
        if (val) onAdd(unitId, val);
        setIsAdding(false);
      }}
      classNames={{
        input: classes.input,
        dropdown: classes.dropdown,
        option: classes.option,
      }}
      comboboxProps={{ withinPortal: true }}
    />
  );
}
