import { Text, Stack, Divider } from "@mantine/core";
import UnitHeader from "./UnitHeader";
import classes from "../styles/unit-card.module.css";

export default function UnitCard({
  unit,
  header,
  onUpdateUnit,
  onRemoveUnit,
  children,
  footer,
  isReadOnly = false,
}) {
  const hasHeader = unit || header;

  return (
    <Stack gap="xs" p="md" radius="md" className={classes.card}>
      {hasHeader && (
        <>
          {unit ? (
            <UnitHeader
              unit={unit}
              onUpdate={onUpdateUnit}
              onRemove={onRemoveUnit}
              isReadOnly={isReadOnly}
            />
          ) : (
            <Text fw={900} size="sm">
              {header}
            </Text>
          )}

          <Divider variant="dotted" />
        </>
      )}

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
