import { Modal, Stack, TextInput, Select, Group, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { userActions } from "../store/userActions";

export default function VehicleModal({ opened, onClose, apartmentId }) {
  const form = useForm({
    initialValues: { plate_number: "", type: "car" },
    validate: {
      plate_number: (val) =>
        val.trim().length < 4 ? "Biển số không hợp lệ" : null,
    },
  });

  const handleSubmit = (values) => {
    userActions.registerVehicle({
      apartment_id: apartmentId,
      plate_number: values.plate_number.toUpperCase().trim(),
      type: values.type,
    });
    form.reset();
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Đăng ký xe mới"
      centered
      size="sm"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="sm">
          <TextInput
            required
            label="Biển số xe"
            placeholder="VD: 30A-12345"
            {...form.getInputProps("plate_number")}
          />
          <Select
            label="Loại xe"
            data={[
              { value: "car", label: "Ô tô" },
              { value: "motorbike", label: "Xe máy" },
            ]}
            {...form.getInputProps("type")}
          />
          <Group justify="flex-end" mt="md">
            <Button variant="light" color="gray" onClick={onClose} size="xs">
              Hủy
            </Button>
            <Button type="submit" size="xs">
              Đăng ký
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
