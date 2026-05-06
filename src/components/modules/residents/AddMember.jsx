// AddMember.jsx
import { Button, Select, Text } from "@mantine/core";
import { IconUserPlus } from "@tabler/icons-react";
import classes from "../../../styles/components/modules/residents/add-member.module.css";
import { UNIT_TYPES, getUnitConfig } from "../../../data/registryConfigs";

export default function AddMember({
  unit,
  unitId,
  isAdding,
  setIsAdding,
  availableResidents,
  onAdd,
}) {
  const cfg = getUnitConfig(unit.type);

  if (!isAdding) {
    return (
      <Button
        color={cfg.color}
        onClick={() => setIsAdding(true)}
        variant="outline"
        fullWidth
        className={classes["add-button"]}
      >
        <IconUserPlus size={14} className={classes["add-icon"]} />
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
      comboboxProps={{ withinPortal: true, zIndex: 3000 }} // Ensure it stays on top
    />
  );
}
