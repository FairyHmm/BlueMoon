import { Button, Select, Text } from "@mantine/core";
import { IconUserPlus } from "@tabler/icons-react";
import { useResidentRegistry } from "../hooks/useResidentRegistry";
import { residentActions } from "../store/residentActions";
import classes from "../styles/add-member.module.css";

export default function AddMember({ unitId, isAdding, setIsAdding }) {
  const { availableResidents } = useResidentRegistry();
  const { addMember } = residentActions;

  if (!isAdding) {
    return (
      <Button
        color="blue"
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
        if (val) addMember(unitId, val);
        setIsAdding(false);
      }}
      classNames={{
        input: classes.input,
        dropdown: classes.dropdown,
        option: classes.option,
      }}
      comboboxProps={{ withinPortal: true, zIndex: 3000 }}
    />
  );
}
