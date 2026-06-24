import { Button, Badge } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import CardSection from "../../../shared/components/CardSection";
import RecordRow from "../../../shared/components/RecordRow";
import VehicleModal from "./VehicleModal";
import { VEHICLE_CONFIG } from "../utils/constants";
export default function VehiclePanel({ vehicles = [], apartmentId }) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <CardSection
        title="Registered Vehicles"
        items={vehicles}
        emptyMessage="No registered vehicles."
        footer={
          <Button
            size="xs"
            fullWidth
            onClick={open}
            leftSection={<IconPlus size={14} />}
          >
            Register Vehicle
          </Button>
        }
        renderItem={(vehicle) => {
          const { icon: Icon, color } = VEHICLE_CONFIG[vehicle.type];

          const pending = vehicle.status === "pending";

          return (
            <RecordRow
              key={vehicle.plate_number}
              title={vehicle.plate_number}
              icon={<Icon size={14} color={color} />}
              badge={
                pending && (
                  <Badge size="xs" color="var(--color-warning)">
                    Pending
                  </Badge>
                )
              }
            />
          );
        }}
      />

      <VehicleModal opened={opened} onClose={close} apartmentId={apartmentId} />
    </>
  );
}
