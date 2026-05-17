import { useState } from "react";
import UnitCard from "../../../shared/components/UnitCard";
import ResidentRow from "./ResidentRow";
import AddMember from "./AddMember";
import { residentActions } from "../store/residentActions";

export default function ApartmentCard({ unit }) {
  const [isAdding, setIsAdding] = useState(false);
  const { updateApartment, removeApartment } = residentActions;

  return (
    <UnitCard
      unit={unit}
      onUpdateUnit={updateApartment}
      onRemoveUnit={removeApartment}
      footer={
        <AddMember
          unitId={unit.id}
          isAdding={isAdding}
          setIsAdding={setIsAdding}
        />
      }
    >
      {unit.residents?.map((res) => (
        <ResidentRow key={res.id} res={res} />
      ))}
    </UnitCard>
  );
}
