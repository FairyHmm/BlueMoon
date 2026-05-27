import { useState } from "react";
import { Stack, Divider, ActionIcon } from "@mantine/core";
import {
  IconCar,
  IconMotorbike,
  IconUserStar,
  IconTrash,
} from "@tabler/icons-react";
import UnitCard from "../../../shared/components/UnitCard";
import RegistryRow from "./RegistryRow";
import AddMember from "./AddMember";
import { residentActions } from "../store/residentActions";
import {
  RESIDENT_STATUS,
  getStatusConfig,
  VEHICLE_STATUS,
  getVehicleStatusConfig,
  ABSENCE_STATUS,
  getAbsenceStatusConfig,
} from "../utils/constants";

export default function ApartmentCard({ unit }) {
  const [isAdding, setIsAdding] = useState(false);
  const {
    updateApartment,
    removeApartment,
    updateResident,
    removeMember,
    handleVehiclePermit,
    handleAbsenceLog,
  } = residentActions;
  const { id, residents, allVehicles } = unit;

  return (
    <UnitCard
      unit={unit}
      onUpdateUnit={updateApartment}
      onRemoveUnit={removeApartment}
      footer={
        <AddMember unitId={id} isAdding={isAdding} setIsAdding={setIsAdding} />
      }
    >
      {/* Members and Sub-Absences */}
      <Stack gap={4}>
        {residents?.map((res) => (
          <Stack key={res.id} gap={0}>
            <RegistryRow
              title={res.name}
              boldTitle={res.is_head}
              status={{
                value: res.status,
                options: RESIDENT_STATUS,
                getConfig: getStatusConfig,
                onUpdate: (s) => updateResident(res.id, { status: s }),
              }}
              hoverActions={
                <>
                  {!res.is_head && (
                    <ActionIcon
                      variant="subtle"
                      size="xs"
                      onClick={() => updateResident(res.id, { is_head: true })}
                    >
                      <IconUserStar size={12} />
                    </ActionIcon>
                  )}
                  <ActionIcon
                    variant="subtle"
                    color="red"
                    size="xs"
                    onClick={() => removeMember(res.id)}
                  >
                    <IconTrash size={12} />
                  </ActionIcon>
                </>
              }
            />
            {res.absenceStatus && (
              <RegistryRow
                indented
                title={`${res.absenceType}`}
                subtext={`Logged: ${res.absenceDate}`}
                status={{
                  value: res.absenceStatus,
                  options: ABSENCE_STATUS,
                  getConfig: getAbsenceStatusConfig,
                  onUpdate: (s) =>
                    handleAbsenceLog(res.absenceLogId, s === "approved"),
                }}
              />
            )}
          </Stack>
        ))}
      </Stack>

      {/* Vehicles */}
      {allVehicles?.length > 0 && (
        <>
          <Divider my="xs" variant="dotted" />
          <Stack gap={4}>
            {allVehicles.map((v) => (
              <RegistryRow
                key={v.plate_number}
                title={v.plate_number}
                boldTitle
                icon={
                  v.type === "car" ? (
                    <IconCar size={14} />
                  ) : (
                    <IconMotorbike size={14} />
                  )
                }
                status={{
                  value: v.status || "pending",
                  options: VEHICLE_STATUS,
                  getConfig: getVehicleStatusConfig,
                  onUpdate: (s) => handleVehiclePermit(v.plate_number, s),
                }}
              />
            ))}
          </Stack>
        </>
      )}
    </UnitCard>
  );
}
