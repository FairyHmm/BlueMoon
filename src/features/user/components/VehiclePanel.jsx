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
        title="Xe đã đăng ký"
        items={vehicles}
        emptyMessage="Không có xe nào."
        footer={
          <Button
            size="xs"
            fullWidth
            onClick={open}
            leftSection={<IconPlus size={14} />}
          >
            Đăng ký xe
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
                    Đang chờ
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
