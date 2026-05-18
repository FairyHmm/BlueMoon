import { Modal, Grid } from "@mantine/core";
import { useFeeTypeModalSync } from "../hooks/useFeeTypeModalSync";
import { CategoryList } from "./CategoryList";
import { CategoryWorkspaceForm } from "./CategoryWorkspaceForm";

export default function FeeTypeModal({ opened, onClose }) {
  const { feeTypes, handleDelete } = useFeeTypeModalSync(opened);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Fee Category Settings"
      centered
      zIndex={1000}
      size="lg"
      radius="md"
    >
      <Grid gutter="xl" pt="xs">
        <Grid.Col span={{ base: 12, sm: 5 }}>
          <CategoryList items={feeTypes} onDelete={handleDelete} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 7 }}>
          <CategoryWorkspaceForm />
        </Grid.Col>
      </Grid>
    </Modal>
  );
}
