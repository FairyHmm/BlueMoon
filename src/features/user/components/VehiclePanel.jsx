import { Button, Badge } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { VEHICLE_CONFIG } from "../utils/constants";
import DashboardCard, { DashboardRow } from "../../../shared/components/DashboardCard";
import VehicleModal from "./VehicleModal";

export default function VehiclePanel({ vehicles = [], apartmentId }) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <DashboardCard
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
            <DashboardRow
              rowKey={vehicle.plate_number}
              icon={Icon}
              iconColor={pending ? "yellow" : color}
              label={vehicle.plate_number}
              mono
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
