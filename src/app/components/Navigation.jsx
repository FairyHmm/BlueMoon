import { rem } from "@mantine/core";
import { SegmentedControl } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../shared/store/useAuthStore";
import { getAllowedNavItems } from "../utils/navigationConfigs";
import classes from "../styles/navigation.module.css";
import scClasses from "../../shared/styles/mantine/segmented-control.module.css";

export default function Navigation({ value, onChange }) {
  const { user } = useAuthStore();

  const navigate = useNavigate();

  const navItems = getAllowedNavItems(user?.role);

  const data = navItems.map((item) => ({
    value: item.path,
    label: (
      <item.icon
        style={{
          width: rem(22),
          height: rem(22),
        }}
        stroke={1.5}
      />
    ),
  }));

  return (
    <SegmentedControl
      value={value}
      onChange={(path) => {
        onChange(path);
        navigate(path);
      }}
      data={data}
      orientation="vertical"
      fullWidth
      classNames={{
        root: `${scClasses["base-control"]} ${classes["nav-root"]}`,
        control: scClasses["control-item"],
        label: scClasses["control-label"],
        indicator: scClasses["control-indicator"],
      }}
    />
  );
}
