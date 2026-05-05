import { useState } from "react";
import { Stack, Divider } from "@mantine/core";
import UnitHeader from "./UnitHeader";
import ResidentRow from "./ResidentRow";
import AddMember from "./AddMember";
import classes from "../../../styles/components/modules/residents/apartment-card.module.css";

export default function ApartmentCard({
  unit,
  availableResidents,
  onUpdateResident,
  onAddMember,
  onRemoveMember,
}) {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <Stack gap="xs" p="md" radius="md" className={classes.card}>
      <UnitHeader unit={unit} />
      <Divider variant="dotted" />

      <Stack gap={2}>
        {unit.residents.map((res) => (
          <ResidentRow
            key={res.id}
            res={res}
            onUpdate={onUpdateResident}
            onRemove={onRemoveMember}
          />
        ))}
      </Stack>

      <AddMember
        unitId={unit.id}
        isAdding={isAdding}
        setIsAdding={setIsAdding}
        availableResidents={availableResidents}
        onAdd={onAddMember}
      />
    </Stack>
  );
}
