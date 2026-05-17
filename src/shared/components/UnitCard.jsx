import { Stack, Divider } from "@mantine/core";
import UnitHeader from "./UnitHeader";
import classes from "../styles/unit-card.module.css";

export default function UnitCard({
  unit,
  onUpdateUnit,
  onRemoveUnit,
  children,
  footer,
  isReadOnly = false,
}) {
  return (
    <Stack gap="xs" p="md" radius="md" className={classes.card}>
      <UnitHeader
        unit={unit}
        onUpdate={onUpdateUnit}
        onRemove={onRemoveUnit}
        isReadOnly={isReadOnly}
      />
      <Divider variant="dotted" />
      <Stack gap={2} style={{ flexGrow: 1 }}>
        {children}
      </Stack>
      {footer && (
        <Stack mt="auto" pt="sm">
          {footer}
        </Stack>
      )}
    </Stack>
  );
}
