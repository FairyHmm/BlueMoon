import { Menu, Badge } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import classes from "../styles/status-menu.module.css";

export default function StatusMenu({
  value,
  options,
  onUpdate,
  getConfig,
  readOnly = false,
}) {
  const config = getConfig(value);

  const badge = (
    <Badge
      className={
        readOnly ? classes["status-badge-static"] : classes["status-badge"]
      }
      color={config.color}
      rightSection={!readOnly && <IconChevronDown size={10} />}
    >
      {config.label}
    </Badge>
  );

  if (readOnly) return badge;

  return (
    <Menu
      position="bottom-end"
      withinPortal
      shadow="md"
      classNames={{
        dropdown: classes.dropdown,
        item: classes.item,
      }}
    >
      <Menu.Target>{badge}</Menu.Target>
      <Menu.Dropdown>
        {Object.values(options).map((opt) => (
          <Menu.Item key={opt.value} onClick={() => onUpdate(opt.value)}>
            {opt.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
