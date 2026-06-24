import { Modal, Stack, Select, TextInput, Group, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { userActions } from "../store/userActions";

export default function AbsenceModal({ opened, onClose, household = [], defaultResidentId }) {
  const form = useForm({
    initialValues: {
      resident_id: defaultResidentId ? String(defaultResidentId) : "",
      type: "vacation",
      log_date: new Date().toISOString().split("T")[0],
    },
    validate: {
      resident_id: (value) => (!value ? "Please select a member" : null),
    },
  });

  const memberOptions = household.map((member) => ({
    value: String(member.id),
    label: member.name,
  }));

  const handleSubmit = (values) => {
    userActions.logAbsence({
      resident_id: values.resident_id,
      type: values.type,
      log_date: values.log_date,
    });
    form.reset();
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Report Temporary Absence" centered size="sm">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="sm">
          <Select
            required
            label="Select Member"
            placeholder="Choose who will be absent"
            data={memberOptions}
            {...form.getInputProps("resident_id")}
          />
          <Select
            label="Reason"
            data={[
              { value: "vacation", label: "Vacation / Travel" },
              { value: "business", label: "Business Trip" },
              { value: "hospital", label: "Medical / Hospital" },
              { value: "moved_out", label: "Moved Out" },
            ]}
            {...form.getInputProps("type")}
          />
          <TextInput type="date" label="Start Date" {...form.getInputProps("log_date")} />
          <Group justify="flex-end" mt="md">
            <Button variant="light" color="gray" onClick={onClose} size="xs">Cancel</Button>
            <Button type="submit" size="xs">Confirm</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
