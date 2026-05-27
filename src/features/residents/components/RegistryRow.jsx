import { Group, Text } from "@mantine/core";
import StatusMenu from "../../../shared/components/StatusMenu";
import classes from "../styles/resident-row.module.css";

export default function RegistryRow({
  title,
  subtext,
  icon,
  badge,
  boldTitle = false,
  hoverActions,
  status,
  indented = false,
  readOnly
}) {
  const { value, options, getConfig, onUpdate } = status || {};

  return (
    <Group
      wrap="nowrap"
      gap="xs"
      className={classes["resident-item"]}
      style={{ paddingLeft: indented ? "var(--spacing-md)" : 0 }}
    >
      <Group gap={6} wrap="nowrap" style={{ flex: 1, minWidth: 0 }}>
        {icon}
        <div style={{ overflow: "hidden", width: "100%" }}>
          <Group gap={4} wrap="nowrap">
            <Text
              size="sm"
              fw={boldTitle ? 900 : 400}
              className={classes["resident-name"]}
              truncate
            >
              {title}
            </Text>
            {badge}
          </Group>
          {subtext && (
            <Text size="10px" c="dimmed" lh={1} mt={1}>
              {subtext}
            </Text>
          )}
        </div>
      </Group>

      <Group gap="sm" wrap="nowrap" className={classes["actions-container"]}>
        {hoverActions && (
          <Group gap={4} wrap="nowrap" className={classes["hover-actions"]}>
            {hoverActions}
          </Group>
        )}
        {status && (
          <StatusMenu
            value={value}
            options={Object.values(options)}
            getConfig={getConfig}
            onUpdate={onUpdate}
            readOnly={readOnly}
          />
        )}
      </Group>
    </Group>
  );
}
