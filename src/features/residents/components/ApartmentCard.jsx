import { useState } from "react";
import { Stack, Divider, ActionIcon } from "@mantine/core";
import {
  IconCar,
  IconMotorbike,
  IconUserStar,
  IconTrash,
} from "@tabler/icons-react";
import CardSection from "../../../shared/components/CardSection";
import UnitHeader from "../../../shared/components/UnitHeader";
import RecordRow from "../../../shared/components/RecordRow";
import StatusMenu from "../../../shared/components/StatusMenu";
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
    <CardSection
      header={
        <UnitHeader
          unit={unit}
          onUpdate={updateApartment}
          onRemove={removeApartment}
        />
      }
      footer={
        <AddMember unitId={id} isAdding={isAdding} setIsAdding={setIsAdding} />
      }
    >
      {/* Members */}
      <Stack gap={4}>
        {residents?.map((res) => (
          <Stack key={res.id} gap={0}>
            <RecordRow
              title={res.name}
              boldTitle={res.is_head}
              right={
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
                  <StatusMenu
                    value={res.status}
                    options={Object.values(RESIDENT_STATUS)}
                    getConfig={getStatusConfig}
                    onUpdate={(s) => updateResident(res.id, { status: s })}
                  />
                </>
              }
            />

            {res.absenceStatus && (
              <RecordRow
                indented
                title={res.absenceType}
                subtext={`Đã ghi: ${res.absenceDate}`}
                right={
                  <StatusMenu
                    value={res.absenceStatus}
                    options={Object.values(ABSENCE_STATUS)}
                    getConfig={getAbsenceStatusConfig}
                    onUpdate={(s) =>
                      handleAbsenceLog(res.absenceLogId, s === "approved")
                    }
                  />
                }
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
              <RecordRow
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
                right={
                  <StatusMenu
                    value={v.status || "pending"}
                    options={Object.values(VEHICLE_STATUS)}
                    getConfig={getVehicleStatusConfig}
                    onUpdate={(s) => handleVehiclePermit(v.plate_number, s)}
                  />
                }
              />
            ))}
          </Stack>
        </>
      )}
    </CardSection>
  );
}
