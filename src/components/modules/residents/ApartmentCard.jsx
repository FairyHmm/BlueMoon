import { useState } from "react";
import UnitCard from "../../ui/UnitCard";
import ResidentRow from "./ResidentRow";
import AddMember from "./AddMember";

export default function ApartmentCard({
  unit,
  availableResidents,
  onUpdateResident,
  onAddMember,
  onRemoveMember,
  onUpdateUnit,
  onRemoveUnit,
}) {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <UnitCard
      unit={unit}
      onUpdateUnit={onUpdateUnit}
      onRemoveUnit={onRemoveUnit}
      footer={
        <AddMember
          unit={unit}
          unitId={unit.id}
          isAdding={isAdding}
          setIsAdding={setIsAdding}
          availableResidents={availableResidents}
          onAdd={onAddMember}
        />
      }
    >
      {unit.residents.map((res) => (
        <ResidentRow
          key={res.id}
          res={res}
          onUpdate={onUpdateResident}
          onRemove={onRemoveMember}
        />
      ))}
    </UnitCard>
  );
}
